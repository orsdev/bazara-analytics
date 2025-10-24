import { ClassNameProps } from '@/types';
import { cn } from '@/lib/tw-merge';
import { BellSVGIcon, GridSVGIcon } from '../icons';

interface ActionButtonsProps extends ClassNameProps {
  onNotificationClick?: () => void;
  onGridClick?: () => void;
  showBadge?: boolean;
  badgeCount?: number;
}

export function ActionButtons({
  className,
  onNotificationClick,
  onGridClick,
  showBadge = false,
  badgeCount = 0
}: ActionButtonsProps) {
  return (
    <div className={cn('flex items-center justify-between gap-6', className)}>
      {/* Notifications */}
      <button
        type="button"
        aria-label="Notifications"
        className="border rounded-full h-8 w-8 flex items-center justify-center cursor-pointer relative hover:bg-gray-50 transition-colors"
        onClick={onNotificationClick}
      >
        <BellSVGIcon size={28} className="relative top-1.5 left-1.5" />
        {showBadge && badgeCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
            {badgeCount > 9 ? '9+' : badgeCount}
          </span>
        )}
      </button>

      {/* Grid */}
      <button
        type="button"
        aria-label="Grid"
        className="h-6 w-6 flex items-center justify-center cursor-pointer relative hover:opacity-70 transition-opacity"
        onClick={onGridClick}
      >
        <GridSVGIcon size={28} />
      </button>
    </div>
  );
}
