'use client';
import { forgetPassword } from '@/features/auth/actions';
import {
  EmailStepSchemaResolver,
  TEmailStepSchema,
} from '@/features/auth/schemas';
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
import { useActionWithFeedback } from '@/shared/hooks';
import Link from 'next/link';
import { useForm } from 'react-hook-form';

type EmailStepProps = {
  onNext: () => void;
};

const EmailStep = ({ onNext }: EmailStepProps) => {
  const { execute } = useActionWithFeedback(forgetPassword);
  const form = useForm<TEmailStepSchema>({
    resolver: EmailStepSchemaResolver,
    defaultValues: {
      email: '',
    },
  });

  const action: () => void = form.handleSubmit(async (data) => {
    const response = await execute(data);
    if (response.success) {
      localStorage.setItem('email', data.email);
      onNext();
    }
  });

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
          <form action={action} className="space-y-6">
            <div className="space-y-4">
              <InputFormField
                name="email"
                label="Your Email"
                placeholder="example@gmail.com"
                type="text"
                control={form.control}
              />
            </div>

            <Button type="submit" className="w-full">
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
