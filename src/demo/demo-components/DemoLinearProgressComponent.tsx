import ButtonComponent from '@/modules/Button';
import LinearProgressComponent, { useLinearProgress } from '@/modules/LinearProgress';

const DemoLinearProgressComponent = () => {
  const { setProgress } = useLinearProgress('demo-linear-progress');

  return (
    <div className="flex flex-col items-center gap-4">
      <p className="text-gray-600 mb-4">
        The linear progress component can be used to display progress of a task or operation
      </p>
      <div className="flex flex-wrap justify-center items-center gap-4">
        <LinearProgressComponent
          progressId="demo-linear-progress"
          sx={{
            width: '100%',
            maxWidth: '800px',
          }}
        />

        <div className="flex flex-col gap-2">
          <ButtonComponent
            label="Set Progress to 50%"
            reduxId="linear-progress-button"
            onClick={() => setProgress(50, 'Loading...')}
            variant="contained"
            color="primary"
          />
          <ButtonComponent
            label="Set Progress to 100%"
            reduxId="linear-progress-done-button"
            onClick={() => setProgress(100, 'Complete!')}
            variant="contained"
            color="secondary"
          />
          <ButtonComponent
            label="Reset Progress"
            reduxId="linear-progress-reset-button"
            onClick={() => setProgress(0, 'Reset')}
            variant="contained"
            color="error"
          />
        </div>
      </div>
    </div>
  );
};

export default DemoLinearProgressComponent;
