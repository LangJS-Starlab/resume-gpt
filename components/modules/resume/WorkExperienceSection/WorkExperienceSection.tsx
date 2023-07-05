import { Icons } from '@/components/Icons';
import { Accordion } from '@/components/ui/Accordion';
import { Button } from '@/components/ui/Button';
import { Section } from '@/components/ui/Section';
import { Paragraph } from '@/components/ui/Typography';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import formatISO from 'date-fns/formatISO';
import React from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';

import { ResumeFormValues } from '../types';
import { WorkExperienceField } from './WorkExperienceField';

export const WorkExperienceSection = () => {
  const [activeItem, setActiveItem] = React.useState<string>();
  const [parent] = useAutoAnimate({
    duration: 200,
  });
  const { register, formState, control, setValue } =
    useFormContext<ResumeFormValues>();
  const fieldProps = { register, formState };
  const { fields, prepend, remove } = useFieldArray({
    name: 'work',
    control,
  });

  const onAddNewItem = () => {
    prepend({
      description: '',
      startDate: formatISO(new Date()),
      endDate: formatISO(new Date()),
      location: '',
      company: '',
      position: '',
      url: '',
    });
  };

  const onAccordionValueChange = (value: string) => {
    setActiveItem(value);
  };

  return (
    <Section
      title="Work Experiences"
      className="mt-4"
      leftElement={<Icons.briefcase className="text-xl font-semibold" />}
      rightElement={
        <Button
          type="button"
          variant="outline"
          onClick={onAddNewItem}
        >
          <Icons.plus size={14} className="mr-1"/>
          Add
        </Button>
      }
    >
      {fields.length === 0 && (
        <Paragraph
          className="text-center text-gray-500"
          text={`You don't have any work experiences yet.`}
        />
      )}
      <div>
        <Accordion
          type="single"
          collapsible
          defaultValue={fields?.[0]?.id}
          value={activeItem}
          onValueChange={onAccordionValueChange}
        >
          <div ref={parent}>
            {fields.map((field, index) => {
              const props = {
                field,
                index,
                remove,
                setValue,
                fieldProps,
              };
              return <WorkExperienceField key={field.id} {...props} />;
            })}
          </div>
        </Accordion>
      </div>
    </Section>
  );
};
