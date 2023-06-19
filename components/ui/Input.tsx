import { cn } from '@/lib/utils';
import { cva, VariantProps } from 'class-variance-authority';
import React from 'react';
import { Label } from './Label';

const inputVariants = cva(
  `flex h-10 w-full rounded-md border border-slate-300 bg-transparent py-2 px-3 text-sm placeholder:text-slate-400 
focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 
dark:border-slate-700 dark:text-slate-50 dark:focus:ring-slate-400 dark:focus:ring-offset-slate-900`,
  {
    variants: {
      isError: {
        true: 'border-red-500 dark:border-red-500',
      },
    },
  }
);

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  containerClassName?: string;
}

const Input = React.forwardRef<
  HTMLInputElement,
  InputProps & VariantProps<typeof inputVariants>
>(
  (
    { className, label, helperText, containerClassName, isError, ...props },
    ref
  ) => {
    return (
      <div
        className={cn(
          `relative grid w-full max-w-sm items-center gap-1.5`,
          containerClassName
        )}
      >
        {label ? <Label htmlFor={props.name}>{label}</Label> : null}
        <input
          className={cn(inputVariants({ isError, className }))}
          ref={ref}
          {...props}
        />
        {helperText ? (
          <p
            className={cn(
              'absolute -bottom-5 text-xs text-slate-500',
              isError && 'text-red-500'
            )}
          >
            {helperText}
          </p>
        ) : null}
      </div>
    );
  }
);

Input.displayName = 'Input';

export { Input };
