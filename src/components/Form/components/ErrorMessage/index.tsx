import { Group, Text, TextProps, useMantineTheme } from '@mantine/core';
import { IconAlertCircle } from '@tabler/icons-react';

export function ErrorMessage(props: TextProps) {
  const theme = useMantineTheme();
  const { children, ...rest } = props;

  return (
    <Group spacing={5} sx={{ position: 'absolute' }}>
      <IconAlertCircle width={theme.fontSizes.lg} />
      <Text weight={500} size="sm" style={{ wordBreak: 'break-word', display: 'block' }} {...rest}>
        {children}
      </Text>
    </Group>
  );
}
