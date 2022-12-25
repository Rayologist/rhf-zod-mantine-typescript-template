import { DatePicker as MantineDatePicker } from '@mantine/dates';
import { DatePickerProps } from 'types';
import { useController } from 'react-hook-form';
import ErrorMessage from './ErrorMessage';

function DatePicker(props: DatePickerProps) {
  const { label, name, ...rest } = props;
  const {
    field,
    fieldState: { error: fieldError },
    formState: { defaultValues },
  } = useController({ name });

  const error = fieldError ? (
    <ErrorMessage>{fieldError.message?.toString()}</ErrorMessage>
  ) : undefined;

  const { onChange, ...restField } = field;

  return (
    <MantineDatePicker
      label={label}
      error={error}
      onChange={(value) => onChange(value ?? defaultValues?.[name])}
      {...rest}
      {...restField}
    />
  );
}

export default DatePicker;
