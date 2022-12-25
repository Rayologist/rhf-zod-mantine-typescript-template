import { Checkbox, Anchor, Paper, Title, Text, Container, Group, Box } from '@mantine/core';
import { z } from 'zod';
import { useForm } from '../components/Form';

const sleep = (ms: number) =>
  new Promise((resolve) => {
    setTimeout(resolve, ms);
  });

export default function AuthenticationTitle() {
  const LoginForm = useForm<{ account: string; password: string }>({
    defaultValues: {
      account: '',
      password: '',
    },
    onSubmit: async (values, actions) => {
      console.log(values); // eslint-disable-line no-console
      await sleep(1000);
      actions.setError(
        'account',
        { message: 'Incorrect account or password' },
        { shouldFocus: false }
      );
    },
    schema: z.object({
      account: z.string().min(1, { message: 'Required' }),
      password: z.string().min(1, { message: 'Required' }),
    }),
    controllers: {
      account: {
        control: 'text-input',
        label: 'Account',
        name: 'account',
        withAsterisk: true,
      },
      password: {
        control: 'password-input',
        label: 'Password',
        name: 'password',
        withAsterisk: true,
      },
    },
  });

  return (
    <Container size={420} my={40}>
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
        <LoginForm>
          {({ formState: { isSubmitting } }) => (
            <Box mt={30}>
              <Group position="apart">
                <Checkbox label="Remember me" />
                <Anchor<'a'> onClick={(event) => event.preventDefault()} href="#" size="sm">
                  Forgot password?
                </Anchor>
              </Group>
              <LoginForm.Button fullWidth mt="xl" loading={isSubmitting} type="submit">
                {isSubmitting ? 'Signing in...' : 'Sign in'}
              </LoginForm.Button>
            </Box>
          )}
        </LoginForm>
      </Paper>
    </Container>
  );
}
