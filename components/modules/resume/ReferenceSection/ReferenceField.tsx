import { Icons } from '@/components/Icons';
import { AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/Accordion';
import { Button } from '@/components/ui/Button';
import { FormFieldProps, InputField, MonthYearDateField, TextAreaField } from '@/components/ui/form';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { set } from 'lodash';
import React from 'react';
import {
  FieldArrayWithId,
  UseFieldArrayRemove,
  UseFormSetValue,
} from 'react-hook-form';
import { CvFormValues } from '../types';

type EducationFieldProps = {
  field: FieldArrayWithId<CvFormValues, 'education'>;
  index: number;
  fieldProps: Omit<FormFieldProps<CvFormValues>, 'name'>;
  setValue: UseFormSetValue<CvFormValues>;
  remove: UseFieldArrayRemove;
};

type ReferenceFieldProps = {
  field: FieldArrayWithId<CvFormValues, 'references'>;
  index: number;
  fieldProps: Omit<FormFieldProps<CvFormValues>, 'name'>;
  setValue: UseFormSetValue<CvFormValues>;
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
              sideOffset={20}
              className="border-none  p-0"
            >
              <Button
                type="button"
                variant="outline"
                onClick={onRemoveItem(index)}
              >
                <Icons.trash className="text-red-500" />
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
          label="Reference"
          rows={5}
          {...fieldProps}
        />
      </AccordionContent>
    </AccordionItem>
  );
};
