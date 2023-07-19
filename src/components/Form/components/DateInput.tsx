import { DateInput as MantineDateInput } from '@mantine/dates';
import { useController } from 'react-hook-form';
import { DateInputProps } from '../types';
import ErrorMessage from './ErrorMessage';

function DatePickerInput(props: DateInputProps) {
  const { label, name, ...rest } = props;
  const {
    field,
    fieldState: { error: fieldError },
  } = useController({ name });

  const error = fieldError ? (
    <ErrorMessage>{fieldError.message?.toString()}</ErrorMessage>
  ) : undefined;

  return <MantineDateInput id={name} label={label} error={error} {...rest} {...field} />;
}

export default DatePickerInput;
