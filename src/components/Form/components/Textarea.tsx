import { Textarea as MantineTextarea } from '@mantine/core';
import { useController } from 'react-hook-form';
import { Controlled, TextareaProps } from '../types';
import { ErrorMessage } from './ErrorMessage';

function Textarea(props: Controlled<TextareaProps>) {
  const { label, name, ...rest } = props;
  const {
    field,
    fieldState: { error: fieldError },
  } = useController({ name });

  const error = fieldError ? (
    <ErrorMessage>{fieldError.message?.toString()}</ErrorMessage>
  ) : undefined;

  return <MantineTextarea id={name} label={label} error={error} {...rest} {...field} />;
}

export default Textarea;
