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
import { useActionWithFeedback } from '@/shared/hooks';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

const PasswordStep = () => {
  const router = useRouter();
  const email = localStorage.getItem('email') || '';

  const form = useForm<TResetPasswordSchema>({
    resolver: ResetPasswordSchemaResolver,
    defaultValues: {
      password: '',
      confirm_password: '',
    },
  });

  const resetPasswordAction = useActionWithFeedback({
    mutationFn: resetPassword,
    mutationKey: [AUTH_QUERY.RESET_PASSWORD],
    onSuccess: () => {
      router.push('login');
      localStorage.removeItem('email');
    },
  });

  const onResetPassword = (data: TResetPasswordSchema) => {
    const payload = { ...data, email: email };
    resetPasswordAction.mutate(payload);
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
            <Button type="submit" className="w-full">
              Update Password
            </Button>
          </form>
        </Form>
      </CardContent>
    </>
  );
};

export { PasswordStep };
