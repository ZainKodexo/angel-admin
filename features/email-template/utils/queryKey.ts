const EmailQueryKey = {
  email: {
    all: (language?: string) => ['all_emails', language],
    update: (id: string) => ['update_prompt', id],
  },
};

export { EmailQueryKey };
