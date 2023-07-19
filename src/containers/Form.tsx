import { useForm as useHookForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button, Grid, ColProps, useMantineTheme } from '@mantine/core';
import { FormController, ControllerProps } from '@components/Form';
import { IconCheck, IconX } from '@tabler/icons-react';

const Form = () => {
  const theme = useMantineTheme();
  const schema = z
    .object({
      username: z.string().min(1, { message: 'Required' }),
      password: z.string().min(1, { message: 'Required' }),
      age: z.union([z.custom<''>(), z.number().positive()]).superRefine((value, ctx) => {
        if (value === '') {
          ctx.addIssue({
            code: 'custom',
            message: 'Required',
          });
        }
      }),
      confirmPassword: z.string().min(1, { message: 'Required' }),
      email: z.string().min(1, { message: 'Required' }).email({ message: 'Wrong Format' }),
      drinks: z.string().array().min(1, { message: 'Required' }),
      position: z.string().min(1, { message: 'Required' }),
      browser: z.string().min(1, { message: 'Required' }),
      comments: z.string().min(1, { message: 'Required' }),
      date: z
        .date()
        .nullable()
        .superRefine((value, ctx) => {
          if (value == null) {
            ctx.addIssue({
              code: 'custom',
              message: 'Required',
            });
          }
        }),
      programmingLanguage: z.string().array().min(1, { message: 'Required' }),
      resume: z.custom<File>().array().min(1, { message: 'Required' }),
      notification: z.string().array().optional(),
      code: z.string().superRefine((value, ctx) => {
        if (value.length === 6 && value !== '123456') {
          ctx.addIssue({
            code: 'custom',
            message: 'Wrong Code',
          });
        }

        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        if (methods.formState.isSubmitting && value.length !== 6) {
          ctx.addIssue({
            code: 'custom',
            message: 'Required',
          });
        }
      }),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: 'Passwords do not match',
      path: ['confirmPassword'],
    });

  const methods = useHookForm<{
    username: string;
    email: string;
    age: number | '';
    password: string;
    confirmPassword: string;
    drinks: Array<string>;
    position: string;
    browser: string;
    comments: string;
    date: Date | null;
    programmingLanguage: Array<string>;
    resume: File[];
    notification: string[];
    code: string;
  }>({
    resolver: zodResolver(schema),
    defaultValues: {
      username: '',
      password: '',
      age: '',
      confirmPassword: '',
      email: '',
      drinks: [],
      position: '',
      browser: '',
      comments: '',
      date: null,
      programmingLanguage: [],
      resume: [],
      notification: ['agreed'],
      code: '',
    },
    mode: 'onTouched',
  });

  const fields: (ControllerProps & { col?: ColProps })[] = [
    {
      control: 'text-input',
      name: 'username',
      label: 'Username',
      withAsterisk: true,
    },
    {
      control: 'text-input',
      type: 'email',
      name: 'email',
      label: 'Email',
      withAsterisk: true,
    },
    {
      control: 'password-input',
      name: 'password',
      label: 'Password',
      withAsterisk: true,
    },
    {
      control: 'password-input',
      name: 'confirmPassword',
      label: 'Confirm Password',
      withAsterisk: true,
    },
    {
      control: 'checkbox-group',
      name: 'drinks',
      label: 'Drinks',
      options: [
        { label: 'Coffee', value: 'coffee' },
        { label: 'Tea', value: 'tea' },
        { label: 'Wine', value: 'wine' },
      ],
      withAsterisk: true,
    },
    {
      control: 'select',
      name: 'position',
      label: 'Position',
      options: [
        { label: 'Backend', value: 'backend' },
        { label: 'Frontend', value: 'frontend' },
        { label: 'Fullstack', value: 'fullstack' },
      ],
      withAsterisk: true,
      placeholder: 'Pick Position',
    },
    {
      control: 'radio-group',
      name: 'browser',
      label: 'Browser',
      options: [
        { label: 'Firefox', value: 'firefox' },
        { label: 'Edge', value: 'edge' },
        { label: 'Chrome', value: 'chrome' },
        { label: 'Opera', value: 'opera' },
        { label: 'Safari', value: 'safari' },
      ],
      withAsterisk: true,
    },
    {
      control: 'date-input',
      name: 'date',
      label: 'Date',
      placeholder: 'Pick Date',
      withAsterisk: true,
      allowDeselect: true,
    },
    {
      control: 'number-input',
      name: 'age',
      label: 'Age',
      withAsterisk: true,
      min: 1,
    },
    {
      control: 'multi-select',
      name: 'programmingLanguage',
      label: 'Programming Language',
      options: [
        {
          label: 'Javascript',
          value: 'javascript',
        },
        {
          label: 'Typescript',
          value: 'typescript',
        },
        {
          label: 'Go',
          value: 'go',
        },
        {
          label: 'Python',
          value: 'python',
        },
        {
          label: 'Rust',
          value: 'rust',
        },
      ],
      clearable: true,
      searchable: true,
      creatable: true,
      withAsterisk: true,
    },
    {
      control: 'file-input',
      name: 'resume',
      label: 'Resume',
      multiple: true,
      clearable: true,
      withAsterisk: true,
      accept: 'application/pdf',
      col: {
        md: 12,
        lg: 12,
      },
    },
    {
      control: 'text-area',
      name: 'comments',
      label: 'Comments',
      withAsterisk: true,
      col: {
        md: 12,
        lg: 12,
      },
    },
    {
      control: 'switch-group',
      name: 'notification',
      label: 'Settings',
      options: [
        {
          label: 'I agree to receive notifications',
          value: 'agreed',
          color: 'teal',
          thumbIcon:
            methods.watch('notification').length > 0 ? (
              <IconCheck size={12} color={theme.colors.teal[theme.fn.primaryShade()]} stroke={3} />
            ) : (
              <IconX size={12} color={theme.colors.red[theme.fn.primaryShade()]} stroke={3} />
            ),
        },
      ],
      col: {
        md: 12,
        lg: 12,
      },
    },
    {
      control: 'pin-input',
      label: 'Verification Code',
      name: 'code',
      oneTimeCode: true,
      placeholder: '',
      withAsterisk: true,
      mask: true,
      length: 6,
      size: 'md',
      col: {
        md: 12,
        lg: 12,
        mt: 10,
      },
    },
  ];

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit((data) => {
          console.log(data); // eslint-disable-line no-console
        })}
      >
        <Grid justify="center" gutter="xl">
          {fields.map((field, index) => {
            const { col } = field;
            return (
              <Grid.Col xs={12} sm={12} md={6} lg={6} key={`${field.name}-${index}`} {...col}>
                <FormController {...field} />
              </Grid.Col>
            );
          })}
          <Grid.Col xs={3.5} sm={2.5} md={2.5} lg={2.5} xl={2.5} mt={10}>
            <Button type="submit" loading={methods.formState.isSubmitting} fullWidth>
              {methods.formState.isSubmitting ? 'Submitting' : 'Submit'}
            </Button>
          </Grid.Col>
        </Grid>
      </form>
    </FormProvider>
  );
};

export default Form;
