'use client';

import {
  PendingItemCard,
  PendingItemCardSkeleton,
  PinchSVGIcon
} from '@/components/ui';
import { usePendingTickets } from '../hooks/use-pending-tickets';

export const PendingTicket = () => {
  const { pendingTickets, isLoading } = usePendingTickets();

  if (isLoading) {
    return <PendingItemCardSkeleton />;
  }

  return (
    <PendingItemCard
      title="Pending Tickets - Team"
      value={pendingTickets?.count || 0}
      description="Pending Tickets"
      headerIcon={<PinchSVGIcon />}
      handleMoreOptions={() => {}}
    />
  );
};
