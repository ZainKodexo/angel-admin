import { ReactNode } from 'react';
import { FaApple } from '@/shared/icons/server';
import { Loader2 } from 'lucide-react';
import { Typography } from '@/shared/components/server';
import { socialButton } from './styles';

type SocialButtonProps = {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  isLoading?: boolean;
  variant?: 'google' | 'apple';
};

const SocialButton = ({
  children,
  className,
  onClick,
  isLoading,
  ...rest
}: SocialButtonProps) => {
  const props = {
    variant: rest.variant,
    disabled: isLoading,
    class: className,
  };

  const isGoogle = rest.variant === 'google';

  return (
    <div onClick={onClick} className={socialButton(props)}>
      {isLoading ? (
        <Loader2 className={'mr-2 h-auto w-auto animate-spin'} />
      ) : (
        <div className={'flex items-center gap-2'}>
          {isGoogle ? <img src="/assets/google-colorful.svg" /> : <FaApple />}
          <Typography.LabelSemiboldSmall className="text-[10px] lg:text-sm">
            {children}
          </Typography.LabelSemiboldSmall>
        </div>
      )}
    </div>
  );
};

export { SocialButton };
