import { BioSchemaResolver, TBioSchema } from '@/features/auth/schemas';
import { Button, Form, InputFormField } from '@/shared/components';
import { useForm } from 'react-hook-form';
import { Bio, SignupData } from './types';

type StepAddressProps = {
  onNext: (data: Bio) => void;
  initialValues: SignupData;
};

const StepBio = ({ onNext, initialValues }: StepAddressProps) => {
  const form = useForm<TBioSchema>({
    resolver: BioSchemaResolver,
    defaultValues: initialValues,
  });

  const action: () => void = form.handleSubmit(async (data) => {
    onNext(data);
  });

  return (
    <Form {...form}>
      <form action={action} className="space-y-6">
        <div className="space-y-4">
          <InputFormField
            name="first_name"
            label="First Name"
            placeholder="John"
            type="text"
            control={form.control}
          />

          <InputFormField
            name="last_name"
            label="Last Name"
            placeholder="Doe"
            type="text"
            control={form.control}
          />
          <InputFormField
            name="email"
            label="Email"
            placeholder="example@gmail.com"
            type="text"
            control={form.control}
          />
        </div>

        <Button type="submit" className="w-full">
          Continue
        </Button>
      </form>
    </Form>
  );
};

export { StepBio };
