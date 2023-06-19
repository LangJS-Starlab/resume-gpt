import { Icons } from '@/components/Icons';
import { AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/Accordion';
import { Button } from '@/components/ui/Button';
import { FormFieldProps, InputField, MonthYearDateField, TextAreaField } from '@/components/ui/form';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
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

export const EducationField = ({
  field,
  index,
  fieldProps,
  setValue,
  remove,
}: EducationFieldProps) => {
  const [title, setTitle] = React.useState('');

  React.useEffect(() => {
    field.institution && setTitle(field.institution);
  }, [field.institution]);

  const onRemoveItem = (index: number) => {
    return () => {
      remove(index);
    };
  };

  const onInstitutionFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  return (
    <AccordionItem value={field.id}>
      <TooltipProvider delayDuration={100}>
        <div>
          <Tooltip>
            <TooltipTrigger className="w-full" asChild>
              <div>
                <AccordionTrigger>
                  {title || '(New Education)'}
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
        <div>
          <div className="grid lg:grid-cols-2 lg:gap-4">
            <InputField
              name={`education.${index}.institution` as const}
              label="Name"
              onChange={onInstitutionFieldChange}
              {...fieldProps}
            />
            <InputField
              name={`education.${index}.area` as const}
              label="Area of study"
              {...fieldProps}
            />
          </div>
          <TextAreaField
            name={`education.${index}.studyType` as const}
            label="Description"
            rows={5}
            {...fieldProps}
          />
          <div className="grid lg:grid-cols-2 lg:gap-4">
            <InputField
              name={`education.${index}.score` as const}
              label="Score"
              {...fieldProps}
            />
            <InputField
              name={`education.${index}.url` as const}
              label="Website"
              {...fieldProps}
            />
          </div>
          <MonthYearDateField
            name={`education.${index}.startDate` as const}
            monthSelectLabel="Start month"
            yearSelectLabel="Start year"
            setValue={setValue}
            {...fieldProps}
          />
          <MonthYearDateField
            name={`education.${index}.endDate` as const}
            monthSelectLabel="End month"
            yearSelectLabel="End year"
            setValue={setValue}
            {...fieldProps}
          />
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};
