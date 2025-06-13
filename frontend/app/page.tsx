import { Metadata } from 'next';
import { Suspense } from 'react';
import { DashboardContent } from '@/features/dashboard/ui/DashboardContent';
import { AppLayout } from '@/components/layouts/AppLayout';

export const metadata: Metadata = {
  title: 'Dashboard - CallbackListener',
  description: 'Monitor and manage your webhooks',
};

export default function DashboardPage() {
  return (
    <AppLayout>
      <Suspense fallback={<DashboardSkeleton />}>
        <DashboardContent />
      </Suspense>
    </AppLayout>
  );
}

function DashboardSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="h-8 w-64 bg-muted rounded-md"></div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {Array(4).fill(0).map((_, i) => (
          <div key={i} className="h-32 bg-muted rounded-lg"></div>
        ))}
      </div>
      <div className="h-64 bg-muted rounded-lg"></div>
    </div>
  );
}