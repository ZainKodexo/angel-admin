import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { EmailSchema } from '@/shared/schema';

// Reusable password validation constants
const PASSWORD_CONSTRAINTS = {
  MIN_LENGTH: 8,
  REQUIRES: {
    NUMBER: /[0-9]/,
    LOWERCASE: /[a-z]/,
    UPPERCASE: /[A-Z]/,
    SYMBOL: /[^a-zA-Z0-9]/,
  },
} as const;

// Centralized error messages
const PASSWORD_ERROR_MESSAGES = {
  REQUIRED: 'Password is required',
  MIN_LENGTH: `Password must be at least ${PASSWORD_CONSTRAINTS.MIN_LENGTH} characters long`,
  NUMBER: 'Password must contain at least one number',
  LOWERCASE: 'Password must contain at least one lowercase letter',
  UPPERCASE: 'Password must contain at least one uppercase letter',
  SYMBOL: 'Password must contain at least one symbol',
  CONFIRM_MISMATCH: 'Password and Confirm Password fields must match',
} as const;

/**
 * Creates a base password validator with comprehensive rules
 * @returns Zod string schema for password validation
 */
const createPasswordValidator = () => {
  return z
    .string({ required_error: PASSWORD_ERROR_MESSAGES.REQUIRED })
    .min(PASSWORD_CONSTRAINTS.MIN_LENGTH, {
      message: PASSWORD_ERROR_MESSAGES.MIN_LENGTH,
    })
    .regex(PASSWORD_CONSTRAINTS.REQUIRES.NUMBER, {
      message: PASSWORD_ERROR_MESSAGES.NUMBER,
    })
    .regex(PASSWORD_CONSTRAINTS.REQUIRES.LOWERCASE, {
      message: PASSWORD_ERROR_MESSAGES.LOWERCASE,
    })
    .regex(PASSWORD_CONSTRAINTS.REQUIRES.UPPERCASE, {
      message: PASSWORD_ERROR_MESSAGES.UPPERCASE,
    })
    .regex(PASSWORD_CONSTRAINTS.REQUIRES.SYMBOL, {
      message: PASSWORD_ERROR_MESSAGES.SYMBOL,
    });
};

const EmailStepSchema = z.object({
  email: EmailSchema,
});

const OtpStepSchema = z.object({
  token: z.string().min(5, 'Otp must be of length 5 characters long'),
});

const LoginSchema = z.object({
  email: EmailSchema,
  password: z
    .string({ required_error: 'Password is required' })
    .min(1, 'Password is required'),
});

const ResetPasswordSchema = z
  .object({
    password: createPasswordValidator(),
    confirm_password: z.string(),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: PASSWORD_ERROR_MESSAGES.CONFIRM_MISMATCH,
    path: ['confirm_password'],
  });

const AddressSchema = z.object({
  address_1: z.string().nonempty('Address 1 is required'),
  address_2: z.string().optional(),
  country: z.string().nonempty('Country is required'),
  state: z.string().nonempty('State is required'),
});

const BioSchema = z.object({
  first_name: z
    .string()
    .nonempty('First name is required')
    .max(25, 'First name must be at most 25 characters long'),
  last_name: z
    .string()
    .nonempty('Last name is required')
    .max(25, 'Last name must be at most 25 characters long'),
  email: EmailSchema,
});

// infer the type from the schema
type TEmailStepSchema = z.infer<typeof EmailStepSchema>;
type TLoginSchema = z.infer<typeof LoginSchema>;
type TResetPasswordSchema = z.infer<typeof ResetPasswordSchema>;
type TOtpStepSchema = z.infer<typeof OtpStepSchema>;
type TAddressSchema = z.infer<typeof AddressSchema>;
type TBioSchema = z.infer<typeof BioSchema>;

// Resolve the schema using zodResolver
const EmailStepSchemaResolver = zodResolver(EmailStepSchema);
const LoginSchemaResolver = zodResolver(LoginSchema);
const ResetPasswordSchemaResolver = zodResolver(ResetPasswordSchema);
const OtpStepSchemaResolver = zodResolver(OtpStepSchema);
const AddressSchemaResolver = zodResolver(AddressSchema);
const BioSchemaResolver = zodResolver(BioSchema);

export {
  EmailStepSchema,
  LoginSchema,
  ResetPasswordSchema,
  OtpStepSchema,
  EmailStepSchemaResolver,
  LoginSchemaResolver,
  ResetPasswordSchemaResolver,
  OtpStepSchemaResolver,
  AddressSchemaResolver,
  BioSchemaResolver,
};

export type {
  TEmailStepSchema,
  TLoginSchema,
  TResetPasswordSchema,
  TOtpStepSchema,
  TAddressSchema,
  TBioSchema,
};
