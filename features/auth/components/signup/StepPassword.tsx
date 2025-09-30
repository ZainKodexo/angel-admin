'use client';
import {
  ResetPasswordSchemaResolver,
  TResetPasswordSchema,
} from '@/features/auth/schemas';
import {
  Button,
  Checkbox,
  Form,
  InputFormField,
  Label,
} from '@/shared/components';
import { CheckedState } from '@radix-ui/react-checkbox';
import Link from 'next/link';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Password, SignupData } from './types';

type StepAddressProps = {
  onSubmit: (data: Password) => void;
  initialValues: SignupData;
};

const StepPassword = ({ onSubmit, initialValues }: StepAddressProps) => {
  const [isCheckboxChecked, setIsCheckboxChecked] =
    useState<CheckedState>(false);
  const form = useForm<TResetPasswordSchema>({
    resolver: ResetPasswordSchemaResolver,
    defaultValues: initialValues,
  });

  const action: () => void = form.handleSubmit(async (data) => {
    onSubmit(data);
  });

  const handleCheckboxChange = (event: CheckedState) => {
    setIsCheckboxChecked(event);
  };

  return (
    <Form {...form}>
      <form action={action} className="space-y-6">
        <div className="space-y-4">
          <InputFormField
            name="password"
            label="Password"
            placeholder="********"
            type="password"
            control={form.control}
          />
          <InputFormField
            name="confirm_password"
            label="Confirm Password"
            placeholder="********"
            type="password"
            control={form.control}
          />
        </div>

        <div className="flex items-center gap-2">
          <Checkbox
            id="terms"
            checked={isCheckboxChecked}
            onCheckedChange={(checked) => handleCheckboxChange(checked)}
          />
          <Label htmlFor="terms">
            By signing up I agree to the{' '}
            <Link href={'/terms'} target="_blank">
              terms & conditions
            </Link>{' '}
            and
            <Link href="/privacy-policy" target="_blank">
              privacy policy
            </Link>
          </Label>
        </div>

        <Button type="submit" className="w-full" disabled={!isCheckboxChecked}>
          Create an account
        </Button>
      </form>
    </Form>
  );
};

export { StepPassword };
