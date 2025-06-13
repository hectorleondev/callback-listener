import { Metadata } from 'next';
import { WebhookManager } from '@/features/webhooks/ui/WebhookManager';
import { AppLayout } from '@/components/layouts/AppLayout';

export const metadata: Metadata = {
  title: 'Webhooks - CallbackListener',
  description: 'Manage your webhook endpoints',
};

export default function WebhooksPage() {
  return (
    <AppLayout>
      <WebhookManager />
    </AppLayout>
  );
}