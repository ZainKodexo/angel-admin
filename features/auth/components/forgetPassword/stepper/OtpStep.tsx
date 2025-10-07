'use client';
import { forgetPassword, verifyOtp } from '@/features/auth/actions';
import { OtpStepSchemaResolver, TOtpStepSchema } from '@/features/auth/schemas';
import { AUTH_QUERY } from '@/features/auth/utils';
import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/shared/components';
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Typography,
} from '@/shared/components/server';
import { useActionWithFeedback } from '@/shared/hooks';
import { useForm } from 'react-hook-form';

type OtpStepProps = {
  onNext: () => void;
};

const OtpStep = ({ onNext }: OtpStepProps) => {
  const email = localStorage.getItem('email') || '';

  const form = useForm<TOtpStepSchema>({
    resolver: OtpStepSchemaResolver,
    defaultValues: {
      OTP: '',
    },
  });

  const resendEmailAction = useActionWithFeedback({
    mutationFn: forgetPassword,
    mutationKey: [AUTH_QUERY.VERIFY_TOKEN],
  });

  const verifyOtpAction = useActionWithFeedback({
    mutationFn: verifyOtp,
    mutationKey: [AUTH_QUERY.RESEND_EMAIL],
    onSuccess: () => {
      onNext();
    },
  });

  const resendEmail = async () => {
    const payload = { email: email };
    resendEmailAction.mutate(payload);
  };

  const onVerify = (data: TOtpStepSchema) => {
    const payload = { email: email, OTP: data.OTP };
    verifyOtpAction.mutate(payload);
  };
  return (
    <>
      <CardHeader>
        <CardTitle>Check your email</CardTitle>
        <CardDescription>
          We sent a reset link to{' '}
          <span className="text-content-brand">{email} </span> enter 5 digit
          code that mentioned in the email
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onVerify)} className="space-y-6">
            <div className="flex justify-center space-y-4">
              <FormField
                control={form.control}
                name="OTP"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="flex w-fit justify-center">
                        <InputOTP maxLength={5} {...field}>
                          <InputOTPGroup>
                            <InputOTPSlot index={0} />
                            <InputOTPSlot index={1} />
                            <InputOTPSlot index={2} />
                            <InputOTPSlot index={3} />
                          </InputOTPGroup>
                        </InputOTP>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button
              isLoading={verifyOtpAction.isPending}
              type="submit"
              className="w-full"
            >
              Reset Password
            </Button>

            <div className="flex items-center justify-center">
              <hr className="border-border-secondary mr-6 flex-grow" />
              <Typography.BodyRegularLarge>OR</Typography.BodyRegularLarge>
              <hr className="border-border-secondary ml-6 flex-grow" />
            </div>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="justify-center">
        Haven&apos;t got the email yet?
        <Button onClick={resendEmail} variant="link">
          Resend Email
        </Button>
      </CardFooter>
    </>
  );
};

export { OtpStep };
