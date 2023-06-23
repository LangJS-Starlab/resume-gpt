import { Label } from '@/components/ui/Label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/Select';
import formatISO from 'date-fns/formatISO';
import get from 'lodash/get';
import React from 'react';
import { FieldValues, SetFieldValue } from 'react-hook-form';

import { FormFieldProps } from '../types';

const monthOptions = [...Array(12).keys()].map((i) => {
  const month = `${i + 1}`;
  return { label: month, value: month };
});

const getYearOptions = () => {
  const tenYearsFromNow = new Date().getFullYear() + 10;
  return [...Array(50).keys()].map((n) => {
    const year = `${tenYearsFromNow - n}`;
    return {
      label: year,
      value: year,
    };
  });
};

type MonthYearDateFieldProps<T extends FieldValues> = FormFieldProps<T> & {
  monthSelectLabel?: string;
  yearSelectLabel?: string;
  setValue: SetFieldValue<T>;
  value?: string
};

export function MonthYearDateField<T extends FieldValues>(
  props: MonthYearDateFieldProps<T>
) {
  const {
    register,
    name,
    value,
    setValue,
    monthSelectLabel = 'Select month',
    yearSelectLabel = 'Select year',
    formState,
    ...rest
  } = props;
  const monthValue = value ? `${new Date(value).getMonth() + 1}` : undefined;
  const yearValue = value ? `${new Date(value).getFullYear()}` : undefined;
  const [month, setMonth] = React.useState<string | undefined>(monthValue);
  const [year, setYear] = React.useState<string | undefined>(yearValue);
  const { errors } = formState;
  const error = get(errors, name);

  React.useEffect(() => {
    if (!month || !year) {
      return;
    }
    const date = new Date(year + '-' + month);
    const isoDateString = formatISO(date);
    setValue(name, isoDateString);
  }, [month, name, setValue, year]);

  const onMonthChange = (value: string) => {
    setMonth(value);
  };

  const onYearChange = (value: string) => {
    setYear(value);
  };

  return (
    <div className="grid lg:grid-cols-2 lg:gap-4">
      <div className="my-4 grid w-full max-w-sm items-center gap-1.5">
        {monthSelectLabel ? (
          <Label htmlFor={`${name}-month`}>{monthSelectLabel}</Label>
        ) : null}
        <Select name={`${name}-month`} value={month} onValueChange={onMonthChange}>
          <SelectTrigger>
            <SelectValue placeholder="Select month" />
          </SelectTrigger>
          <SelectContent>
            {monthOptions.map((month) => (
              <SelectItem key={month.value} value={month.value}>
                {month.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="my-4 grid w-full max-w-sm items-center gap-1.5">
        {yearSelectLabel ? (
          <Label htmlFor={`${name}-year`}>{yearSelectLabel}</Label>
        ) : null}
        <Select name={`${name}-year`} value={year} onValueChange={onYearChange}>
          <SelectTrigger>
            <SelectValue placeholder="Select year" />
          </SelectTrigger>
          <SelectContent className='h-80'>
            {getYearOptions().map((year) => (
              <SelectItem key={year.value} value={year.value}>
                {year.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <input {...register(name)} {...rest} type="hidden" />
    </div>
  );
}
