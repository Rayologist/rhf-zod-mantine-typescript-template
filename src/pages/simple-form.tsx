import { Anchor, Paper, Title, Text, Container, Group, Button } from '@mantine/core';
import { z } from 'zod';
import { Form, useForm } from '../components/Form';

const sleep = (ms: number) =>
  new Promise((resolve) => {
    setTimeout(resolve, ms);
  });

export default function AuthenticationTitle() {
  const schema = z.object({
    account: z.string().min(1, { message: 'Required' }),
    password: z.string().min(1, { message: 'Required' }),
    rememberMe: z.boolean(),
  });

  type FormValues = z.infer<typeof schema>;

  const form = useForm<FormValues>({
    defaultValues: {
      account: '',
      password: '',
      rememberMe: false,
    },
    onSubmit: async ({ data, methods }) => {
      console.log(data); // eslint-disable-line no-console
      await sleep(1000);
      methods.setError(
        'account',
        { message: 'Incorrect account or password' },
        { shouldFocus: false }
      );
    },
    schema,
    controllers: {
      account: {
        control: 'text-input',
        label: 'Account',
        withAsterisk: true,
      },
      password: {
        control: 'password-input',
        label: 'Password',
        withAsterisk: true,
      },
      rememberMe: {
        control: 'checkbox',
        label: 'Remember me',
        Field: ({ fieldComponent }) => (
          <Group position="apart">
            {fieldComponent}
            <Anchor<'a'> onClick={(event) => event.preventDefault()} href="#" size="sm">
              Forgot password?
            </Anchor>
          </Group>
        ),
      },
    },
  });

  const {
    methods: {
      formState: { isSubmitting },
    },
  } = form;

  return (
    <Container size={450} my={40}>
      <Title
        align="center"
        sx={(theme) => ({
          fontFamily: `Greycliff CF, ${theme.fontFamily}`,
          fontWeight: 900,
        })}
      >
        Welcome back!
      </Title>
      <Text color="dimmed" size="sm" align="center" mt={5}>
        Do not have an account yet?{' '}
        <Anchor<'a'> href="#" size="sm" onClick={(event) => event.preventDefault()}>
          Create account
        </Anchor>
      </Text>
      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <Form form={form}>
          <Button fullWidth mt="xl" loading={isSubmitting} type="submit">
            {isSubmitting ? 'Signing in...' : 'Sign in'}
          </Button>
        </Form>
      </Paper>
    </Container>
  );
}
