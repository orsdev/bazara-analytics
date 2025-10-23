import { Loader2 } from 'lucide-react';
import { Button, ButtonProps } from '@/components/ui/buttons/button';

interface LoadingButtonProps extends ButtonProps {
  isLoading?: boolean;
}

export const LoadingButton = ({
  children,
  isLoading,
  ...props
}: LoadingButtonProps) => {
  return (
    <Button {...props}>
      {isLoading && <Loader2 data-testid="loader" className="animate-spin" />}
      {!isLoading && children}
    </Button>
  );
};
