'use client';
import { LoginSchemaResolver, TLoginSchema } from '@/features/auth/schemas';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/shared/components/server';
import { useActionWithFeedback } from '@/shared/hooks';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

import { login } from '@/features/auth/actions';
import { Button, Form, InputFormField } from '@/shared/components';
import { AUTH_QUERY } from '../../utils';

const LoginForm = () => {
  const router = useRouter();
  const form = useForm<TLoginSchema>({
    resolver: LoginSchemaResolver,
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const { mutate, isPending } = useActionWithFeedback({
    mutationFn: login,
    mutationKey: [AUTH_QUERY.LOGIN],
    onSuccess: () => {
      router.replace('/auth/login');
    },
  });
  return (
    <div className="grid h-full items-center justify-items-center overflow-auto">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Welcome to Angel Admin</CardTitle>
          <CardDescription>
            Kindly fill in your details below to login
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit((data) => mutate(data))}
              className="space-y-6"
            >
              <div className="space-y-6">
                <InputFormField
                  label="Email Address"
                  name="email"
                  control={form.control}
                  placeholder="example@gmail.com"
                  type="email"
                />
                <InputFormField
                  label="Password"
                  name="password"
                  control={form.control}
                  placeholder="******"
                  type="password"
                  forgetPassword
                />
              </div>

              <Button isLoading={isPending} type="submit" className="w-full">
                Login
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export { LoginForm };
