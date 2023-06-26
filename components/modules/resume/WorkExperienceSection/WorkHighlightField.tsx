import React from 'react'

import { Icons } from '@/components/Icons';
import { Button } from '@/components/ui/Button';
import { FormFieldProps, TextAreaField } from '@/components/ui/form';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/Tooltip';
import {
  UseFieldArrayRemove,
} from 'react-hook-form';
import { ResumeFormValues } from '../types';

export type WorkHighlightFieldProps = {
  workIndex: number;
  highlightIndex: number;
  fieldProps: Omit<FormFieldProps<ResumeFormValues>, 'name'>;
  remove: UseFieldArrayRemove;
};

export const WorkHighlightField = ({
  workIndex,
  highlightIndex,
  fieldProps,
  remove,
}: WorkHighlightFieldProps) => {

  const onRemoveItem = (index: number) => {
    return () => {
      remove(index);
    };
  };

  return (
    <TooltipProvider delayDuration={100}>
      <div>
        <Tooltip>
          <TooltipTrigger className="w-full" asChild>
            <div>
              <TextAreaField
                name={`work.${workIndex}.highlights.${highlightIndex}` as const}
                label={`Highlight #${highlightIndex + 1}`}
                rows={2}
                {...fieldProps}
              />
            </div>
          </TooltipTrigger>
          <TooltipContent
            side="right"
            sideOffset={14}
            className="border-none  p-0"
          >
            <Button
              type="button"
              variant="outline"
              onClick={onRemoveItem(highlightIndex)}
            >
              <Icons.trash size={14} className="text-red-500" />
            </Button>
          </TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  );
};
