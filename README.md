# Mantine-styled RHF (React Hook Form) Controlled Components in Typescript and NextJS

This [mantine-next-template](https://github.com/mantinedev/mantine-next-template) integrates [React Hook Form](https://github.com/react-hook-form/react-hook-form) as a means of form contol and [Zod](https://github.com/colinhacks/zod) as form validation. Input components developed by Mantine can be easily controlled through `<FormController />`.

## The `useForm` Hook

A custom hook `useForm` is implemented as a wrapper of RHF to solve the problem of boilerplate codes when developers are constructing forms, as shown in [`src/containers/Form.tsx`](https://github.com/Rayologist/rhf-zod-mantine-typescript-template/blob/e2649eab77932dc9458ddae9e2c180fe3567ea0e/src/containers/Form.tsx#L216-L242). The simple form example is adapted from [Mantine UI](https://ui.mantine.dev/category/authentication#authentication-title), and can be found in [`src/pages/simple-form.tsx`](https://github.com/Rayologist/rhf-zod-mantine-typescript-template/blob/e2649eab77932dc9458ddae9e2c180fe3567ea0e/src/pages/simple-form.tsx#L11-L43).

![Sample Form](assets/form.png)

### Usage

The usage is almost the same as `useForm` from [`React Hook Form`](https://react-hook-form.com/api/useform). However, there are four fields required:

1. defaultvalues: same as RHF but required
2. onSubmit(data, actions, event) => void:
   Same as RHF [`handleSubmit`](https://react-hook-form.com/api/useform/handlesubmit), but the `actions` paramenter is hooked into the function through currying, where post submit actions can be done within.
3. schema: Zod schema.
4. controllers: objects of field props. Required props: control (controlled components), label (Field label), name (HTML input name)

On top of that, `RHF useForm returned methods` can be accessed using render props as shown in [here](https://github.com/Rayologist/rhf-zod-mantine-typescript-template/blob/e2649eab77932dc9458ddae9e2c180fe3567ea0e/src/pages/simple-form.tsx#L65)

## Current List of Controlled Components from Mantine

- [x] [Checkbox Group](https://mantine.dev/core/checkbox/)
- [x] [File Input](https://mantine.dev/core/file-input/)
- [x] [Multi-Select](https://mantine.dev/core/multi-select/)
- [x] [Number Input](https://mantine.dev/core/number-input/)
- [x] [Password Input](https://mantine.dev/core/password-input/)
- [x] [Radio Group](https://mantine.dev/core/radio/)
- [x] [Select](https://mantine.dev/core/select/)
- [x] [Text Area](https://mantine.dev/core/textarea/)
- [x] [Text Input](https://mantine.dev/core/text-input/)
- [x] [Date Picker](https://mantine.dev/dates/date-picker/)

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

If you have any questions, please feel free to file issues or contact me at **rayologist1002@gmail.com**
