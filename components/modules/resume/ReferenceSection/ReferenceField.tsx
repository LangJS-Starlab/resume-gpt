import { Icons } from '@/components/Icons';
import { AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/Accordion';
import { Button } from '@/components/ui/Button';
import { FormFieldProps, InputField, TextAreaField } from '@/components/ui/form';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/Tooltip';
import React from 'react';
import {
  FieldArrayWithId,
  UseFieldArrayRemove,
  UseFormSetValue,
} from 'react-hook-form';
import { ResumeFormValues } from '../types';

type ReferenceFieldProps = {
  field: FieldArrayWithId<ResumeFormValues, 'references'>;
  index: number;
  fieldProps: Omit<FormFieldProps<ResumeFormValues>, 'name'>;
  setValue: UseFormSetValue<ResumeFormValues>;
  remove: UseFieldArrayRemove;
};

export const ReferenceField = ({
  field,
  index,
  fieldProps,
  setValue,
  remove,
}: ReferenceFieldProps) => {
  const [title, setTitle] = React.useState('');

  React.useEffect(() => {
    field.name && setTitle(field.name);
  }, [field.name, index, setValue]);

  const onRemoveItem = (index: number) => {
    return () => {
      remove(index);
    };
  };

  const onNameFieldChange = (value: string) => {
    setTitle(value);
  };

  return (
    <AccordionItem value={field.id}>
      <TooltipProvider delayDuration={100}>
        <div>
          <Tooltip>
            <TooltipTrigger className="w-full" asChild>
              <div>
                <AccordionTrigger>
                  {title || '(New Reference)'}
                </AccordionTrigger>
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
                onClick={onRemoveItem(index)}
              >
                <Icons.trash size={14} className="text-red-500" />
              </Button>
            </TooltipContent>
          </Tooltip>
        </div>
      </TooltipProvider>
      <AccordionContent className="px-2">
        <div className="grid lg:grid-cols-2 lg:gap-4">
          <InputField
            name={`references.${index}.name` as const}
            label="Reference"
            onValueChange={onNameFieldChange}
            {...fieldProps}
          />
        </div>
        <TextAreaField
          name={`references.${index}.reference` as const}
          label="Comments"
          rows={5}
          {...fieldProps}
        />
      </AccordionContent>
    </AccordionItem>
  );
};
