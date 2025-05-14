import TabComponent from '@/modules/Tab'
import IconWrapper from '@/modules/Icon'
import SnackbarComponent from '@/modules/Snackbar'
import BackdropComponent from '@/modules/Backdrop'
import DemoInputFieldComponent from '@/demo/demo-components/DemoInputFieldComponent'
import DemoSnackbarComponent from '@/demo/demo-components/DemoSnackbarComponent'
import DemoBackdropComponent from '@/demo/demo-components/DemoBackdropComponent'
import DemoTabsComponent from '@/demo/demo-components/DemoTabsComponent'
import DemoDropdownComponent from '@/demo/demo-components/DemoDropdownComponent'
import DemoIconComponent from '@/demo/demo-components/DemoIconComponent'

const DemoComponent = () => {
  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-8">Demo of MUI</h1>
      <SnackbarComponent reduxId="error-snackbar" />
      <SnackbarComponent reduxId="success-snackbar" />
      <SnackbarComponent reduxId="info-snackbar" />
      <BackdropComponent reduxId="demo-backdrop" scoped={true} />

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
        ]}
      />
    </div>
  )
}

export default DemoComponent
