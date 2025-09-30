import { cn } from '@/shared/utils';
import { Control, FieldValues, Path } from 'react-hook-form';
import {
  Input,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/shared/components';
import { IconType } from 'react-icons/lib';
import React, { HTMLInputTypeAttribute } from 'react';
import Link from 'next/link';

interface InputFormFieldProps<T extends FieldValues> {
  label: string;
  name: Path<T>;
  control: Control<T>;
  placeholder: string;
  type: HTMLInputTypeAttribute;
  className?: string;
  leftIcon?: IconType;
  rightIcon?: IconType;
  labelClassName?: string;
  disabled?: boolean;
  forgetPassword?: boolean;
  required?: boolean;
}

const InputFormField = <T extends FieldValues>({
  label,
  control,
  placeholder,
  name,
  className,
  leftIcon,
  rightIcon,
  type,
  labelClassName,
  disabled,
  forgetPassword = false,
  required = true,
}: InputFormFieldProps<T>) => {
  return (
    <FormField
      name={name}
      control={control}
      disabled={disabled}
      render={({ field, fieldState }) => (
        <FormItem className={cn(className)}>
          <div
            className={cn(
              forgetPassword && 'flex items-center justify-between',
            )}
          >
            <FormLabel
              className={cn(labelClassName)}
              required={required}
              optional={!required}
            >
              {label}
            </FormLabel>
            {forgetPassword && (
              <Link href="/auth/forget-password" className="text-sm">
                Forget Password?
              </Link>
            )}
          </div>
          <FormControl>
            <Input
              {...field}
              formFieldState={fieldState}
              placeholder={placeholder}
              leftIcon={leftIcon}
              rightIcon={rightIcon}
              type={type}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export { InputFormField };
