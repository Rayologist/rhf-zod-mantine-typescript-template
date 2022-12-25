import React from 'react';
import { ControllerProps } from 'types';
import TextInput from './components/TextInput';
import PasswordInput from './components/PasswordInput';
import Select from './components/Select';
import CheckboxGroup from './components/CheckboxGroup';
import RadioGroup from './components/RadioGroup';
import Textarea from './components/Textarea';
import DatePicker from './components/DatePicker';
import NumberInput from './components/NumberInput';
import MultiSelect from './components/MultiSelect';
import FileInput from './components/FileInput';

function FormController(props: ControllerProps) {
  const { control } = props;

  switch (control) {
    case 'text-input':
      return <TextInput {...props} />;
    case 'password-input':
      return <PasswordInput {...props} />;
    case 'number-input':
      return <NumberInput {...props} />;
    case 'select':
      return <Select {...props} />;
    case 'checkbox-group':
      return <CheckboxGroup {...props} />;
    case 'radio-group':
      return <RadioGroup {...props} />;
    case 'text-area':
      return <Textarea {...props} />;
    case 'date-picker':
      return <DatePicker {...props} />;
    case 'multi-select':
      return <MultiSelect {...props} />;
    case 'file-input':
      return <FileInput {...props} />;
    default:
      return null;
  }
}

export default FormController;
