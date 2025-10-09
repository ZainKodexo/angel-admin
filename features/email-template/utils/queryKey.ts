const EmailQueryKey = {
  email: {
    all: ['all_emails'],
    update: (id: string) => ['update_prompt', id],
  },
};

export { EmailQueryKey };
