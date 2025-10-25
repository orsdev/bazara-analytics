import Image from 'next/image';
import Link from 'next/link';
import { ClassNameProps } from '@/types';
import { cn } from '@/lib/tw-merge';

interface LogoProps extends ClassNameProps {
  width?: number;
  height?: number;
}

export function Logo({ width = 86, height = 22, className }: LogoProps) {
  return (
    <Link href="/dashboard" className="flex items-center">
      <span className={cn('flex items-center', className)}>
        <Image
          src="/logo.svg"
          alt="Bazara"
          width={width}
          height={height}
          className="h-6 w-auto"
        />
      </span>
    </Link>
  );
}
