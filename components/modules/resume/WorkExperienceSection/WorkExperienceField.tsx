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
  useFieldArray,
  useFormContext,
} from 'react-hook-form';
import { ResumeFormValues } from '../types';
import { WorkHighlightField, WorkHighlightFieldProps } from './WorkHighlightField';
import { Section } from '@/components/ui/Section';
import { Flex } from '@/components/ui/Flex';
import { Heading4, Paragraph } from '@/components/ui/Typography';

type WorkExperienceFieldProps = {
  field: FieldArrayWithId<ResumeFormValues, 'work'>;
  index: number;
  fieldProps: Omit<FormFieldProps<ResumeFormValues>, 'name'>;
  setValue: UseFormSetValue<ResumeFormValues>;
  remove: UseFieldArrayRemove;
};

export const WorkExperienceField = ({
  field,
  index,
  fieldProps,
  setValue,
  remove,
}: WorkExperienceFieldProps) => {
  const { control } = useFormContext<ResumeFormValues>();
  const [title, setTitle] = React.useState('');

  const { fields: highlightFields, append: appendHighlight, remove: removeHighlight } = useFieldArray({
    name: `work.${index}.highlights`,
    control,
  });

  React.useEffect(() => {
    field.position && setTitle(field.position);
  }, [field.position]);

  const onRemoveItem = (index: number) => {
    return () => {
      remove(index);
    };
  };

  const onPositionFieldChange = (value: string) => {
    setTitle(value);
  };

  const onAddNewHighlightItem = () => {
    appendHighlight('');
  };

  return (
    <AccordionItem value={field.id}>
      <TooltipProvider delayDuration={100}>
        <div>
          <Tooltip>
            <TooltipTrigger className="w-full" asChild>
              <div>
                <AccordionTrigger>
                  {title || '(New Work Experience)'}
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
              name={`work.${index}.position` as const}
              label="Position"
              onValueChange={onPositionFieldChange}
              {...fieldProps}
            />
            <InputField
              name={`work.${index}.company` as const}
              label="Company Name"
              {...fieldProps}
            />
          </div>
          <TextAreaField
            name={`work.${index}.description` as const}
            label="Description"
            rows={5}
            {...fieldProps}
          />
          <div className="grid lg:grid-cols-2 lg:gap-4">
            <InputField
              name={`work.${index}.location` as const}
              label="Location"
              {...fieldProps}
            />
            <InputField
              name={`work.${index}.url` as const}
              label="Website"
              {...fieldProps}
            />
          </div>
          <div>
            <Flex direction="row" justify="between" align="center">
              <Paragraph className='font-medium'>
                Highlights
              </Paragraph>
              <Button type='button' variant="outline" onClick={onAddNewHighlightItem}>
                <Icons.plus size={14} className="mr-1" />
                Add
              </Button>
            </Flex>
            <div className='px-4'>
              {highlightFields.map((field, highlightIndex) => {
                const props: WorkHighlightFieldProps = {
                  workIndex: index,
                  highlightIndex,
                  remove: removeHighlight,
                  fieldProps,
                };
                return <WorkHighlightField key={field.id} {...props} />;
              })}
            </div>
          </div>
          <MonthYearDateField
            name={`work.${index}.startDate` as const}
            monthSelectLabel="Start month"
            yearSelectLabel="Start year"
            setValue={setValue}
            value={field.startDate}
            {...fieldProps}
          />
          <MonthYearDateField
            name={`work.${index}.endDate` as const}
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
