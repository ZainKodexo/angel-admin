type TPromptCategory =
  | 'podcast_ready'
  | 'client_credentials'
  | 'forgot_password'
  | 'signup_verification';

export type TEmail = {
  id: string;
  subject: string;
  html_content: string;
  text_content: string;
  is_active: boolean;
  email_type: TPromptCategory;
  placeholder: string[];
};
