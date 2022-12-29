import { Switch } from '@mantine/core';
import { SwitchGroupProps } from 'types';
import { useController } from 'react-hook-form';
import ErrorMessage from './ErrorMessage';

function SwitchGroup(props: SwitchGroupProps) {
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
    <Switch.Group
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
        return <Switch key={`${label}-${index}`} value={value} label={label} {...rest} />;
      })}
    </Switch.Group>
  );
}

export default SwitchGroup;
