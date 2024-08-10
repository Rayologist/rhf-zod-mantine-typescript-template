import { Group, Checkbox as MantineCheckbox, Stack } from '@mantine/core';
import { useController } from 'react-hook-form';
import { CheckboxGroupProps, Controlled } from '../types';
import { ErrorMessage } from './ErrorMessage';

function CheckboxGroup(props: Controlled<CheckboxGroupProps>) {
  const { label, name, options, orientation = 'horizontal', orientationProps, ...rest } = props;
  const {
    field,
    fieldState: { error: fieldError },
    formState: { defaultValues },
  } = useController({ name });

  const error = fieldError ? (
    <ErrorMessage>{fieldError.message?.toString()}</ErrorMessage>
  ) : undefined;

  const { onChange, ...restField } = field;

  const Orientation = orientation === 'horizontal' ? Group : Stack;

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
      <Orientation mt="xs" {...orientationProps}>
        {options.map((option, index) => {
          const { label, value, ...rest } = option;
          return (
            <MantineCheckbox key={`${label}-${index}`} label={label} value={value} {...rest} />
          );
        })}
      </Orientation>
    </MantineCheckbox.Group>
  );
}

export default CheckboxGroup;
