'use client';

import { useMemo } from 'react';
import { AlertCircle, ArrowUpRight, Bell, Link as LinkIcon } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useDashboardStats } from '@/features/dashboard/hooks/useDashboardData';
import { formatters } from '@/lib/utils/formatters';
import { Skeleton } from '@/components/ui/skeleton';
import { StatusIndicator } from '@/features/common/ui/StatusIndicator';
import { cn } from '@/lib/utils/cn';

export function StatsCards() {
  const { data, isLoading, error } = useDashboardStats();
  
  const stats = useMemo(() => {
    if (!data) return null;
    
    return [
      {
        title: 'Total Webhooks',
        value: data.total_webhooks,
        description: 'Active endpoints',
        icon: <LinkIcon className="h-5 w-5 text-muted-foreground" />,
        indicator: data.total_webhooks > 0 ? (
          <StatusIndicator status="active" size="sm" />
        ) : null,
      },
      {
        title: 'Total Requests',
        value: data.total_requests,
        description: 'Received callbacks',
        icon: <Bell className="h-5 w-5 text-muted-foreground" />,
      },
      {
        title: 'Active Webhooks',
        value: data.active_webhooks,
        description: formatters.pluralize(
          data.active_webhooks, 
          'endpoint', 
          'endpoints'
        ) + ' receiving traffic',
        icon: <ArrowUpRight className="h-5 w-5 text-muted-foreground" />,
        indicator: data.active_webhooks > 0 ? (
          <StatusIndicator status="active" size="sm" pulse />
        ) : null,
      },
    ];
  }, [data]);
  
  if (error) {
    return (
      <Card className="border-destructive/50 bg-destructive/5">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg text-destructive-foreground">Error Loading Data</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center">
            <AlertCircle className="mr-2 h-4 w-4 text-destructive" />
            <p className="text-sm text-muted-foreground">
              Failed to load dashboard statistics.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {isLoading
        ? Array(3)
            .fill(null)
            .map((_, i) => (
              <Card key={i} className={cn("overflow-hidden")}>
                <CardHeader className="pb-2">
                  <Skeleton className="h-5 w-1/3" />
                  <Skeleton className="h-4 w-1/2 mt-1" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-10 w-1/2" />
                </CardContent>
              </Card>
            ))
        : stats?.map((stat, i) => (
            <Card key={i} className="overflow-hidden">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div className="space-y-1">
                  <CardTitle className="text-base">{stat.title}</CardTitle>
                  <CardDescription>{stat.description}</CardDescription>
                </div>
                {stat.icon}
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <div className="text-2xl font-bold">
                    {stat.value.toLocaleString()}
                  </div>
                  {stat.indicator}
                </div>
              </CardContent>
            </Card>
          ))}
    </div>
  );
}