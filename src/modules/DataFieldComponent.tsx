import React from 'react';
import TextFieldComponent from '@/modules/TextField';
import DropdownComponent from '@/modules/Dropdown';
import DatePickerComponent from '@/modules/DatePicker';
import FormControlWrapper from '@/modules/FormControlWrapper';
import { DropdownOption } from '@/modules/Dropdown/DropdownComponent';

export interface DataField {
  label: string;
  type: 'text' | 'email' | 'password' | 'select' | 'date' | 'icon';
  reduxId: string;
  error?: boolean;
  helperText?: string;
  className?: string;
  touched?: boolean;
  options?: DropdownOption[];
  onBlur?: () => void;
}

const DataFieldComponent: React.FC<{ fields: DataField[] }> = ({ fields }) => {
  return (
    <div>
      {fields.map((field, index) => (
        <FormControlWrapper key={index}>
          {field.type === 'text' && (
            <TextFieldComponent
              label={field.label}
              reduxId={field.reduxId}
              error={field.touched && field.error}
              helperText={field.touched ? field.helperText : ''}
              className={field.className}
              onBlur={field.onBlur}
            />
          )}
          {field.type === 'email' && (
            <TextFieldComponent
              label={field.label}
              reduxId={field.reduxId}
              type="email"
              error={field.touched && field.error}
              helperText={field.touched ? field.helperText : ''}
              className={field.className}
              onBlur={field.onBlur}
            />
          )}
          {field.type === 'password' && (
            <TextFieldComponent
              label={field.label}
              reduxId={field.reduxId}
              type="password"
              error={field.touched && field.error}
              helperText={field.touched ? field.helperText : ''}
              className={field.className}
              onBlur={field.onBlur}
            />
          )}
          {field.type === 'select' && (
            <DropdownComponent
              label={field.label}
              reduxId={field.reduxId}
              options={field.options || []}
              error={field.touched && field.error}
              helperText={field.touched ? field.helperText : ''}
              className={field.className}
              onBlur={field.onBlur}
            />
          )}
          {field.type === 'date' && (
            <DatePickerComponent
              reduxId={field.reduxId}
              className={field.className}
            />
          )}
          {field.type === 'icon' && (
            <DropdownComponent
              label={field.label}
              reduxId={field.reduxId}
              options={field.options || []}
              error={field.touched && field.error}
              helperText={field.touched ? field.helperText : ''}
              className={field.className}
              onBlur={field.onBlur}
            />
          )}
        </FormControlWrapper>
      ))}
    </div>
  );
};

export default DataFieldComponent;
