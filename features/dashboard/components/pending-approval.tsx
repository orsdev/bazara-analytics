'use client';

import {
  PendingItemCard,
  PendingItemCardSkeleton,
  PinchSVGIcon,
  UserCircleSVGIcon
} from '@/components/ui';
import { usePendingApprovals } from '../hooks/use-pending-approvals';

export const PendingApproval = () => {
  const { pendingApprovals, isLoading } = usePendingApprovals();

  if (isLoading) {
    return <PendingItemCardSkeleton />;
  }

  return (
    <PendingItemCard
      title="Pending Approval - Me"
      value={pendingApprovals?.count || 0}
      description="Pending Approvals"
      headerIcon={<PinchSVGIcon />}
      bodyIcon={<UserCircleSVGIcon />}
      handleMoreOptions={() => {}}
    />
  );
};
