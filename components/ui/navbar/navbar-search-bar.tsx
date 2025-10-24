import { SearchInput } from '@/components/ui/forms';
import { ClassNameProps } from '@/types';
import { cn } from '@/lib/tw-merge';

interface SearchBarProps extends ClassNameProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
}

export const NavbarSearchBar = ({
  className,
  placeholder = 'Search for anything',
  onSearch
}: SearchBarProps) => {
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearch?.(e.target.value);
  };

  return (
    <div className={cn('flex-1 hidden sm:flex', className)}>
      <SearchInput placeholder={placeholder} onChange={handleSearch} />
    </div>
  );
};
