'use client';
import { forgetPassword } from '@/features/auth/actions';
import {
  EmailStepSchemaResolver,
  TEmailStepSchema,
} from '@/features/auth/schemas';
import { AUTH_QUERY } from '@/features/auth/utils';
import {
  Button,
  buttonVariants,
  Form,
  InputFormField,
} from '@/shared/components';
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Typography,
} from '@/shared/components/server';
import { useActionWithFeedbackAsync } from '@/shared/hooks';
import Link from 'next/link';
import { useForm } from 'react-hook-form';

type EmailStepProps = {
  onNext: () => void;
};

const EmailStep = ({ onNext }: EmailStepProps) => {
  const form = useForm<TEmailStepSchema>({
    resolver: EmailStepSchemaResolver,
    defaultValues: {
      email: '',
    },
  });

  const { mutateAsync, isPending } = useActionWithFeedbackAsync({
    mutationFn: forgetPassword,
    mutationKey: [AUTH_QUERY.FORGET_PASSWORD_EMAIL_STEP],
  });

  const onSubmit = async (data: TEmailStepSchema) => {
    const { success } = await mutateAsync(data);
    if (success) {
      localStorage.setItem('email', data.email);
      onNext();
    }
  };
  return (
    <>
      <CardHeader>
        <CardTitle>Forgot Password</CardTitle>
        <CardDescription>
          Please enter your email to reset the password
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              <InputFormField
                name="email"
                label="Your Email"
                placeholder="example@gmail.com"
                type="text"
                control={form.control}
              />
            </div>

            <Button isLoading={isPending} type="submit" className="w-full">
              Continue
            </Button>

            <div className="flex items-center justify-center">
              <hr className="border-border-secondary mr-6 flex-grow" />
              <Typography.BodyRegularLarge>OR</Typography.BodyRegularLarge>
              <hr className={'border-border-secondary ml-6 flex-grow'} />
            </div>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="justify-center">
        Already have an account?
        <Link
          href="/auth/login"
          className={buttonVariants({ variant: 'link' })}
        >
          Login
        </Link>
      </CardFooter>
    </>
  );
};

export { EmailStep };
