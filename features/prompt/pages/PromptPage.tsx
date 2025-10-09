import { Typography } from '@/shared/components/Typography';
import { Prompt } from '../components';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/shared/components/server';

export const PromptPage = () => {
  return (
    <div className="space-y-6">
      <div>
        <Typography.HeadingMediumLarge className="text-foreground mb-2 text-2xl font-semibold">
          AI Prompt Management
        </Typography.HeadingMediumLarge>
        <Typography.BodyRegularMedium className="text-muted-foreground">
          Configure AI prompts for generating session summaries and podcasts.
          Each prompt can be customized for different client types and session
          formats.
        </Typography.BodyRegularMedium>
      </div>
      {/* Prompts */}
      <Prompt />
      {/* Guidlines */}
      <Card className="bg-muted/50">
        <CardHeader>
          <CardTitle className="text-base">Usage Guidelines</CardTitle>
        </CardHeader>
        <CardContent className="text-muted-foreground space-y-2 text-sm">
          <Typography.BodyRegularMedium>
            • <strong>Summary Prompts:</strong> Used to generate written
            summaries of therapy sessions
          </Typography.BodyRegularMedium>
          <Typography.BodyRegularMedium>
            • <strong>Podcast Prompts:</strong> Used to create audio content and
            podcast scripts
          </Typography.BodyRegularMedium>
          <Typography.BodyRegularMedium>
            • <strong>Pre-Consultation:</strong> Applied to initial assessment
            sessions
          </Typography.BodyRegularMedium>
          <Typography.BodyRegularMedium>
            • <strong>Regular Sessions:</strong> Used for ongoing therapy
            appointments
          </Typography.BodyRegularMedium>
          <Typography.BodyRegularMedium>
            • Changes take effect immediately for new AI generations
          </Typography.BodyRegularMedium>
        </CardContent>
      </Card>
    </div>
  );
};
