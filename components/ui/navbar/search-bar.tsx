import { GlobalSearchInput } from '@/components/ui/forms';
import { ClassNameProps } from '@/types';
import { cn } from '@/lib/tw-merge';

interface SearchBarProps extends ClassNameProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
  variant?: 'default' | 'compact';
}

export function NavbarSearchBar({
  className,
  placeholder = 'Search for anything',
  onSearch,
  variant = 'default'
}: SearchBarProps) {
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearch?.(e.target.value);
  };

  return (
    <div
      className={cn(
        'flex-1',
        {
          'hidden sm:flex': variant === 'default',
          'w-full': variant === 'compact'
        },
        className
      )}
    >
      <GlobalSearchInput placeholder={placeholder} onChange={handleSearch} />
    </div>
  );
}
