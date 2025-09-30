import * as z from 'zod';

const EmailSchema = z
  .string({ required_error: 'Email is required' })
  .email({ message: 'Invalid email address' });

export { EmailSchema };
