'use client';

import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
  type HTMLAttributes,
  type ButtonHTMLAttributes,
} from 'react';
import { cn } from '@/lib/utils';

type PopoverContextValue = {
  open: boolean;
  setOpen(next: boolean): void;
};

const PopoverContext = createContext<PopoverContextValue | null>(null);

function usePopoverContext() {
  const ctx = useContext(PopoverContext);
  if (!ctx) {
    throw new Error('Popover components must be used inside <Popover>');
  }
  return ctx;
}

interface PopoverProps {
  children: ReactNode;
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?(open: boolean): void;
}

export function Popover({
  children,
  defaultOpen = false,
  open: controlledOpen,
  onOpenChange,
}: PopoverProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);

  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : uncontrolledOpen;

  const setOpen = useCallback(
    (next: boolean) => {
      if (!isControlled) {
        setUncontrolledOpen(next);
      }
      onOpenChange?.(next);
    },
    [isControlled, onOpenChange],
  );

  return (
    <PopoverContext.Provider value={{ open, setOpen }}>
      <div className="relative inline-block">{children}</div>
    </PopoverContext.Provider>
  );
}

interface PopoverTriggerProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export function PopoverTrigger({
  children,
  className,
  ...props
}: PopoverTriggerProps) {
  const { open, setOpen } = usePopoverContext();

  return (
    <button
      type="button"
      {...props}
      onClick={(e) => {
        props.onClick?.(e);
        setOpen(!open);
      }}
      className={cn(
        'inline-flex items-center justify-center rounded-full border border-slate-700/60 bg-slate-900/70 px-2 py-1 text-xs text-slate-300 hover:bg-slate-800/80',
        className,
      )}
    >
      {children}
    </button>
  );
}

interface PopoverContentProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export function PopoverContent({
  children,
  className,
  ...props
}: PopoverContentProps) {
  const { open, setOpen } = usePopoverContext();

  if (!open) return null;

  return (
    <div
      {...props}
      className={cn(
        'absolute right-0 z-30 mt-2 min-w-[160px] rounded-xl border border-slate-700/70 bg-[#050509] p-2 text-xs text-slate-100 shadow-xl shadow-black/50',
        className,
      )}
      onClick={() => setOpen(false)}
    >
      {children}
    </div>
  );
}
