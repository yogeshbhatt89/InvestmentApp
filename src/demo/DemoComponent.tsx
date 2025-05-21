import TabComponent from '@/modules/Tab'
import IconWrapper from '@/modules/Icon'
import SnackbarComponent from '@/modules/Snackbar'
import DemoInputFieldComponent from '@/demo/demo-components/DemoInputFieldComponent'
import DemoSnackbarComponent from '@/demo/demo-components/DemoSnackbarComponent'
import DemoBackdropComponent from '@/demo/demo-components/DemoBackdropComponent'
import DemoTabsComponent from '@/demo/demo-components/DemoTabsComponent'
import DemoDropdownComponent from '@/demo/demo-components/DemoDropdownComponent'
import DemoIconComponent from '@/demo/demo-components/DemoIconComponent'
import DemoChartComponent from './demo-components/DemoChartComponent'
import DemoLinearProgressComponent from './demo-components/DemoLinearProgressComponent'
import { useNavigate } from 'react-router-dom'
import ButtonComponent from '@/modules/Button'

const DemoComponent = () => {
  const navigate = useNavigate()

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex justify-end mb-4">
        <ButtonComponent
          reduxId="goToLoginDemo"
          label="Go to Login"
          onClick={() => navigate('/login')}
          variant="outlined"
        />
      </div>
      <h1 className="text-3xl font-bold text-center mb-8">Demo of MUI</h1>
      <SnackbarComponent reduxId="error-snackbar" />
      <SnackbarComponent reduxId="success-snackbar" />
      <SnackbarComponent reduxId="info-snackbar" />
      <TabComponent
        reduxId="main-demo-tabs"
        sx={{
          '& .MuiTabs-root': {
            borderBottom: '1px solid #e2e8f0',
            minHeight: '48px',
          },
          '& .MuiTab-root': {
            textTransform: 'none',
            minHeight: '48px',
            fontWeight: 500,
            color: '#64748b',
            '&:hover': {
              color: '#334155',
              backgroundColor: '#f8fafc',
            },
          },
          '& .Mui-selected': {
            color: '#0f172a !important',
            fontWeight: 600,
          },
          '& .MuiTabs-indicator': {
            backgroundColor: '#3b82f6',
            height: '3px',
          },
        }}
        tabs={[
          {
            label: 'Input Fields',
            icon: <IconWrapper name="Email" size="small" />,
            content: <DemoInputFieldComponent />,
          },
          {
            label: 'Snackbar',
            icon: <IconWrapper name="Notifications" size="small" />,
            content: <DemoSnackbarComponent />,
          },
          {
            label: 'Backdrop',
            icon: <IconWrapper name="Visibility" size="small" />,
            content: <DemoBackdropComponent />,
          },
          {
            label: 'Tabs Demo',
            icon: <IconWrapper name="Tab" size="small" />,
            content: <DemoTabsComponent />,
          },
          {
            label: 'Dropdown',
            icon: <IconWrapper name="Menu" size="small" />,
            content: <DemoDropdownComponent />,
          },
          {
            label: 'Icons',
            icon: <IconWrapper name="ColorLens" size="small" />,
            content: <DemoIconComponent />,
          },
          {
            label: 'Chart',
            icon: <IconWrapper name="BarChart" size="small" />,
            content: <DemoChartComponent />,
          },
          {
            label: 'Linear Progress',
            icon: <IconWrapper name="Timer" size="small" />,
            content: <DemoLinearProgressComponent />,
          },
        ]}
      />
    </div>
  )
}

export default DemoComponent
