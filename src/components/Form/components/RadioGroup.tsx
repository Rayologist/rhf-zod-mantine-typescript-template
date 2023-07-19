import { Group, Radio, Stack } from '@mantine/core';
import { useController } from 'react-hook-form';
import { RadioGroupProps } from '../types';
import ErrorMessage from './ErrorMessage';

function RadioGroup(props: RadioGroupProps) {
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
      <Orientation mt="xs" {...orientationProps}>
        {options.map((option, index) => {
          const { label, value, ...rest } = option;
          return <Radio key={`${label}-${index}`} value={value} label={label} {...rest} />;
        })}
      </Orientation>
    </Radio.Group>
  );
}

export default RadioGroup;
