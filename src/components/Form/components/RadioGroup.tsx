import { Radio } from '@mantine/core';
import { RadioGroupProps } from 'types';
import { useController } from 'react-hook-form';
import ErrorMessage from './ErrorMessage';

function RadioGroup(props: RadioGroupProps) {
  const { label, name, options, ...rest } = props;
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
    <Radio.Group
      id={name}
      label={label}
      error={error}
      onChange={(value) => {
        onChange(value ?? defaultValues?.[name]);
      }}
      {...rest}
      {...restField}
    >
      {options.map((option, index) => (
        <Radio key={`${option.label}-${index}`} value={option.value} label={option.label} />
      ))}
    </Radio.Group>
  );
}

export default RadioGroup;
