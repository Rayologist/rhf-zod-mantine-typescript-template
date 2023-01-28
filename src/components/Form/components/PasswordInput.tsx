import { PasswordInput as MantinePasswordInput } from '@mantine/core';
import { PasswordInputProps } from 'types';
import { IconEye, IconEyeOff } from '@tabler/icons-react';
import { useController } from 'react-hook-form';
import ErrorMessage from './ErrorMessage';

function PasswordInput(props: PasswordInputProps) {
  const { label, name, ...rest } = props;
  const {
    field,
    fieldState: { error: fieldError },
  } = useController({ name });

  const error = fieldError ? (
    <ErrorMessage>{fieldError.message?.toString()}</ErrorMessage>
  ) : undefined;

  return (
    <MantinePasswordInput
      id={name}
      label={label}
      error={error}
      visibilityToggleIcon={({ reveal, size }) =>
        reveal ? <IconEyeOff size={size} /> : <IconEye size={size} />
      }
      {...rest}
      {...field}
    />
  );
}

export default PasswordInput;
