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
import { Check, X, Edit, RotateCcw } from '@/shared/icons/server';
import { TPrompt } from '../types';
import * as React from 'react';

export const PromptCard = (prompt: TPrompt) => {
  const [isEditing, setIsEditing] = React.useState(false);

  const editCancelToggle = () => {
    setIsEditing(!isEditing);
  };
  return (
    <Card key={prompt.id} className="mb-4">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg">{prompt.name}</CardTitle>
            <div className="mt-2 flex gap-2">
              <Badge variant="secondary" className="text-xs">
                Single Therapy
              </Badge>
              <Badge variant="outline" className="text-xs">
                Regular Session
              </Badge>
            </div>
          </div>
          <div className="flex gap-2">
            {isEditing ? (
              <>
                <Button size="sm" className="gap-1">
                  <Check className="h-3 w-3" />
                  Save
                </Button>
                <Button
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
                <Button size="sm" variant="outline" className="gap-1">
                  <RotateCcw className="h-3 w-3" />
                  Restore
                </Button>
              </>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {isEditing ? (
          <Textarea
            defaultValue={prompt.content}
            className="min-h-32 resize-none"
            placeholder="Enter your prompt content..."
          />
        ) : (
          <div className="bg-muted rounded-md p-4">
            <Typography.BodyRegularMedium className="text-muted-foreground text-sm whitespace-pre-wrap">
              {prompt.content}
            </Typography.BodyRegularMedium>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
