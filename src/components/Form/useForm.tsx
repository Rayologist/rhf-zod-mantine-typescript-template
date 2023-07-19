import {
  Button,
  Grid,
  ButtonProps,
  useMantineTheme,
  Box,
  GridProps,
  BoxProps,
} from '@mantine/core';
import { useId } from '@mantine/hooks';
import React, { ReactNode } from 'react';
import {
  useForm as useHookForm,
  FormProvider,
  FieldValues,
  UseFormProps,
  UseFormReturn,
  SubmitHandler,
  SubmitErrorHandler,
  FieldErrors,
} from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Controllers, FormControllerProps } from './types';
import FormController from './FormController';

type AsyncDefaultValues<TFieldValues> = (payload?: unknown) => Promise<TFieldValues>;

type SubmitHandlerWithContext<TFieldValues extends FieldValues, TContext = any> = (
  data: TFieldValues,
  context: UseFormReturn<TFieldValues, TContext>,
  event?: React.BaseSyntheticEvent
) => unknown | Promise<unknown>;

type SubmitErrorHandlerWithContext<TFieldValues extends FieldValues, TContext = any> = (
  errors: FieldErrors<TFieldValues>,
  context: UseFormReturn<TFieldValues, TContext>,
  event?: React.BaseSyntheticEvent
) => unknown | Promise<unknown>;

type FormProps<TFieldValues extends FieldValues, TContext> = Omit<
  UseFormProps<TFieldValues, TContext>,
  'defaultValues'
> &
  FormControllerProps<TFieldValues, TContext> & {
    defaultValues: TFieldValues | AsyncDefaultValues<TFieldValues>;
    schema?: z.ZodType<TFieldValues>;
    onSubmit: SubmitHandlerWithContext<TFieldValues, TContext>;
    onSubmitError?: SubmitErrorHandlerWithContext<TFieldValues, TContext>;
  };

const useForm = <TFieldValues extends FieldValues = FieldValues, TContext = any>(
  props: FormProps<TFieldValues, TContext>
) => {
  const id = useId();
  const theme = useMantineTheme();

  const {
    controllers: rawControllers,
    schema,
    defaultValues,
    onSubmit: handleOnSubmit,
    onSubmitError: handleOnSubmitError,
    ...rest
  } = props;

  const methods = useHookForm<TFieldValues, TContext>({
    resolver: schema ? zodResolver(schema) : undefined,
    defaultValues: defaultValues as UseFormProps<TFieldValues, TContext>['defaultValues'],
    ...rest,
  });

  const onSubmit: SubmitHandler<TFieldValues> = (values, event) =>
    handleOnSubmit(values, methods, event);

  const onSubmitError: SubmitErrorHandler<TFieldValues> = (values, event) =>
    handleOnSubmitError?.(values, methods, event);

  /* eslint-disable @typescript-eslint/no-shadow */
  const Form = (
    props: {
      children?: ReactNode | ((ctx: UseFormReturn<TFieldValues, TContext>) => ReactNode);
      grid?: Omit<GridProps, 'children'>;
    } & Omit<BoxProps, 'children'>
  ) => {
    const { children, grid, ...rest } = props;
    let controllers: Controllers<TFieldValues, TContext>;

    if (rawControllers instanceof Function) {
      controllers = rawControllers(methods);
    } else {
      controllers = rawControllers;
    }

    return (
      <FormProvider {...methods}>
        <Box<'form'>
          component="form"
          id={id}
          onSubmit={methods.handleSubmit(onSubmit, onSubmitError)}
          {...rest}
        >
          <Grid justify="center" gutter="lg" {...grid}>
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
        </Box>
      </FormProvider>
    );
  };

  /* eslint-disable @typescript-eslint/no-shadow */
  Form.Button = (props: ButtonProps) => (
    <Button type="submit" form={id} loaderProps={{ color: theme.colors.blue[5] }} {...props} />
  );

  return [Form, { ...methods, onSubmit, onSubmitError }] as const;
};

export default useForm;
