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
      {/* eslint-disable @typescript-eslint/no-shadow */}
      {options.map((option, index) => {
        const { label, value, ...rest } = option;
        return <Radio key={`${label}-${index}`} value={value} label={label} {...rest} />;
      })}
    </Radio.Group>
  );
}

export default RadioGroup;
