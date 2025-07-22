import TabComponent from '@/modules/Tab'
import IconWrapper from '@/modules/Icon'

const DemoTabsComponent = () => {
  return (
    <div className="flex flex-col gap-4">
      <p className="text-gray-600 mb-4">
        Tabs can be customized with different orientations and styles
      </p>
      <div className="space-y-8">
        <div>
          <h3 className="text-lg font-semibold mb-4">Standard Horizontal Tabs</h3>
          <TabComponent
            reduxId="horizontal-tabs"
            tabs={[
              {
                label: 'Tab 1',
                content: <div className="p-4 bg-gray-100 rounded">Content for Tab 1</div>,
              },
              {
                label: 'Tab 2',
                content: <div className="p-4 bg-gray-100 rounded">Content for Tab 2</div>,
              },
              {
                label: 'Tab 3',
                content: <div className="p-4 bg-gray-100 rounded">Content for Tab 3</div>,
              },
            ]}
          />
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Vertical Tabs</h3>
          <TabComponent
            reduxId="vertical-tabs"
            orientation="vertical"
            tabs={[
              {
                label: 'Settings',
                icon: <IconWrapper name="Settings" size="small" />,
                content: <div className="p-4 bg-gray-100 rounded">Settings Content</div>,
              },
              {
                label: 'Profile',
                icon: <IconWrapper name="Person" size="small" />,
                content: <div className="p-4 bg-gray-100 rounded">Profile Content</div>,
              },
              {
                label: 'Security',
                icon: <IconWrapper name="Security" size="small" />,
                content: <div className="p-4 bg-gray-100 rounded">Security Content</div>,
              },
            ]}
            sx={{
              '& .MuiTabs-root': { minWidth: '200px' },
              '& .MuiTab-root': { alignItems: 'start', justifyContent: 'flex-start' },
            }}
          />
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Scrollable Tabs</h3>
          <TabComponent
            reduxId="scrollable-tabs"
            variant="scrollable"
            tabs={[
              {
                label: 'Item One',
                content: <div className="p-4 bg-gray-100 rounded">Content One</div>,
              },
              {
                label: 'Item Two',
                content: <div className="p-4 bg-gray-100 rounded">Content Two</div>,
              },
              {
                label: 'Item Three',
                content: <div className="p-4 bg-gray-100 rounded">Content Three</div>,
              },
              {
                label: 'Item Four',
                content: <div className="p-4 bg-gray-100 rounded">Content Four</div>,
              },
              {
                label: 'Item Five',
                content: <div className="p-4 bg-gray-100 rounded">Content Five</div>,
              },
              {
                label: 'Item Six',
                content: <div className="p-4 bg-gray-100 rounded">Content Six</div>,
              },
            ]}
            sx={{ maxWidth: '100%', borderBottom: 1, borderColor: 'divider' }}
          />
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Full Width Tabs</h3>
          <TabComponent
            reduxId="fullwidth-tabs"
            variant="fullWidth"
            tabs={[
              {
                label: 'Left Tab',
                content: <div className="p-4 bg-gray-100 rounded">Left Content</div>,
              },
              {
                label: 'Middle Tab',
                content: <div className="p-4 bg-gray-100 rounded">Middle Content</div>,
              },
              {
                label: 'Right Tab',
                content: <div className="p-4 bg-gray-100 rounded">Right Content</div>,
              },
            ]}
          />
        </div>
      </div>
    </div>
  )
}

export default DemoTabsComponent
