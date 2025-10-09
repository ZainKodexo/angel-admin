import { Typography } from '@/shared/components/server';

export const EmailsNotFound = () => {
  return (
    <div className="bg-muted mt-4 flex h-60 items-center justify-center rounded-lg">
      <Typography.HeadingSemiboldLarge>
        No Emails found {'):'}
      </Typography.HeadingSemiboldLarge>
    </div>
  );
};
