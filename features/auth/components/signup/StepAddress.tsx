import {
  Button,
  CountrySelectFormField,
  Form,
  InputFormField,
} from '@/shared/components';
import { useForm } from 'react-hook-form';
import { AddressSchemaResolver, TAddressSchema } from '@/features/auth/schemas';
import { Address, SignupData } from './types';

type StepAddressProps = {
  onNext: (data: Address) => void;
  initialValues: SignupData;
};

const StepAddress = ({ onNext, initialValues }: StepAddressProps) => {
  const form = useForm<TAddressSchema>({
    resolver: AddressSchemaResolver,
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
            name="address_1"
            label="Address Line 1"
            placeholder="ABC road street xyz"
            type="text"
            control={form.control}
          />
          <InputFormField
            name="address_2"
            label="Address Line 2"
            placeholder="DEF road street xyz"
            type="text"
            control={form.control}
            required={false}
          />
          <CountrySelectFormField
            name="country"
            label="Country"
            placeholder="Select a country"
            control={form.control}
          />
          <InputFormField
            name="state"
            label="State"
            placeholder="NYC"
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

export { StepAddress };
