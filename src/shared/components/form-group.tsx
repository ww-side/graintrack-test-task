import { FieldValues, Path, UseFormRegister } from 'react-hook-form';
import * as Form from '@radix-ui/react-form';
import * as Label from '@radix-ui/react-label';
import { TextField, Text } from '@radix-ui/themes';

type FormGroupProps<TFieldValues extends FieldValues> = {
  name: Path<TFieldValues>;
  label: string;
  register: UseFormRegister<TFieldValues>;
  error: string | undefined;
  'data-testid'?: string;
};

export default function FormGroup<TFieldValues extends FieldValues>({
  name,
  label,
  register,
  error,
  'data-testid': testId,
}: FormGroupProps<TFieldValues>) {
  return (
    <Form.Field name={name} className="relative">
      <Label.Root htmlFor={name}>{label}</Label.Root>
      <TextField.Root
        id={name}
        size="2"
        placeholder=""
        data-testid={testId}
        {...register(name)}
      />
      {error && <Text className="absolute text-red-500 text-sm">{error}</Text>}
    </Form.Field>
  );
}
