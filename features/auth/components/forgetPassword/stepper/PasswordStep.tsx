'use client';
import { resetPassword } from '@/features/auth/actions';
import {
  ResetPasswordSchemaResolver,
  TResetPasswordSchema,
} from '@/features/auth/schemas';
import { AUTH_QUERY } from '@/features/auth/utils';
import { Button, Form, InputFormField } from '@/shared/components';
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/shared/components/server';
import { useActionWithFeedbackAsync } from '@/shared/hooks';
import { useForm } from 'react-hook-form';

type PasswordStepProps = {
  onNext: () => void;
};

const PasswordStep = ({ onNext }: PasswordStepProps) => {
  const email = localStorage.getItem('email') || '';

  const form = useForm<TResetPasswordSchema>({
    resolver: ResetPasswordSchemaResolver,
    defaultValues: {
      password: '',
      confirm_password: '',
    },
  });

  const { mutateAsync, isPending } = useActionWithFeedbackAsync({
    mutationFn: resetPassword,
    mutationKey: [AUTH_QUERY.RESET_PASSWORD],
  });

  const onResetPassword = async (data: TResetPasswordSchema) => {
    const payload = { ...data, email: email };
    const { success } = await mutateAsync(payload);
    if (success) {
      localStorage.removeItem('email');
      onNext();
    }
  };
  return (
    <>
      <CardHeader>
        <CardTitle>Set a new password</CardTitle>
        <CardDescription>
          Create a new password. Ensure it differs from previos ones for
          security.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onResetPassword)}
            className="space-y-6"
          >
            <div className="space-y-4">
              <InputFormField
                control={form.control}
                name="password"
                placeholder="********"
                type="password"
                label="Enter new Password"
              />
              <InputFormField
                control={form.control}
                name="confirm_password"
                placeholder="********"
                type="password"
                label="Confirm Password"
              />
            </div>
            <Button isLoading={isPending} type="submit" className="w-full">
              Update Password
            </Button>
          </form>
        </Form>
      </CardContent>
    </>
  );
};

export { PasswordStep };
