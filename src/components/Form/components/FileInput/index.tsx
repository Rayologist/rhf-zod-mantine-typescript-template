import { FileInput as MantineFileInput } from '@mantine/core';
import { FileInputProps } from 'types';
import { IconUpload } from '@tabler/icons';
import { useController } from 'react-hook-form';
import ValueComponent from './ValueComponent';
import ErrorMessage from '../ErrorMessage';

function FileInput(props: FileInputProps<boolean>) {
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
    <MantineFileInput
      label={label}
      icon={<IconUpload size={14} />}
      valueComponent={ValueComponent}
      onChange={(value) => onChange(value ?? defaultValues?.[name])}
      error={error}
      {...rest}
      {...restField}
    />
  );
}

export default FileInput;
