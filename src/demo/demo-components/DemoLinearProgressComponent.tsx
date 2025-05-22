import LinearProgressComponent from '@/modules/LinearProgress'

const DemoLinearProgressComponent = () => {

  return (
    <div className="flex flex-col items-center gap-4">
      <p className="text-gray-600 mb-4">
        The linear progress component can be used to display progress of a task or operation
      </p>
      <div className="flex flex-wrap justify-center items-center gap-4">
        <LinearProgressComponent
          sx={{
            width: '100%',
            maxWidth: '800px',
          }}
        />
      </div>
    </div>
  )
}

export default DemoLinearProgressComponent
