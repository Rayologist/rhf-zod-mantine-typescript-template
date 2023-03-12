import { useState } from 'react';
import { MultiSelect as MantineMultiSelect } from '@mantine/core';
import { MultiSelectProps } from 'types';
import { useController } from 'react-hook-form';
import ErrorMessage from './ErrorMessage';

function MultiSelect(props: MultiSelectProps) {
  const { label, name, ...rest } = props;
  const [options, setOptions] = useState(props.options);
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
    <MantineMultiSelect
      id={name}
      label={label}
      data={options}
      onChange={(value) => {
        onChange(value ?? defaultValues?.[value]);
      }}
      error={error}
      getCreateLabel={(query) => `+ ${query}`}
      onCreate={(query) => {
        const capitalized = query.charAt(0).toUpperCase() + query.substring(1);
        const item = { label: capitalized, value: query };
        setOptions((prev) => [...prev, item]);
        return item;
      }}
      {...rest}
      {...restField}
    />
  );
}

export default MultiSelect;
