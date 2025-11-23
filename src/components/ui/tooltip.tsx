'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

interface TooltipContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const TooltipContext = React.createContext<TooltipContextValue | null>(null);

export function TooltipProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

export function Tooltip({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = React.useState(false);

  return (
    <TooltipContext.Provider value={{ open, setOpen }}>
      {children}
    </TooltipContext.Provider>
  );
}

interface TooltipTriggerProps {
  asChild?: boolean;
  children: React.ReactElement;
}

export function TooltipTrigger({ asChild, children }: TooltipTriggerProps) {
  const ctx = React.useContext(TooltipContext);
  if (!ctx) {
    throw new Error('TooltipTrigger must be used within Tooltip');
  }

  const triggerProps = {
    onMouseEnter: () => ctx.setOpen(true),
    onMouseLeave: () => ctx.setOpen(false),
  };

  if (asChild) {
    return React.cloneElement(children, triggerProps);
  }

  return (
    <button type="button" {...triggerProps}>
      {children}
    </button>
  );
}

interface TooltipContentProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function TooltipContent({ className, children, ...props }: TooltipContentProps) {
  const ctx = React.useContext(TooltipContext);
  if (!ctx || !ctx.open) return null;

  return (
    <div
      className={cn(
        'z-50 rounded-md bg-black px-2 py-1 text-xs text-white shadow-lg',
        'absolute translate-y-1',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
