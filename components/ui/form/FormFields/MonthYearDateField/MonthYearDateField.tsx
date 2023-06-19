import { Label } from '@/components/ui/Label';
import { Select, SelectContent, SelectItem } from '@/components/ui/Select';
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
  return [...Array(111).keys()].map((n) => {
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
};

export function MonthYearDateField<T extends FieldValues>(
  props: MonthYearDateFieldProps<T>
) {
  const {
    register,
    name,
    setValue,
    monthSelectLabel = 'Select month',
    yearSelectLabel = 'Select year',
    formState,
    ...rest
  } = props;
  const [month, setMonth] = React.useState<string>();
  const [year, setYear] = React.useState<string>();
  const { errors } = formState;
  const error = get(errors, name);
  const errorText = error?.message;

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
        <Select id={`${name}-month`} onValueChange={onMonthChange}>
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
        <Select id={`${name}-year`} onValueChange={onYearChange}>
          <SelectContent>

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
