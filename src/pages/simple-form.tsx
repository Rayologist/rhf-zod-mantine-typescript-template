import { Checkbox, Anchor, Paper, Title, Text, Container, Group, Box } from '@mantine/core';
import { z } from 'zod';
import { useForm } from '../components/Form';

const sleep = (ms: number) =>
  new Promise((resolve) => {
    setTimeout(resolve, ms);
  });

export default function AuthenticationTitle() {
  const [Form, methods] = useForm<{ account: string; password: string }>({
    defaultValues: {
      account: '',
      password: '',
    },
    onSubmit: async (values) => {
      console.log(values); // eslint-disable-line no-console
      await sleep(1000);
      methods.setError(
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

  const {
    formState: { isSubmitting },
  } = methods;

  return (
    <Container size={800} my={40}>
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
      <Group>
        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <Title order={3} mb={20} align="center">
            With Render Props
          </Title>
          {/* eslint-disable @typescript-eslint/no-shadow */}
          <Form>
            {({ formState: { isSubmitting } }) => (
              <Box mt={25}>
                <Group position="apart">
                  <Checkbox
                    label="Remember me"
                    styles={{ root: { display: 'grid', placeContent: 'center' } }}
                  />
                  <Anchor<'a'> onClick={(event) => event.preventDefault()} href="#" size="sm">
                    Forgot password?
                  </Anchor>
                </Group>
                <Form.Button fullWidth mt="xl" loading={isSubmitting} type="submit">
                  {isSubmitting ? 'Signing in...' : 'Sign in'}
                </Form.Button>
              </Box>
            )}
          </Form>
        </Paper>

        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <Title order={3} mb={20} align="center">
            With Returned Methods
          </Title>
          <Form />
          <Box mt={25}>
            <Group position="apart">
              <Checkbox
                label="Remember me"
                styles={{ root: { display: 'grid', placeContent: 'center' } }}
              />
              <Anchor<'a'> onClick={(event) => event.preventDefault()} href="#" size="sm">
                Forgot password?
              </Anchor>
            </Group>
            <Form.Button fullWidth mt="xl" loading={isSubmitting} type="submit">
              {isSubmitting ? 'Signing in...' : 'Sign in'}
            </Form.Button>
          </Box>
        </Paper>
      </Group>
    </Container>
  );
}
