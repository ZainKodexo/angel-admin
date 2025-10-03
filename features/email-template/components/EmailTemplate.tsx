'use client';
import { Button, Editor } from '@/shared/components';
import {
  Badge,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/shared/components/server';
import { useActionWithFeedbackAsync } from '@/shared/hooks';
import { Check, Edit, X } from '@/shared/icons/server';
import { useQueryClient } from '@tanstack/react-query';
import * as React from 'react';
import { updateEmail } from '../actions';
import { TEmail } from '../types';
import { EmailQueryKey } from '../utils';

export const EmailTemplate = (email: TEmail) => {
  const queryClient = useQueryClient();
  const [isEditing, setIsEditing] = React.useState(false);
  const [emailHtmlContent, setEmailHtmlContent] = React.useState<string>(
    email.html_content,
  );

  const { mutateAsync, isPending } = useActionWithFeedbackAsync({
    mutationFn: updateEmail,
    mutationKey: EmailQueryKey.email.update(email.id),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: EmailQueryKey.email.all });
    },
  });

  const editCancelToggle = () => {
    setIsEditing(!isEditing);
  };

  const onSave = async () => {
    await mutateAsync({
      id: email.id,
      html_content: emailHtmlContent,
    });
    editCancelToggle();
  };

  const onEditorChange = (content: string) => {
    setEmailHtmlContent(content);
  };

  return (
    <Card key={email.id} className="mb-4">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg">{email.subject}</CardTitle>
            <div className="mt-2 flex gap-2">
              Placeholders:{' '}
              {email.placeholder.map((item) => (
                <Badge key={item} variant="default" className="text-xs">
                  {item}
                </Badge>
              ))}
            </div>
          </div>
          <div className="flex gap-2">
            {isEditing ? (
              <>
                <Button
                  onClick={onSave}
                  disabled={isPending}
                  type="button"
                  size="sm"
                  className="gap-1"
                >
                  <Check className="h-3 w-3" />
                  Save
                </Button>
                <Button
                  disabled={isPending}
                  onClick={editCancelToggle}
                  size="sm"
                  variant="outline"
                  className="gap-1"
                >
                  <X className="h-3 w-3" />
                  Cancel
                </Button>
              </>
            ) : (
              <>
                <Button
                  onClick={editCancelToggle}
                  size="sm"
                  variant="outline"
                  className="gap-1"
                >
                  <Edit className="h-3 w-3" />
                  Edit
                </Button>
              </>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {isEditing ? (
          <Editor html_content={email.html_content} onChange={onEditorChange} />
        ) : (
          <div
            className="bg-muted overflow-y-auto rounded-md p-4"
            dangerouslySetInnerHTML={{ __html: email.html_content }}
          />
        )}
      </CardContent>
    </Card>
  );
};
