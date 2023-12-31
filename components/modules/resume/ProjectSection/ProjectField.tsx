import { Icons } from '@/components/Icons';
import { AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/Accordion';
import { Button } from '@/components/ui/Button';
import { FormFieldProps, InputField, MonthYearDateField, TextAreaField } from '@/components/ui/form';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/Tooltip';
import React from 'react';
import {
  FieldArrayWithId,
  UseFieldArrayRemove,
  UseFormSetValue,
} from 'react-hook-form';
import { ResumeFormValues } from '../types';

type ProjectFieldProps = {
  field: FieldArrayWithId<ResumeFormValues, 'projects'>;
  index: number;
  fieldProps: Omit<FormFieldProps<ResumeFormValues>, 'name'>;
  setValue: UseFormSetValue<ResumeFormValues>;
  remove: UseFieldArrayRemove;
};

export const ProjectField = ({
  field,
  index,
  fieldProps,
  setValue,
  remove,
}: ProjectFieldProps) => {
  const [title, setTitle] = React.useState('');

  React.useEffect(() => {
    field.name && setTitle(field.name);
  }, [field.name]);

  const onRemoveItem = (index: number) => {
    return () => {
      remove(index);
    };
  };

  const onNameFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  return (
    <AccordionItem value={field.id}>
      <TooltipProvider delayDuration={100}>
        <div>
          <Tooltip>
            <TooltipTrigger className="w-full" asChild>
              <div>
                <AccordionTrigger>{title || '(New Project)'}</AccordionTrigger>
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
        <div>
          <div className="grid lg:grid-cols-2 lg:gap-4">
            <InputField
              name={`projects.${index}.name` as const}
              label="Project"
              onChange={onNameFieldChange}
              {...fieldProps}
            />
            <InputField
              name={`projects.${index}.entity` as const}
              label="Company Name"
              {...fieldProps}
            />
          </div>
          <TextAreaField
            name={`projects.${index}.summary` as const}
            label="Description"
            rows={5}
            {...fieldProps}
          />
          <div className="grid lg:grid-cols-2 lg:gap-4">
            <InputField
              name={`projects.${index}.type` as const}
              label="Type"
              {...fieldProps}
            />
            <InputField
              name={`projects.${index}.website` as const}
              label="Website"
              {...fieldProps}
            />
          </div>
          <MonthYearDateField
            name={`projects.${index}.startDate` as const}
            monthSelectLabel="Start month"
            yearSelectLabel="Start year"
            setValue={setValue}
            value={field.startDate}
            {...fieldProps}
          />
          <MonthYearDateField
            name={`projects.${index}.endDate` as const}
            monthSelectLabel="End month"
            yearSelectLabel="End year"
            setValue={setValue}
            value={field.endDate}
            {...fieldProps}
          />
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};
