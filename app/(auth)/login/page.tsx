import { Metadata } from 'next';
import { LoginForm } from '@/features/auth/components';

export const metadata: Metadata = {
  title: 'Login | Bazara Technologies'
};

export default function LoginPage() {
  return <LoginForm />;
}
