import {
  PasswordInputProps as MantinePasswordInputProps,
  RadioGroupProps as MantineRadioGroupProps,
  RadioProps,
  SelectProps as MantineSelectProps,
  TextareaProps as MantineTextareaProps,
  TextInputProps as MantineTextInputProps,
  CheckboxGroupProps as MantineCheckboxGroupProps,
  CheckboxProps,
  NumberInputProps as MantineNumberInputProps,
  MultiSelectProps as MantineMultiSelectProps,
  FileInputProps as MantineFileInputProps,
  SwitchGroupProps as MantineSwitchGroupProps,
  SwitchProps,
  ColProps,
} from '@mantine/core';
import { DatePickerProps as MantineDatePickerProps } from '@mantine/dates';
import { ReactNode } from 'react';
import { FieldValues, UseFormReturn } from 'react-hook-form';

export type Option<OtherProps = {}> = {
  label: ReactNode;
  value: any;
} & OtherProps;

export interface Options<OtherProps = {}> {
  options: Option<OtherProps>[];
}

export type Controlled<T> = { label: ReactNode; name: string } & T;

export type TextInputProps = Controlled<MantineTextInputProps>;
export type PasswordInputProps = Controlled<MantinePasswordInputProps>;
export type TextareaProps = Controlled<MantineTextareaProps>;
export type NumberInputProps = Controlled<MantineNumberInputProps>;
export type DatePickerProps = Controlled<MantineDatePickerProps>;
export type FileInputProps<T extends boolean> = Controlled<MantineFileInputProps<T>>;
export type SelectProps = Controlled<
  Omit<MantineSelectProps, 'data'> & {
    options: MantineSelectProps['data'];
  }
>;
export type MultiSelectProps = Controlled<
  Omit<MantineMultiSelectProps, 'data'> & {
    options: MantineMultiSelectProps['data'];
  }
>;
export type CheckboxGroupProps = Controlled<
  Omit<MantineCheckboxGroupProps, 'children'> & Options<CheckboxProps>
>;
export type RadioGroupProps = Controlled<
  Omit<MantineRadioGroupProps, 'children'> & Options<RadioProps>
>;
export type SwitchGroupProps = Controlled<
  Omit<MantineSwitchGroupProps, 'children'> & Options<SwitchProps>
>;

export type ControllerProps =
  | ({ control: 'text-input' } & TextInputProps)
  | ({ control: 'password-input' } & PasswordInputProps)
  | ({ control: 'select' } & SelectProps)
  | ({ control: 'checkbox-group' } & CheckboxGroupProps)
  | ({ control: 'radio-group' } & RadioGroupProps)
  | ({ control: 'text-area' } & TextareaProps)
  | ({ control: 'date-picker' } & DatePickerProps)
  | ({ control: 'number-input' } & NumberInputProps)
  | ({ control: 'multi-select' } & MultiSelectProps)
  | ({ control: 'file-input' } & FileInputProps<boolean>)
  | ({ control: 'switch-group' } & SwitchGroupProps);

type Controllers<TFieldValues extends FieldValues, TContext> = {
  [key in keyof TFieldValues]: ControllerProps & { name: key } & {
    col?: ColProps;
    after?: ReactNode | ((ctx: UseFormReturn<TFieldValues, TContext>) => ReactNode);
  };
};

export type FormControllerProps<TFieldValues extends FieldValues = FieldValues, TContext = any> = {
  controllers:
    | Controllers<TFieldValues, TContext>
    | ((context: UseFormReturn<TFieldValues, TContext>) => Controllers<TFieldValues, TContext>);
};
