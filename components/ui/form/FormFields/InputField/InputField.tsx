import { Input, InputProps } from '@/components/ui/Input';
import { cn } from '@/lib/utils';
import get from 'lodash/get';
import { FieldValues } from 'react-hook-form';

import { FormFieldProps } from '../types';

type InputFieldProps<T extends FieldValues> = FormFieldProps<T> &
  Omit<InputProps, 'name'>;

export function InputField<T extends FieldValues>(props: InputFieldProps<T>) {
  const { register, name, id, formState, containerClassName, ...rest } = props;
  const { errors } = formState;
  const error = get(errors, name);
  const errorText = error?.message;

  const renderHelperText = () => {
    if (errorText && typeof errorText === 'string') {
      return errorText;
    }
  };

  return (
    <Input
      id={id || name}
      containerClassName={cn('my-4', containerClassName)}
      isError={!!error}
      helperText={renderHelperText()}
      {...register(name)}
      {...rest}
    />
  );
}
