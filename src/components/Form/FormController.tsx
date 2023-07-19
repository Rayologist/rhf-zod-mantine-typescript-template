import React from 'react';
import { ControllerProps } from './types';
import CheckboxGroup from './components/CheckboxGroup';
import DateInput from './components/DateInput';
import FileInput from './components/FileInput';
import MultiSelect from './components/MultiSelect';
import NumberInput from './components/NumberInput';
import PasswordInput from './components/PasswordInput';
import PinInput from './components/PinInput';
import RadioGroup from './components/RadioGroup';
import Select from './components/Select';
import SwitchGroup from './components/SwitchGroup';
import TextInput from './components/TextInput';
import Textarea from './components/Textarea';

function FormController(props: ControllerProps) {
  const { control } = props;
  switch (control) {
    case 'checkbox-group':
      return <CheckboxGroup {...props} />;
    case 'date-input':
      return <DateInput {...props} />;
    case 'file-input':
      return <FileInput {...props} />;
    case 'multi-select':
      return <MultiSelect {...props} />;
    case 'number-input':
      return <NumberInput {...props} />;
    case 'password-input':
      return <PasswordInput {...props} />;
    case 'pin-input':
      return <PinInput {...props} />;
    case 'radio-group':
      return <RadioGroup {...props} />;
    case 'select':
      return <Select {...props} />;
    case 'switch-group':
      return <SwitchGroup {...props} />;
    case 'text-input':
      return <TextInput {...props} />;
    case 'text-area':
      return <Textarea {...props} />;
    default:
      return null;
  }
}

export default FormController;
