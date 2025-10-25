'use client';

import {
  PendingItemCard,
  PendingItemCardSkeleton,
  PinchSVGIcon
} from '@/components/ui';
import { usePendingTickets } from '../../hooks';

export const PendingTicketCard = () => {
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
