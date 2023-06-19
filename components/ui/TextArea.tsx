import { cn } from '@/lib/utils';
import { cva, VariantProps } from 'class-variance-authority';
import React from 'react';

import { Label } from './Label';

export interface TextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  helperText?: string;
  containerClassName?: string;
}

const textAreaVariants = cva(
  `flex w-full rounded-md border border-slate-300 bg-transparent py-2 px-3 text-sm placeholder:text-slate-400 
  focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 
  dark:text-slate-50 dark:focus:ring-slate-400 dark:focus:ring-offset-slate-900`,
  {
    variants: {
      isError: {
        true: 'border-red-500 dark:border-red-500',
      },
    },
  }
);

const TextArea = React.forwardRef<
  HTMLTextAreaElement,
  TextAreaProps & VariantProps<typeof textAreaVariants>
>(
  (
    { className, label, helperText, isError, containerClassName, ...props },
    ref
  ) => {
    return (
      <div
        className={cn(`grid w-full  items-center gap-1.5`, containerClassName)}
      >
        {label ? <Label htmlFor={props.name}>{label}</Label> : null}
        <textarea
          className={cn(textAreaVariants({ isError, className }))}
          ref={ref}
          {...props}
        />
        {helperText ? (
          <p className="text-xs text-slate-500">{helperText}</p>
        ) : null}
      </div>
    );
  }
);

TextArea.displayName = 'TextArea';

export { TextArea };
