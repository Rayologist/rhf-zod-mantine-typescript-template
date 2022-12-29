import { Checkbox as MantineCheckbox } from '@mantine/core';
import { CheckboxGroupProps } from 'types';
import { useController } from 'react-hook-form';
import ErrorMessage from './ErrorMessage';

function CheckboxGroup(props: CheckboxGroupProps) {
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
    <MantineCheckbox.Group
      id={name}
      label={label}
      onChange={(value) => onChange(value ?? defaultValues?.[name])}
      error={error}
      {...rest}
      {...restField}
    >
      {/* eslint-disable @typescript-eslint/no-shadow */}
      {options.map((option, index) => {
        const { label, value, ...rest } = option;
        return <MantineCheckbox key={`${label}-${index}`} label={label} value={value} {...rest} />;
      })}
    </MantineCheckbox.Group>
  );
}

export default CheckboxGroup;
