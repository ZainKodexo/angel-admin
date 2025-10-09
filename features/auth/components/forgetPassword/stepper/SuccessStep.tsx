'use client';
import { Button } from '@/shared/components';
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/shared/components/server';
import { useRouter } from 'next/navigation';

const SuccessStep = () => {
  const router = useRouter();

  const action = () => {
    router.push('/auth/login');
  };

  return (
    <>
      <CardHeader>
        <CardTitle>Password Reset</CardTitle>
        <CardDescription>
          Your password has been successfully reset. Continue to login with your
          new password.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Button type="button" onClick={action} className="w-full">
          Confirm
        </Button>
      </CardContent>
    </>
  );
};

export { SuccessStep };
