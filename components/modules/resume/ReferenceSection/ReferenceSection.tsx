import { Icons } from '@/components/Icons';
import { Accordion } from '@/components/ui/Accordion';
import { Button } from '@/components/ui/Button';
import { Section } from '@/components/ui/Section';
import { Paragraph } from '@/components/ui/Typography';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import React from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';

import { ResumeFormValues } from '../types';
import { ReferenceField } from './ReferenceField';

export const ReferenceSection = () => {
  const [activeItem, setActiveItem] = React.useState<string>();
  const [parent] = useAutoAnimate({
    duration: 200,
  });
  const { register, formState, control, setValue } =
    useFormContext<ResumeFormValues>();
  const fieldProps = { register, formState };
  const { fields, prepend, remove } = useFieldArray({
    name: 'references',
    control,
  });

  const onAddNewItem = () => {
    prepend({
      name: '',
      reference: '',
    });
  };

  const onAccordionValueChange = (value: string) => {
    setActiveItem(value);
  };

  return (
    <Section
      title="References"
      className="mt-4"
      leftElement={<Icons.users className="text-xl font-semibold" />}
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
          text={`You don't have any references yet.`}
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
              return <ReferenceField key={field.id} {...props} />;
            })}
          </div>
        </Accordion>
      </div>
    </Section>
  );
};
