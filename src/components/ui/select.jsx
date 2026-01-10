import React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const Select = ({ children, value, onValueChange, ...props }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  
  return (
    <div className="relative" {...props}>
      <SelectTrigger onClick={() => setIsOpen(!isOpen)}>
        <SelectValue placeholder={children?.find(child => child.props?.value === value)?.props?.children || "Sélectionnez..."} />
      </SelectTrigger>
      {isOpen && (
        <SelectContent>
          {React.Children.map(children, (child) => 
            React.cloneElement(child, {
              onClick: () => {
                onValueChange?.(child.props.value);
                setIsOpen(false);
              }
            })
          )}
        </SelectContent>
      )}
    </div>
  );
};

const SelectTrigger = React.forwardRef(({ className, children, ...props }, ref) => (
  <button
    ref={ref}
    className={cn(
      "flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
      className
    )}
    {...props}
  >
    {children}
    <ChevronDown className="h-4 w-4 opacity-50" />
  </button>
));

const SelectValue = ({ placeholder }) => (
  <span>{placeholder}</span>
);

const SelectContent = ({ children, className }) => (
  <div className={cn(
    "absolute top-full left-0 right-0 z-50 mt-1 rounded-md border bg-popover text-popover-foreground shadow-md",
    className
  )}>
    <div className="p-1">
      {children}
    </div>
  </div>
);

const SelectItem = React.forwardRef(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 px-2 text-sm outline-none hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
      className
    )}
    {...props}
  >
    {children}
  </div>
));

SelectItem.displayName = "SelectItem";

export { Select, SelectTrigger, SelectValue, SelectContent, SelectItem };