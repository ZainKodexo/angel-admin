import { Typography } from '@/shared/components/server';

export const PromptsNotFound = () => {
  return (
    <div className="bg-muted mt-4 flex h-60 items-center justify-center rounded-lg">
      <Typography.HeadingSemiboldLarge>
        Please a create prompts {'):'}
      </Typography.HeadingSemiboldLarge>
    </div>
  );
};
