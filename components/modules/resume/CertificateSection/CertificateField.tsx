import { Icons } from '@/components/Icons';
import { AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/Accordion';
import { Button } from '@/components/ui/Button';
import { FormFieldProps, InputField, MonthYearDateField } from '@/components/ui/form';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import React from 'react';
import {
  FieldArrayWithId,
  UseFieldArrayRemove,
  UseFormSetValue,
} from 'react-hook-form';
import { CvFormValues } from '../types';

type CertificateFieldProps = {
  field: FieldArrayWithId<CvFormValues, 'certificates'>;
  index: number;
  fieldProps: Omit<FormFieldProps<CvFormValues>, 'name'>;
  setValue: UseFormSetValue<CvFormValues>;
  remove: UseFieldArrayRemove;
};

export const CertificateField = ({
  field,
  index,
  fieldProps,
  setValue,
  remove,
}: CertificateFieldProps) => {
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
                <AccordionTrigger>
                  {title || '(New Certificate)'}
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
        <div>
          <div className="grid lg:grid-cols-2 lg:gap-4">
            <InputField
              name={`certificates.${index}.name` as const}
              label="Certificate"
              onChange={onNameFieldChange}
              {...fieldProps}
            />
            <InputField
              name={`certificates.${index}.url` as const}
              label="Website"
              {...fieldProps}
            />
          </div>
          <div className="grid lg:grid-cols-2 lg:gap-4">
            <InputField
              name={`certificates.${index}.issuer` as const}
              label="Issuer"
              {...fieldProps}
            />
          </div>
          <MonthYearDateField
            name={`certificates.${index}.date` as const}
            monthSelectLabel="Month"
            yearSelectLabel="Year"
            setValue={setValue}
            value={field.date}
            {...fieldProps}
          />
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};
