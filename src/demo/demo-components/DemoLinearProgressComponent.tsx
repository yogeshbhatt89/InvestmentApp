import LinearProgressComponent from '@/modules/LinearProgress'

const DemoLinearProgressComponent = () => {
  return (
    <div className="flex flex-col items-center gap-4 min-h-[50px] w-full">
      <p className="text-gray-600 mb-4">
        The linear progress component can be used to display the progress of a task or operation.
      </p>
      <div className="flex flex-wrap justify-center items-center gap-4 overflow-visible w-full">
        <LinearProgressComponent
          // Provide a specific width to the container and the progress bar
          containerSx={{ width: '100%' }}
          sx={{
            width: '100%',
            maxWidth: '800px',
            height: '8px', // explicit height to ensure visibility
            backgroundColor: '#f0f0f0', // track color
            '& .MuiLinearProgress-bar': {
              backgroundColor: '#3b82f6', // moving bar color
            },
          }}
        />
      </div>
    </div>
  )
}

export default DemoLinearProgressComponent
