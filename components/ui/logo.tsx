import Image from 'next/image';
import Link from 'next/link';
import { ClassNameProps } from '@/types';
import { cn } from '@/lib/tw-merge';

interface LogoProps extends ClassNameProps {
  href?: string;
  width?: number;
  height?: number;
  showText?: boolean;
}

export function Logo({
  href = '/dashboard',
  width = 86,
  height = 22,
  className,
  showText = false
}: LogoProps) {
  const logoContent = (
    <div className={cn('flex items-center', className)}>
      <Image
        src="/logo.svg"
        alt="Bazara"
        width={width}
        height={height}
        className="h-6 w-auto"
      />
      {showText && <span className="ml-2 text-lg font-semibold">Bazara</span>}
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="flex items-center">
        {logoContent}
      </Link>
    );
  }

  return logoContent;
}
