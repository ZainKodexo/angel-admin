type TPromptCategory = 'couple' | 'single';

export type TPrompt = {
  id: string;
  name: string;
  content: string;
  prompt_type: TPromptCategory;
  is_active: boolean;
  tags: string[];
  step: string;
  session_type: string;
};
