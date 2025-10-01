type TPromptCategory = 'couple' | 'single';

export type TPrompt = {
  id: string;
  name: string;
  content: string;
  type: TPromptCategory;
};
