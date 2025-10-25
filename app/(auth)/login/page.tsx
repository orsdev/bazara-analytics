import { Metadata } from 'next';
import { LoginForm } from '@/features/auth/components';

export const metadata: Metadata = {
  title: 'Login | Bazara Technologies',
  description:
    'Sign in to your Bazara Technologies account to access your analytics dashboard. Monitor tickets, requests, and team performance with real-time insights.'
};

export default function LoginPage() {
  return <LoginForm />;
}
