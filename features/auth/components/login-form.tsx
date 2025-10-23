'use client';

import { FormField, LoadingButton } from '@/components/ui';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/forms/input';
import { PasswordInput } from '@/components/ui/forms/password-input';
import { LoginFormData, loginSchema } from '@/lib/validations';
import { yupResolver } from '@hookform/resolvers/yup';
import Image from 'next/image';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { useAuth } from '../hooks/use-auth';

export const LoginForm = () => {
  const { login, isLoading } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginFormData>({
    resolver: yupResolver(loginSchema),
    mode: 'onBlur'
  });

  const onSubmit = (data: LoginFormData) => {
    login(data);
  };

  return (
    <Card className="w-full max-w-md mx-auto rounded-[1.25rem] py-15 shadow-[0px_8px_16px_rgba(0,0,0,0.04)]">
      <CardHeader className="mb-6">
        <div className="flex justify-center mb-6">
          <Image src="/logo.svg" alt="Bazara" width={86} height={22} />
        </div>
        <CardTitle className="text-center text-2xl font-bold text-black">
          Login to your account
        </CardTitle>
      </CardHeader>

      <CardContent className="px-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Email */}
          <FormField
            label="Email Address/Username"
            error={errors.email?.message}
          >
            <Input
              {...register('email')}
              data-testid="email-input"
              placeholder="email@example.com"
              className={errors.email ? 'border-red-500' : ''}
            />
          </FormField>

          {/* Password */}
          <div>
            <FormField label="Password" error={errors.password?.message}>
              <PasswordInput
                {...register('password')}
                data-testid="password-input"
                placeholder="Password"
                className={errors.password ? 'border-red-500' : ''}
              />
            </FormField>

            <div className="flex justify-end mt-1">
              <Link href="#">
                <span className="text-xs font-normal text-primary hover:underline">
                  Forgot Password?
                </span>
              </Link>
            </div>
          </div>

          <div className="flex justify-center mt-6">
            <LoadingButton
              type="submit"
              className="w-full bg-primary-variant!"
              data-testid="login-button"
              disabled={isLoading}
              isLoading={isLoading}
            >
              Login
            </LoadingButton>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
