'use client';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/components';
import { Badge, Skeleton } from '@/shared/components/server';
import { useGetAllPrompts } from '../hooks';
import { PROMPTCATEGORY } from '../utils';
import { PromptCard } from './PromptCard';
import { PromptsNotFound } from './PromptsNotFound';

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
      <PromptsContent />
    </Tabs>
  );
};

const PromptsContent = () => {
  const { data, isLoading } = useGetAllPrompts();

  if (isLoading) {
    return (
      <div className="w-full space-y-6">
        <Skeleton className="h-36" />
        <Skeleton className="h-36" />
        <Skeleton className="h-36" />
      </div>
    );
  }

  if (!data?.data?.data) {
    return <PromptsNotFound />;
  }

  return PROMPTCATEGORY.map(({ title, value }) => {
    const prompts = data.data.data.filter((data) => data.prompt_type === value);

    return (
      <TabsContent key={value} value={value} className="mt-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium">{title}</h3>
            <Badge variant="secondary">{prompts.length} prompts</Badge>
          </div>
          {prompts.map((prompt) => (
            <PromptCard key={prompt.id} {...prompt} />
          ))}
        </div>
      </TabsContent>
    );
  });
};
