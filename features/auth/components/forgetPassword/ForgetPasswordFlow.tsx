'use client';
import { useState } from 'react';
import { EmailStep, OtpStep, PasswordStep, SuccessStep } from './stepper';
import { Card } from '@/shared/components/server';

enum StepEnum {
  Email = 1,
  Otp,
  Password,
  Success,
}

type StepComponentProps = {
  onNext: () => void;
};

const Steps: Record<StepEnum, React.FC<StepComponentProps>> = {
  [StepEnum.Email]: EmailStep,
  [StepEnum.Otp]: OtpStep,
  [StepEnum.Password]: PasswordStep,
  [StepEnum.Success]: SuccessStep,
};

const ForgetPasswordFlow = () => {
  const [step, setStep] = useState<StepEnum>(StepEnum.Email);
  const Step = Steps[step];

  const onNext = () => {
    setStep((prev) => (prev + 1) as StepEnum);
  };

  return (
    <div className="grid h-full items-center justify-items-center overflow-auto">
      <Card className="w-full">
        <Step onNext={onNext} />
      </Card>
    </div>
  );
};

export { ForgetPasswordFlow };
