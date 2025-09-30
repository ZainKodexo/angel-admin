'use client';
import { resetPassword } from '@/features/auth/actions';
import {
  ResetPasswordSchemaResolver,
  TResetPasswordSchema,
} from '@/features/auth/schemas';
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
  const resetPasswordAction = useActionWithFeedback(resetPassword);

  const form = useForm<TResetPasswordSchema>({
    resolver: ResetPasswordSchemaResolver,
    defaultValues: {
      password: '',
      confirm_password: '',
    },
  });

  const action: () => void = form.handleSubmit(async (data) => {
    const payload = { ...data, email: email };
    const { success } = await resetPasswordAction.execute(payload);

    if (success) {
      router.push('login');
      localStorage.removeItem('email');
    }
  });

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
          <form action={action} className="space-y-6">
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
