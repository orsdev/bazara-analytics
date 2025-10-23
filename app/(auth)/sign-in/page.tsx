import { LoginForm } from '@/features/auth/components';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sign In | Bazara Technologies'
};

export default function SignInPage() {
  return <LoginForm />;
}
