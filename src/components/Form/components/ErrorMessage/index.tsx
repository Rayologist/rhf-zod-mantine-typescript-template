import { Group, Text, TextProps, useMantineTheme } from '@mantine/core';
import { IconAlertCircle } from '@tabler/icons-react';

const ErrorMessage = (props: TextProps & { children?: string }) => {
  const theme = useMantineTheme();
  const { children, ...rest } = props;
  if (!children?.length) return null;
  return (
    <Text
      weight={500}
      size="sm"
      style={{ wordBreak: 'break-word', display: 'block', position: 'relative' }}
      {...rest}
    >
      <Group spacing={5} sx={{ position: 'absolute' }}>
        <IconAlertCircle width={theme.fontSizes.lg} />
        {children}
      </Group>
    </Text>
  );
};

export default ErrorMessage;
