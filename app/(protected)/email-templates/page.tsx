import { EmailTemplatePage } from '@/features/email-template/pages';
import { Suspense } from 'react';

const EmailTemplate = () => {
  return (
    <Suspense>
      <EmailTemplatePage />
    </Suspense>
  );
};

export default EmailTemplate;
