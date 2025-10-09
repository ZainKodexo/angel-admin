const PromptQueryKey = {
  prompt: {
    all: ['all_prompts'],
    update: (id: string) => ['update_prompt', id],
  },
};

export { PromptQueryKey };
