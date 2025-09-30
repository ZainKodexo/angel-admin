'use client';
import { HTMLAttributeAnchorTarget, ReactNode } from 'react';

import Link from 'next/link';

import { button } from './styles';
import { BiLoaderAlt } from '@/shared/icons/server';
import { useFormStatus } from 'react-dom';

type ButtonProps = {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  isDisabled?: boolean;
  isLoading?: boolean;
  href?: string;
  variant?: 'primary' | 'link' | 'secondary';
  type?: 'button' | 'submit' | 'reset' | undefined;
  target?: HTMLAttributeAnchorTarget | undefined;
};

const SubmitButton = ({
  children,
  className,
  onClick,
  type,
  isDisabled,
  isLoading,
  href,
  target,
  ...rest
}: ButtonProps) => {
  const { pending } = useFormStatus();

  const props = {
    variant: rest.variant,
    disabled: isDisabled || isLoading || pending,
    class: className,
  };

  if (href) {
    return (
      <Link href={href} passHref target={target}>
        <button
          disabled={isDisabled || isLoading}
          type={type}
          className={button(props)}
        >
          {isLoading ? (
            <BiLoaderAlt className={'mr-2 h-auto w-auto animate-spin'} />
          ) : (
            children
          )}
        </button>
      </Link>
    );
  }

  return (
    <button
      onClick={onClick}
      disabled={isDisabled || isLoading || pending}
      type={type}
      className={button(props)}
    >
      {isLoading || pending ? (
        <BiLoaderAlt className={'mr-2 h-auto w-auto animate-spin'} />
      ) : (
        children
      )}
    </button>
  );
};

export { SubmitButton };
