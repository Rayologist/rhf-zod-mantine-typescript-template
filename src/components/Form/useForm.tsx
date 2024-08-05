import { Grid, Box, GridProps, BoxProps } from '@mantine/core';
import {
  useForm as useHookForm,
  FormProvider,
  FieldValues,
  UseFormProps as UseHookFormProps,
  UseFormReturn,
  FieldErrors,
} from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ControllerMap, FormControllerProps } from './types';
import { FormController } from './FormController';

type AsyncDefaultValues<TFieldValues> = (payload?: unknown) => Promise<TFieldValues>;

export type SubmitHandler<TFieldValues extends FieldValues, TContext = any> = (args: {
  data: TFieldValues;
  methods: UseFormReturn<TFieldValues, TContext>;
  event?: React.BaseSyntheticEvent;
}) => unknown | Promise<unknown>;

export type SubmitErrorHandler<TFieldValues extends FieldValues, TContext = any> = (args: {
  errors: FieldErrors<TFieldValues>;
  methods: UseFormReturn<TFieldValues, TContext>;
  event?: React.BaseSyntheticEvent;
}) => unknown | Promise<unknown>;

export type UseFormProps<TFieldValues extends FieldValues, TContext = any> = Omit<
  UseHookFormProps<TFieldValues, TContext>,
  'defaultValues'
> &
  FormControllerProps<TFieldValues, TContext> & {
    defaultValues: TFieldValues | AsyncDefaultValues<TFieldValues>;
    schema?: z.ZodType<TFieldValues>;
    onSubmit: SubmitHandler<TFieldValues, TContext>;
    onSubmitError?: SubmitErrorHandler<TFieldValues, TContext>;
  };

export type UseFormReturnValues<TFieldValues extends FieldValues = FieldValues, TContext = any> = {
  methods: UseFormReturn<TFieldValues, TContext>;
  controllers: ControllerMap<TFieldValues, TContext>;
  submit: (e?: React.BaseSyntheticEvent<object, any, any> | undefined) => Promise<void>;
};

export const useForm = <TFieldValues extends FieldValues = FieldValues, TContext = any>(
  props: UseFormProps<TFieldValues, TContext>
): UseFormReturnValues<TFieldValues, TContext> => {
  const {
    controllers: rawControllers,
    schema,
    defaultValues,
    onSubmit,
    onSubmitError,
    ...rest
  } = props;

  const methods = useHookForm<TFieldValues, TContext>({
    resolver: schema ? zodResolver(schema) : undefined,
    defaultValues: defaultValues as UseHookFormProps<TFieldValues, TContext>['defaultValues'],
    mode: props.mode ?? 'onBlur',
    ...rest,
  });

  let controllers: ControllerMap<TFieldValues, TContext>;

  if (rawControllers instanceof Function) {
    controllers = rawControllers(methods);
  } else {
    controllers = rawControllers;
  }

  const submit = methods.handleSubmit(
    (data, event) => onSubmit({ data, event, methods }),
    (errors, event) => onSubmitError?.({ errors, event, methods })
  );

  return { methods, controllers, submit };
};

export type FormProps<TFieldValues extends FieldValues = FieldValues, TContext = any> = {
  id?: string;
  children?: React.ReactNode | ((ctx: UseFormReturn<TFieldValues, TContext>) => React.ReactNode);
  form: UseFormReturnValues<TFieldValues, TContext>;
  grid?: Omit<GridProps, 'children'>;
} & Omit<BoxProps, 'children'>;

export function Form<TFieldValues extends FieldValues = FieldValues, TContext = any>(
  props: FormProps<TFieldValues, TContext>
) {
  const {
    id,
    children,
    grid,
    form: { methods, submit, controllers },
    ...rest
  } = props;

  return (
    <FormProvider {...methods}>
      <Box<'form'> component="form" id={id} onSubmit={submit} {...rest}>
        <Grid justify="center" gutter="lg" {...grid}>
          {Object.values(controllers).map((field) => {
            const { col, Field, ...controllerProps } = field;
            const component = <FormController {...controllerProps} />;
            return (
              <Grid.Col key={`${field.name}`} {...col}>
                {Field ? <Field ctx={methods} fieldComponent={component} /> : component}
              </Grid.Col>
            );
          })}
        </Grid>
        {typeof children === 'function' ? children(methods) : children}
      </Box>
    </FormProvider>
  );
}
