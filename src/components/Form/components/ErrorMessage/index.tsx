import { Group, Text, TextProps } from '@mantine/core';
import { IconAlertCircle } from '@tabler/icons';

const ErrorMessage = (props: TextProps & { children?: string }) => {
  const { children, ...rest } = props;
  if (!children?.length) return null;
  return (
    <Group spacing={5} sx={{ position: 'absolute' }}>
      <IconAlertCircle width={18} />
      <Text weight={500} size="sm" {...rest}>
        {children}
      </Text>
    </Group>
  );
};

export default ErrorMessage;
