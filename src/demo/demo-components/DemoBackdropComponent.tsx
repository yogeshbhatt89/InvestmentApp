import ButtonComponent from '@/modules/Button'
import { useBackdrop } from '@/modules/Backdrop'
import BackdropComponent from '@/modules/Backdrop'

const DemoBackdropComponent = () => {
  const backdrop = useBackdrop('demo-backdrop')

  return (
    <div className="flex flex-col items-center gap-4">
      <p className="text-gray-600 mb-4">
        The backdrop component can be used to focus attention on loading states or modal dialogs
      </p>
      <div className="flex flex-wrap justify-center items-center gap-4">
        <div className="relative w-64 h-64 border border-gray-300 rounded-lg overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center bg-white p-4 text-center z-0">
            Content behind backdrop
          </div>

          <BackdropComponent
            reduxId="demo-backdrop"
            scoped
            sx={{
              zIndex: 10,
            }}
          />
        </div>

        <div className="flex flex-col gap-2">
          <ButtonComponent
            label="Show Backdrop"
            reduxId="backdrop-button"
            onClick={backdrop.show}
            variant="contained"
            color="primary"
          />
          <ButtonComponent
            label="Hide Backdrop"
            reduxId="backdrop-hide-button"
            onClick={backdrop.hide}
            variant="contained"
            color="secondary"
          />
        </div>
      </div>
    </div>
  )
}

export default DemoBackdropComponent
