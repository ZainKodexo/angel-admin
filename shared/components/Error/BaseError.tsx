'use client';
import { Typography } from '@/shared/components/server';
import { Button } from '@/shared/components';

type BaseErrorProps = {
  title: string;
  subtitle: string;
  description?: string;
  onClick: () => void;
  textButton: string;
};

const BaseError = ({
  title,
  subtitle,
  description,
  onClick,
  textButton,
}: BaseErrorProps) => {
  return (
    <div className="flex flex-col">
      <div className="absolute top-8 left-8 w-44">
        <img
          src="/assets/logo.png"
          className="text-content-brand whitespace-nowrap"
        />
      </div>
      <div className="flex min-h-screen flex-col items-center justify-center">
        <Typography.HeadingSemiboldExtraLarge className="text-content-brand mb-4 text-6xl">
          {title}
        </Typography.HeadingSemiboldExtraLarge>
        <h2 className="mb-2 text-2xl font-semibold text-gray-800">
          {subtitle}
        </h2>
        <p className="mb-8 text-lg text-gray-600">{description}</p>
        <Button
          variant="secondary"
          onClick={onClick}
          className="text-md mx-auto rounded-full border-4 border-[#dfeff4] px-6 py-6 shadow-md"
        >
          {textButton}
        </Button>
      </div>
    </div>
  );
};

export { BaseError };
