import React from 'react'
import { Tabs, Tab, Box } from '@mui/material'
import { SxProps, Theme } from '@mui/material/styles'
import { useTab } from './useTab'

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
      className="p-4"
    >
      {value === index && <Box>{children}</Box>}
    </div>
  )
}

interface TabComponentProps {
  reduxId: string
  tabs: {
    label: string
    content: React.ReactNode
    icon?: React.ReactElement | string
    disabled?: boolean
  }[]
  orientation?: 'horizontal' | 'vertical'
  variant?: 'standard' | 'scrollable' | 'fullWidth'
  className?: string
  sx?: SxProps<Theme>
}

const TabComponent: React.FC<TabComponentProps> = ({
  reduxId,
  tabs,
  orientation = 'horizontal',
  variant = 'standard',
  className = '',
  sx,
}) => {
  const { activeTab, disabled, setTab } = useTab(reduxId)

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue)
  }

  return (
    <Box className={className} sx={sx}>
      <Tabs
        value={activeTab}
        onChange={handleChange}
        orientation={orientation}
        variant={variant}
        aria-label={`${reduxId}-tabs`}
      >
        {tabs.map((tab, index) => (
          <Tab
            key={`${reduxId}-tab-${index}`}
            label={tab.label}
            icon={tab.icon}
            disabled={disabled || tab.disabled}
            id={`tab-${index}`}
            aria-controls={`tabpanel-${index}`}
          />
        ))}
      </Tabs>
      {tabs.map((tab, index) => (
        <TabPanel key={`${reduxId}-panel-${index}`} value={activeTab} index={index}>
          {tab.content}
        </TabPanel>
      ))}
    </Box>
  )
}

export default TabComponent
