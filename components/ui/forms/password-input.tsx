import { Eye, EyeOff } from 'lucide-react';
import { useState, type ComponentProps } from 'react';
import { Input } from './input';

interface PasswordInputProps extends ComponentProps<'input'> {
  className?: string;
}

export const PasswordInput = ({ ...props }: PasswordInputProps) => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible((prev) => !prev);
  const inputType = isVisible ? 'text' : 'password';

  return (
    <div className="flex justify-center w-full relative items-center">
      <Input type={inputType} {...props} />
      <div className="flex items-center justify-center absolute right-[1.2rem]">
        <button
          type="button"
          className="cursor-pointer opacity-50 scale-75"
          aria-label={isVisible ? 'Hide password' : 'Show password'}
          aria-pressed={isVisible}
          onClick={toggleVisibility}
        >
          {isVisible ? <Eye size={24} /> : <EyeOff size={24} />}
        </button>
      </div>
    </div>
  );
};
