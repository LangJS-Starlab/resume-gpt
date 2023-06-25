import { Icons } from '@/components/Icons';
import { InputField, TextAreaField } from '@/components/ui/form';
import { Section } from '@/components/ui/Section';
import { useFormContext } from 'react-hook-form';

import { CvFormValues } from '../types';

export const PersonalDetailsSection = () => {
  const { register, formState } = useFormContext<CvFormValues>();
  const fieldProps = { register, formState };
  return (
    <Section
      title="Personal Details"
      leftElement={<Icons.user className="text-xl font-semibold" />}
    >
      <div className="grid lg:grid-cols-2 lg:gap-4">
        <InputField name="basics.name" label="Full Name" {...fieldProps} />
        <InputField name="basics.label" label="Job Title" {...fieldProps} />
        <InputField name="basics.email" label="Email" {...fieldProps} />
        <InputField name="basics.phone" label="Phone Number" {...fieldProps} />
        <InputField name="basics.website" label="Website" {...fieldProps} />
        <InputField
          name="basics.location.address"
          label="Address"
          {...fieldProps}
        />
        <InputField name="basics.location.city" label="City" {...fieldProps} />
        <InputField
          name="basics.location.region"
          label="Nationality"
          {...fieldProps}
        />
      </div>
      <TextAreaField
        name="basics.summary"
        label="About"
        rows={5}
        className="w-full"
        {...fieldProps}
      />
    </Section>
  );
};
