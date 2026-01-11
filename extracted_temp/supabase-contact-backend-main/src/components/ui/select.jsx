import React, { createContext, useContext, useState, useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/utils";

const SelectContext = createContext(null);

const Select = ({ children, value, onValueChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <SelectContext.Provider value={{ value, onValueChange, isOpen, setIsOpen, children }}>
      <div className="relative w-full" ref={containerRef}>
        {children}
      </div>
    </SelectContext.Provider>
  );
};

const SelectTrigger = React.forwardRef(({ className, children, ...props }, ref) => {
  const { isOpen, setIsOpen } = useContext(SelectContext);
  
  return (
    <button
      type="button"
      ref={ref}
      onClick={() => setIsOpen(!isOpen)}
      className={cn(
        "flex h-10 w-full items-center justify-between rounded-md border border-input bg-white px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    >
      {children}
      <ChevronDown className={cn("h-4 w-4 opacity-50 transition-transform duration-200", isOpen && "rotate-180")} />
    </button>
  );
});

const SelectValue = ({ placeholder }) => {
  const { value, children } = useContext(SelectContext);
  
  const childrenArray = React.Children.toArray(children);
  const content = childrenArray.find(
    (child) => child.type === SelectContent || child.type?.displayName === 'SelectContent'
  );
  
  let label = null;
  if (value && content) {
    const items = React.Children.toArray(content.props.children);
    const selectedItem = items.find(
      (item) => item.props?.value === value
    );
    if (selectedItem) {
      label = selectedItem.props.children;
    }
  }

  return (
    <span className={cn("block truncate", !label && "text-gray-400")}>
      {label || placeholder}
    </span>
  );
};

const SelectContent = ({ children, className }) => {
  const { isOpen } = useContext(SelectContext);
  
  if (!isOpen) return null;

  return (
    <div className={cn(
      "absolute top-full left-0 right-0 z-50 mt-1 min-w-[8rem] overflow-hidden rounded-md border bg-white text-gray-900 shadow-lg animate-fade-in",
      className
    )}>
      <div className="p-1">
        {children}
      </div>
    </div>
  );
};

const SelectItem = React.forwardRef(({ className, children, value: itemValue, ...props }, ref) => {
  const { onValueChange, setIsOpen, value: selectedValue } = useContext(SelectContext);
  const isSelected = selectedValue === itemValue;
  
  return (
    <div
      ref={ref}
      onClick={() => {
        onValueChange?.(itemValue);
        setIsOpen(false);
      }}
      className={cn(
        "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 px-2 text-sm outline-none hover:bg-gray-100 hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
        isSelected && "bg-gray-100 font-medium",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
});

SelectTrigger.displayName = "SelectTrigger";
SelectItem.displayName = "SelectItem";
SelectContent.displayName = "SelectContent";

export { Select, SelectTrigger, SelectValue, SelectContent, SelectItem };