import { ClassNameProps } from '@/types';

interface FormFieldProps extends ClassNameProps {
  label: string;
  error?: string;
  children: React.ReactNode;
}

export const FormField = ({
  label,
  error,
  children,
  className
}: FormFieldProps) => {
  return (
    <div className={className}>
      <label className="text-xs font-normal">{label}</label>
      <div className="mt-2">
        {children}
        {error && (
          <p className="text-xs font-normal text-red-600 mt-2" role="alert">
            {error}
          </p>
        )}
      </div>
    </div>
  );
};
