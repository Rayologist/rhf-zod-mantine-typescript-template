import { Select as MantineSelect } from '@mantine/core';
import { IconChevronDown } from '@tabler/icons-react';
import { useController } from 'react-hook-form';
import { SelectProps } from '../types';
import ErrorMessage from './ErrorMessage';

function Select(props: SelectProps) {
  const { label, options, name, ...rest } = props;

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
    <MantineSelect
      id={name}
      rightSection={<IconChevronDown width={15} color="#9e9e9e" />}
      styles={{ rightSection: { pointerEvents: 'none' } }}
      label={label}
      onChange={(value) => onChange(value ?? defaultValues?.[name])}
      allowDeselect
      error={error}
      {...rest}
      data={options}
      {...restField}
    />
  );
}

export default Select;
