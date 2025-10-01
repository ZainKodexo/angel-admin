'use client';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/components';
import { Badge } from '@/shared/components/server';
import { PROMPTCATEGORY, PROMPTS } from '../utils';
import { PromptCard } from './PromptCard';

export const Prompt = () => {
  return (
    <Tabs defaultValue="couple" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        {PROMPTCATEGORY.map(({ title, value }) => (
          <TabsTrigger key={value} value={value}>
            {title}
          </TabsTrigger>
        ))}
      </TabsList>

      {PROMPTCATEGORY.map(({ title, value }) => {
        const prompts = PROMPTS.filter((data) => data.type === value);
        return (
          <TabsContent key={value} value={value} className="mt-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">{title}</h3>
                <Badge variant="secondary">{prompts.length} prompts</Badge>
              </div>
              {prompts.map(PromptCard)}
            </div>
          </TabsContent>
        );
      })}
    </Tabs>
  );
};
