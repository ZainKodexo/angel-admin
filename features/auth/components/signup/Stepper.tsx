import { cn } from '@/shared/utils';

type StepperProps = {
  step: number;
  setStep: (count: number) => void;
};

type StepProps = {
  step: number;
  count: number;
  onClick: () => void;
};

const Stepper = ({ step, setStep }: StepperProps) => {
  const onNext = (count: number) => {
    if (step >= count) setStep(count);
  };
  return (
    <>
      <Step count={1} step={step} onClick={() => onNext(1)} />
      <Step count={2} step={step} onClick={() => onNext(2)} />
      <Step count={3} step={step} onClick={() => onNext(3)} />
    </>
  );
};

const Step = ({ step, onClick, count }: StepProps) => {
  return (
    <div className="flex items-center pb-6" onClick={onClick}>
      <div
        className={cn(
          'flex h-10 w-10 items-center justify-center rounded-full',
          step >= count ? 'bg-secondary cursor-pointer' : 'bg-primary',
        )}
      >
        {step >= count && count}
      </div>
      {count <= 2 && (
        <div
          className={cn(
            'h-[3px] w-8',
            step > count ? 'bg-secondary cursor-pointer' : 'bg-primary',
          )}
        />
      )}
    </div>
  );
};

export { Stepper };
