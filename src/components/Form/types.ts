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
  GroupProps,
  StackProps,
  PinInputProps as MantinePinInputProps,
  InputWrapperBaseProps,
} from '@mantine/core';
import { DateInputProps as MantineDateInputProps } from '@mantine/dates';
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
export type Orientation =
  | { orientation?: 'horizontal'; orientationProps?: GroupProps }
  | { orientation?: 'vertical'; orientationProps?: StackProps };
export type TextInputProps = Controlled<MantineTextInputProps>;
export type PasswordInputProps = Controlled<MantinePasswordInputProps>;
export type TextareaProps = Controlled<MantineTextareaProps>;
export type NumberInputProps = Controlled<MantineNumberInputProps>;
export type DateInputProps = Controlled<MantineDateInputProps>;
export type PinInputProps = Controlled<MantinePinInputProps> & InputWrapperBaseProps;
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
  Omit<MantineCheckboxGroupProps, 'children'> & Options<CheckboxProps> & Orientation
>;
export type RadioGroupProps = Controlled<
  Omit<MantineRadioGroupProps, 'children'> & Options<RadioProps> & Orientation
>;
export type SwitchGroupProps = Controlled<
  Omit<MantineSwitchGroupProps, 'children'> & Options<SwitchProps> & Orientation
>;

export type ControllerProps =
  | ({ control: 'checkbox-group' } & CheckboxGroupProps)
  | ({ control: 'date-input' } & DateInputProps)
  | ({ control: 'file-input' } & FileInputProps<boolean>)
  | ({ control: 'multi-select' } & MultiSelectProps)
  | ({ control: 'number-input' } & NumberInputProps)
  | ({ control: 'password-input' } & PasswordInputProps)
  | ({ control: 'pin-input' } & PinInputProps)
  | ({ control: 'radio-group' } & RadioGroupProps)
  | ({ control: 'select' } & SelectProps)
  | ({ control: 'switch-group' } & SwitchGroupProps)
  | ({ control: 'text-area' } & TextareaProps)
  | ({ control: 'text-input' } & TextInputProps);

export type Controllers<TFieldValues extends FieldValues, TContext> = {
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
