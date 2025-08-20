import React from 'react';
import TextFieldComponent from '@/modules/TextField';
import DropdownComponent from '@/modules/Dropdown';
import DatePickerComponent from '@/modules/DatePicker';
import FormControlWrapper from '@/modules/FormControlWrapper';
import { DropdownOption } from '@/modules/Dropdown/DropdownComponent';
import IconWrapper, { IconName } from '@/modules/Icon';
import { Grid } from '@mui/material';

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
    <Grid container spacing={2}>
      {fields.map((field, index) => (
        <Grid item xs={12} sm={6} md={4} key={index}>
          <FormControlWrapper>
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
              <DatePickerComponent reduxId={field.reduxId} label={field.label} />
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
                sx={{ height: 40, width: 80 }}
                renderOption={(option) => (
                  <IconWrapper name={option.value as IconName} size="large" className='align-middle' />
                )}
              />
            )}
          </FormControlWrapper>
        </Grid>
      ))}
    </Grid>
  );
};

export default DataFieldComponent;
