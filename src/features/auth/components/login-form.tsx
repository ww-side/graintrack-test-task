import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@radix-ui/themes';
import * as Form from '@radix-ui/react-form';
import { useAuth } from '@/shared/hooks/use-auth.ts';
import FormGroup from '@/shared/components/form-group.tsx';
import {
  loginSchema,
  type LoginSchema,
} from '@/core/utils/validators/login.schema.ts';
import { useNavigate } from '@tanstack/react-router';

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });
  const { login } = useAuth();
  const navigate = useNavigate({ from: '/auth' });

  const onSubmit = async (data: LoginSchema) => {
    console.log(data);
    login(data.username, data.password).subscribe({
      next: res => {
        if (res.success && res.data.token) {
          navigate({ to: '/' });
        }
      },
      error: err => {
        toast.error(err.message);
      },
    });
  };

  return (
    <Form.Root
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-5 bg-gray-50 p-3 rounded-md w-[300px]"
    >
      <FormGroup
        name="username"
        register={register}
        error={errors?.username?.message}
        label="Username"
      />
      <FormGroup
        name="password"
        label="Password"
        register={register}
        error={errors?.password?.message}
      />
      <Button type="submit">Login</Button>
    </Form.Root>
  );
}
