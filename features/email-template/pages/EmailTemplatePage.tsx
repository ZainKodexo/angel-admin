import { Typography } from '@/shared/components/Typography';
import { Email, EmailLanguageFilter } from '../components';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/shared/components/server';
import { Info } from '@/shared/icons/server';

export const EmailTemplatePage = () => {
  return (
    <div className="space-y-6">
      <div>
        <Typography.HeadingMediumLarge className="text-foreground mb-2 text-2xl font-semibold">
          Email Template Management
        </Typography.HeadingMediumLarge>
        <Typography.BodyRegularMedium className="text-muted-foreground">
          Customize email templates sent to clients. Use placeholders to
          personalize messages with dynamic content.
        </Typography.BodyRegularMedium>
      </div>
      <div className="flex justify-end">
        <EmailLanguageFilter />
      </div>
      {/* Prompts */}
      <Email />
      {/* Guidlines */}
      <Card className="bg-muted/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Info className="h-4 w-4" />
            Placeholder Guidelines
          </CardTitle>
        </CardHeader>
        <CardContent className="text-muted-foreground space-y-3 text-sm">
          <div>
            <Typography.BodyRegularMedium className="text-foreground mb-1 font-medium">
              Portal Access Reminder Placeholders:
            </Typography.BodyRegularMedium>
            <ul className="ml-4 space-y-1">
              <li>
                •{' '}
                <code className="bg-background rounded px-1">
                  {'{client_name}'}
                </code>{' '}
                - Client's full name
              </li>
              <li>
                •{' '}
                <code className="bg-background rounded px-1">
                  {'{days_remaining}'}
                </code>{' '}
                - Days until expiry
              </li>
              <li>
                •{' '}
                <code className="bg-background rounded px-1">
                  {'{expiry_date}'}
                </code>{' '}
                - Portal expiration date
              </li>
            </ul>
          </div>
          <div>
            <p className="text-foreground mb-1 font-medium">
              Podcast Ready Notification Placeholders:
            </p>
            <ul className="ml-4 space-y-1">
              <li>
                •{' '}
                <code className="bg-background rounded px-1">
                  {'{client_name}'}
                </code>{' '}
                - Client's full name
              </li>
              <li>
                •{' '}
                <code className="bg-background rounded px-1">
                  {'{podcast_title}'}
                </code>{' '}
                - Generated podcast title
              </li>
              <li>
                •{' '}
                <code className="bg-background rounded px-1">
                  {'{session_date}'}
                </code>{' '}
                - Date of therapy session
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
