import { Button, Grid, ButtonProps, useMantineTheme } from '@mantine/core';
import { useId } from '@mantine/hooks';
import React, { ReactNode } from 'react';
import {
  useForm as useHookForm,
  FormProvider,
  FieldValues,
  UseFormProps,
  SubmitHandler,
  SubmitErrorHandler,
  UseFormReturn,
} from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { FormControllerProps, OnSubmit, OnSubmitError, SubmitActions } from 'types';
import FormController from './FormController';

type AsyncDefaultValues<TFieldValues> = (payload?: unknown) => Promise<TFieldValues>;

type FormProps<TFieldValues extends FieldValues, TContext> = Omit<
  UseFormProps<TFieldValues, TContext>,
  'defaultValues'
> &
  FormControllerProps<TFieldValues, TContext> & {
    schema: z.ZodType<TFieldValues>;
    defaultValues: TFieldValues | AsyncDefaultValues<TFieldValues>;
    onSubmit: OnSubmit<TFieldValues, TContext>;
    onSubmitError?: OnSubmitError<TFieldValues, TContext>;
  };

const useForm = <TFieldValues extends FieldValues = FieldValues, TContext = any>(
  props: FormProps<TFieldValues, TContext>
) => {
  const id = useId();
  const theme = useMantineTheme();

  const {
    controllers,
    schema,
    defaultValues,
    onSubmit: onSubmitInput,
    onSubmitError: onSubmitErrorInput,
    ...rest
  } = props;

  const methods = useHookForm<TFieldValues, TContext>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues as UseFormProps<TFieldValues, TContext>['defaultValues'],
    ...rest,
  });

  const submitActions = {
    formState: methods.formState,
    reset: methods.reset,
    resetField: methods.resetField,
    setError: methods.setError,
    clearErrors: methods.clearErrors,
    setValue: methods.setValue,
    setFocus: methods.setFocus,
    getValues: methods.getValues,
    getFieldState: methods.getFieldState,
    trigger: methods.trigger,
  };

  const onSubmit =
    (actions: SubmitActions<TFieldValues, TContext>): SubmitHandler<TFieldValues> =>
    (data, event) =>
      onSubmitInput(data, actions, event);

  const onSubmitError =
    (actions: SubmitActions<TFieldValues, TContext>): SubmitErrorHandler<TFieldValues> =>
    (errors, event) =>
      onSubmitErrorInput?.(errors, actions, event);

  const FormWrapper = ({
    children,
  }: {
    children?: ReactNode | ((ctx: UseFormReturn<TFieldValues, TContext>) => ReactNode);
  }) => (
    <FormProvider {...methods}>
      <form
        id={id}
        onSubmit={methods.handleSubmit(
          onSubmit(submitActions),
          onSubmitErrorInput ? onSubmitError(submitActions) : undefined
        )}
      >
        <Grid justify="center" gutter="xl">
          {Object.values(controllers).map((field, index) => {
            const { col, after, ...controllerProps } = field;
            return (
              <Grid.Col key={`${field.name}-${index}`} {...col}>
                <FormController {...controllerProps} />
                {typeof after === 'function' ? after(methods) : after}
              </Grid.Col>
            );
          })}
        </Grid>
        {typeof children === 'function' ? children(methods) : children}
      </form>
    </FormProvider>
  );

  FormWrapper.Button = (buttonProps: ButtonProps) => (
    <Button type="submit" form={id} loaderProps={{ color: theme.colors.blue[5] }} {...buttonProps}>
      {buttonProps.children}
    </Button>
  );

  return FormWrapper;
};

export default useForm;
