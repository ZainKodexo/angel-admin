'use client';
import { buttonVariants } from '@/shared/components';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Typography,
} from '@/shared/components/server';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { signup } from '../../actions';
import { Address, Bio, Password } from './types';

import { useActionWithFeedback } from '@/shared/hooks';
import { StepAddress } from './StepAddress';
import { StepBio } from './StepBio';
import { StepPassword } from './StepPassword';
import { Stepper } from './Stepper';

const SignupForm = () => {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    address_1: '',
    address_2: '',
    country: '',
    state: '',
    phone: '',
    password: '',
    confirm_password: '',
  });

  const { execute } = useActionWithFeedback(signup);

  const action = async (data: Password) => {
    const finalData = { ...formData, ...data };
    const response = await execute(finalData);

    if (response.success) router.push('/');
  };

  const nextStep = (data: Bio | Address | Password) => {
    setFormData((prev) => ({ ...prev, ...data }));
    setStep((prev) => prev + 1);
  };
  return (
    <div className="grid h-full items-center justify-items-center overflow-auto">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Create your account</CardTitle>
          <CardDescription>
            Kindly fill in your details below to login
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center">
            <Stepper step={step} setStep={setStep} />
          </div>

          <div>
            {step === 1 && (
              <StepBio onNext={nextStep} initialValues={formData} />
            )}
            {step === 2 && (
              <StepAddress onNext={nextStep} initialValues={formData} />
            )}
            {step === 3 && (
              <StepPassword onSubmit={action} initialValues={formData} />
            )}
          </div>
        </CardContent>
        <CardFooter className="justify-center">
          <Typography.BodyMediumMedium className="flex flex-col items-center justify-center lg:flex-row">
            Already have an account?
            <Link
              href="/auth/login"
              className={buttonVariants({ variant: 'link' })}
            >
              Login
            </Link>
          </Typography.BodyMediumMedium>
        </CardFooter>
      </Card>
    </div>
  );
};

export { SignupForm };
