'use client';
import { Button } from '@/shared/components';
import {
  Badge,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Textarea,
  Typography,
} from '@/shared/components/server';
import { useActionWithFeedback } from '@/shared/hooks';
import { Check, Edit, X } from '@/shared/icons/server';
import { useQueryClient } from '@tanstack/react-query';
import * as React from 'react';
import { updatePrompt } from '../actions';
import { TPrompt } from '../types';
import { PromptQueryKey } from '../utils';

export const PromptCard = (prompt: TPrompt) => {
  const queryClient = useQueryClient();
  const [isEditing, setIsEditing] = React.useState(false);
  const [promptContent, setPromptContent] = React.useState<string>(
    prompt.content,
  );

  const { mutate, isPending } = useActionWithFeedback({
    mutationFn: updatePrompt,
    mutationKey: PromptQueryKey.prompt.update(prompt.id),
    onSuccess: () => {
      editCancelToggle();
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: PromptQueryKey.prompt.all });
    },
  });

  const editCancelToggle = () => {
    setIsEditing(!isEditing);
  };

  const onSave = () => {
    mutate({ id: prompt.id, content: promptContent });
  };
  return (
    <Card key={prompt.id} className="mb-4">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg">{prompt.name}</CardTitle>
            <div className="mt-2 flex gap-2">
              {prompt.tags.map((item) => (
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
          <Textarea
            defaultValue={promptContent}
            className="max-h-96 resize-none"
            placeholder="Enter your prompt content..."
            onChange={(e) => setPromptContent(e.target.value)}
          />
        ) : (
          <div className="bg-muted max-h-96 overflow-y-auto rounded-md p-4">
            <Typography.BodyRegularMedium className="text-muted-foreground text-sm whitespace-pre-wrap">
              {prompt.content}
            </Typography.BodyRegularMedium>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
