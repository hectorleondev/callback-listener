'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import { AlertTriangle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useDashboardStats } from '../hooks/useDashboardData';
import { formatters } from '@/lib/utils/formatters';
import { EmptyState } from '@/features/common/ui/EmptyState';
import { LoadingSpinner } from '@/features/common/ui/LoadingSpinner';
import { Skeleton } from '@/components/ui/skeleton';

export function RecentActivity() {
  const { data, isLoading, error } = useDashboardStats();
  
  const recentRequests = useMemo(() => {
    return data?.recent_requests || [];
  }, [data]);
  
  if (isLoading) {
    return (
      <div className="space-y-4">
        {Array(5).fill(null).map((_, i) => (
          <div key={i} className="flex items-center justify-between border-b pb-3">
            <div className="space-y-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-3 w-32" />
            </div>
            <Skeleton className="h-6 w-16" />
          </div>
        ))}
      </div>
    );
  }
  
  if (error) {
    return (
      <EmptyState 
        icon={<AlertTriangle className="h-10 w-10" />}
        title="Failed to load activity"
        description="We couldn't load your recent webhook activity. Please try again."
      />
    );
  }
  
  if (recentRequests.length === 0) {
    return (
      <EmptyState
        title="No recent activity"
        description="Your webhook endpoints haven't received any requests yet. Create a webhook to start capturing data."
      />
    );
  }
  
  return (
    <div className="space-y-5">
      {recentRequests.map((request) => (
        <div key={request.id} className="flex items-center justify-between border-b pb-3 last:border-0">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Badge 
                variant={request.status_code && request.status_code < 400 ? "success" : "destructive"}
                size="sm"
              >
                {request.method}
              </Badge>
              <Link 
                href={`/webhooks/${request.path_id}/logs`}
                className="font-medium hover:underline"
              >
                {request.path_id}
              </Link>
            </div>
            <p className="text-xs text-muted-foreground">
              {formatters.timeAgo(request.timestamp)} • {request.ip_address}
            </p>
          </div>
          <Badge
            variant={request.status_code && request.status_code < 400 ? "success" : "destructive"}
            className="font-mono text-xs"
          >
            {request.status_code || 'N/A'}
          </Badge>
        </div>
      ))}
    </div>
  );
}