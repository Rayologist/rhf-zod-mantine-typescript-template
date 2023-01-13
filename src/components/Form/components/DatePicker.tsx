import { DatePicker as MantineDatePicker } from '@mantine/dates';
import { DatePickerProps } from 'types';
import { useController } from 'react-hook-form';
import ErrorMessage from './ErrorMessage';

function DatePicker(props: DatePickerProps) {
  const { label, name, ...rest } = props;
  const {
    field,
    fieldState: { error: fieldError },
  } = useController({ name });

  const error = fieldError ? (
    <ErrorMessage>{fieldError.message?.toString()}</ErrorMessage>
  ) : undefined;

  return <MantineDatePicker label={label} error={error} {...rest} {...field} />;
}

export default DatePicker;
