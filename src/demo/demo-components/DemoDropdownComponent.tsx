import React from 'react'
import DropdownComponent from '@/modules/Dropdown'
import IconWrapper from '@/modules/Icon'

const DemoDropdownComponent = () => {
  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4">Basic Dropdown</h3>
        <DropdownComponent
          reduxId="basic-dropdown"
          label="Select Option"
          options={[
            { value: '1', label: 'Option 1' },
            { value: '2', label: 'Option 2' },
            { value: '3', label: 'Option 3' },
          ]}
        />
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Dropdown with Icons</h3>
        <DropdownComponent
          reduxId="icon-dropdown"
          label="Select Theme"
          options={[
            {
              value: 'light',
              label: 'Light Theme',
              icon: <IconWrapper name="ColorLens" size="small" />,
            },
            {
              value: 'dark',
              label: 'Dark Theme',
              icon: <IconWrapper name="ColorLens" size="small" />,
            },
            {
              value: 'system',
              label: 'System Theme',
              icon: <IconWrapper name="Settings" size="small" />,
            },
          ]}
          className="min-w-[200px]"
        />
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Multiple Select Dropdown</h3>
        <DropdownComponent
          reduxId="multiple-dropdown"
          label="Select Languages"
          options={[
            { value: 'en', label: 'English', icon: <IconWrapper name="Language" size="small" /> },
            { value: 'es', label: 'Spanish', icon: <IconWrapper name="Language" size="small" /> },
            { value: 'fr', label: 'French', icon: <IconWrapper name="Language" size="small" /> },
            { value: 'de', label: 'German', icon: <IconWrapper name="Language" size="small" /> },
          ]}
          multiple
          className="min-w-[250px]"
        />
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Variants</h3>
        <div className="flex gap-4">
          <DropdownComponent
            reduxId="outlined-dropdown"
            label="Outlined"
            variant="outlined"
            options={[
              { value: '1', label: 'Option 1' },
              { value: '2', label: 'Option 2' },
            ]}
          />
          <DropdownComponent
            reduxId="filled-dropdown"
            label="Filled"
            variant="filled"
            options={[
              { value: '1', label: 'Option 1' },
              { value: '2', label: 'Option 2' },
            ]}
          />
          <DropdownComponent
            reduxId="standard-dropdown"
            label="Standard"
            variant="standard"
            options={[
              { value: '1', label: 'Option 1' },
              { value: '2', label: 'Option 2' },
            ]}
          />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">States</h3>
        <div className="flex gap-4">
          <DropdownComponent
            reduxId="error-dropdown"
            label="Error State"
            error={true}
            helperText="This is an error message"
            options={[
              { value: '1', label: 'Option 1' },
              { value: '2', label: 'Option 2' },
            ]}
          />
          <DropdownComponent
            reduxId="disabled-dropdown"
            label="Disabled"
            disabled={true}
            options={[
              { value: '1', label: 'Option 1' },
              { value: '2', label: 'Option 2' },
            ]}
          />
          <DropdownComponent
            reduxId="required-dropdown"
            label="Required"
            required={true}
            options={[
              { value: '1', label: 'Option 1' },
              { value: '2', label: 'Option 2' },
            ]}
          />
        </div>
      </div>
    </div>
  )
}

export default DemoDropdownComponent
