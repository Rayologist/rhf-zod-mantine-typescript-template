# Mantine-styled React Hook Form (RHF) Components with Typescript and NextJS

This project extends the [mantine-next-template](https://github.com/mantinedev/mantine-next-template) by integrating [React Hook Form](https://github.com/react-hook-form/react-hook-form) for form control and [Zod](https://github.com/colinhacks/zod) for form validation. It provides a streamlined way to create and manage forms using Mantine UI components with React Hook Form.

 Mantine's input components are seamlessly controlled using the custom `<FormController />` as in [here](https://github.com/Rayologist/rhf-zod-mantine-typescript-template/blob/main/src/containers/Form.tsx).

![Sample Form](assets/form.png)

## Key Features

- Simplified form creation with a custom useForm hook
- Integration of Mantine UI components with React Hook Form
- Type-safe form validation using Zod
- Reduced boilerplate code for form setup

## The `useForm` Hook

Our custom `useForm` hook wraps the React Hook Form's `useForm` to provide a more convenient API for creating forms with Mantine components. It simplifies the process of setting up controlled components and handling form submission.

### Usage

Full example can be found [here](https://github.com/Rayologist/rhf-zod-mantine-typescript-template/blob/main/src/pages/simple-form.tsx).

To use the `useForm` hook, import it from the appropriate location in your project:

```tsx
import { useForm, Form } from '../components/Form';
```

Then, create your form configuration:

```tsx
const schema = z.object({
  // Define your form schema here
});

type FormValues = z.infer<typeof schema>;

const form = useForm<FormValues>({
  defaultValues: {
    // Your form's initial values
  },
  onSubmit: async ({ data, methods }) => {
    // Handle form submission
  },
  schema: schema, // Optional but recommended: Zod schema for validation
  controllers: {
    // Define your form fields here
  },
});
```

Finally, use the `form` object and the `Form` component to render your form, noting that the `Form` component must be wrapped around your form fields:

```tsx
<Form form={form}>
  {/* Your form fields are automatically rendered here based on the controllers */}
  <Button type="submit" mt="md">
    Submit
  </Button>
</Form>
```

In some cases, you might want to separate the `Form` and the submit `Button` components. This can be useful for more complex layouts or when you need the button to be outside the form structure. To achieve this, you can use the `useId()` hook from React, or any other method to generate a unique ID:

```tsx
import { useId } from 'react';

function MyForm() {
  const form = useForm({/* your form configuration */});
  const formId = useId();

  return (
    <>
      <Form form={form} id={formId} />
      <Button type="submit" form={formId} mt="md">
        Submit
      </Button>
    </>
  );
}
```

#### Required Properties

1. `defaultValues`: The initial values for your form fields.
2. `onSubmit`: Submission handler function. Receives `data`, `event`, and `methods` (of type [`UseFormReturn`](https://react-hook-form.com/ts#UseFormReturn).) as parameters.
3. `controllers`: Object defining the form fields and their properties.
   - `control` (required): The controlled component for the field (e.g., 'text-input', 'password-input').
   - `label` (required): The field's label.
   - `name` (required): The HTML input name for the field, which must match the corresponding key in the defaultValues object. This ensures correct data binding and validation.
   - `Field` (optional): A custom render function for additional flexibility (as described in the following section).
   - `options` (required in `Select`, `MultiSelect`, `CheckboxGroup`, etc.): For controllers that deal with options, an options prop is used instead of Mantine's `data` prop. The options prop is an array of Option objects:

   ```tsx
   type Option = {
      label: ReactNode;
      value: any;
   }
   ```

   - **Original component props**: All props supported by the original Mantine component.

#### Optional Properties

1. `schema`: Recommended. Zod schema for form validation.
2. `onSubmitError`: Error handler function for submission errors. Receives `errors`, `event`, and `methods` (of type [`UseFormReturn`](https://react-hook-form.com/ts#UseFormReturn).) as parameters.

#### Other Properties

1. `Grid Integration`: Each form field is wrapped in a `Grid.Col` component, allowing you to easily create multi-column layouts and responsive forms. You can customize the grid behavior for each field using the col prop in the controller configuration.
2. **Orientation for Group Controls**: Checkbox groups, radio groups, and switch groups have an additional orientation prop that can be either 'horizontal' or 'vertical'. You can also provide orientationProps to further customize the layout.
3. **File Input Generics**: The `FileInputProps` uses a generic `<T extends boolean>` to determine whether it accepts multiple files or not.

#### The `Field` Property in `controllers`

The `Field` property in the controllers object allows you to customize the rendering of individual form fields. This is particularly useful when you need to add additional components or modify the layout of a specific field.

```tsx
const form = useForm<FormValues>({
  // ... other properties
  controllers: {
    rememberMe: {
      control: 'checkbox',
      label: 'Remember me',
      name: 'rememberMe',
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
```

## Supported Mantine Components

- [x] [Checkbox Group](https://mantine.dev/core/checkbox/)
- [x] [Checkbox](https://mantine.dev/core/checkbox/)
- [x] [File Input](https://mantine.dev/core/file-input/)
- [x] [Multi-Select](https://mantine.dev/core/multi-select/)
- [x] [Number Input](https://mantine.dev/core/number-input/)
- [x] [Password Input](https://mantine.dev/core/password-input/)
- [x] [Radio Group](https://mantine.dev/core/radio/)
- [x] [Select](https://mantine.dev/core/select/)
- [x] [Text Area](https://mantine.dev/core/textarea/)
- [x] [Text Input](https://mantine.dev/core/text-input/)
- [x] [Date Input](https://mantine.dev/dates/date-input/)
- [x] [Switch Group](https://mantine.dev/core/switch/)
- [x] [Pin Input](https://mantine.dev/core/pin-input/)

## Getting Started

First, run the development server:

```bash
pnpm dev
# or
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Contact

If you have any questions, please feel free to file issues or contact me at `bwchen.dev@gmail.com`.
