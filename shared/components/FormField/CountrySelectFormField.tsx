import {
  CountryDropdown,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/shared/components';
import { cn } from '@/shared/utils';
import { Control, FieldValues, Path } from 'react-hook-form';

interface CountrySelectFormFieldProps<T extends FieldValues> {
  label: string;
  name: Path<T>;
  control: Control<T>;
  placeholder: string;
  className?: string;
  disabled?: boolean;
  labelClassName?: string;
}

const CountrySelectFormField = <T extends FieldValues>({
  label,
  control,
  placeholder,
  name,
  className,
  labelClassName,
  disabled,
}: CountrySelectFormFieldProps<T>) => {
  return (
    <FormField
      name={name}
      control={control}
      disabled={disabled}
      render={({ field }) => (
        <FormItem className={cn(className)}>
          <div>
            <FormLabel className={cn(labelClassName)} required>
              {label}
            </FormLabel>
          </div>
          <FormControl>
            <CountryDropdown
              {...field}
              placeholder={placeholder}
              onChange={field.onChange}
              defaultValue={field.value}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export { CountrySelectFormField };
