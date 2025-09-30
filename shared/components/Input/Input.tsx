import { cn } from '@/shared/utils';
import { BsEye, BsEyeSlash } from '@/shared/icons/server';
import * as React from 'react';
import type { ControllerFieldState } from 'react-hook-form';
import { IconType } from 'react-icons/lib';

interface InputProps extends React.ComponentProps<'input'> {
  leftIcon?: IconType;
  rightIcon?: IconType;
  formFieldState?: ControllerFieldState;
  parentClass?: string;
}
const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type,
      leftIcon: LeftIcon,
      rightIcon: RightIcon,
      formFieldState,
      parentClass,
      ...props
    },
    ref,
  ) => {
    const [showPassword, setShowPassword] = React.useState(false);

    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };
    return (
      <div
        className={cn(
          'relative',
          parentClass,
          formFieldState?.invalid && 'error',
        )}
      >
        <input
          type={type === 'password' && showPassword ? 'text' : type}
          className={cn(
            'file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
            'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
            'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
            className,
            LeftIcon && 'pl-10',
            RightIcon && 'pr-10',
            type === 'password' && 'pr-10',
          )}
          ref={ref}
          {...props}
        />
        {type === 'password' && (
          <div
            className="absolute inset-y-0 right-3 flex cursor-pointer items-center"
            onClick={togglePasswordVisibility}
          >
            {showPassword ? (
              <BsEyeSlash className="h-5 w-5 text-gray-500" />
            ) : (
              <BsEye className="h-5 w-5 text-gray-500" />
            )}
          </div>
        )}
        {LeftIcon && (
          <LeftIcon
            className="text-muted-foreground absolute top-1/2 left-3 -translate-y-1/2"
            size={20}
          />
        )}
        {RightIcon && type !== 'password' && (
          <RightIcon
            className="text-muted-foreground absolute top-1/2 right-3 -translate-y-1/2"
            size={20}
          />
        )}
      </div>
    );
  },
);
Input.displayName = 'Input';

export { Input };
