import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dashboard - CallbackListener',
  description: 'Monitor and manage your webhooks',
};

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-8">
        <h1 className="text-3xl font-bold tracking-tight mb-6">
          CallbackListener Dashboard
        </h1>
        
        <div className="grid gap-6 md:grid-cols-3">
          <div className="p-6 bg-card border rounded-lg">
            <h2 className="text-xl font-semibold mb-2">Total Webhooks</h2>
            <p className="text-3xl font-bold text-primary">0</p>
          </div>
          
          <div className="p-6 bg-card border rounded-lg">
            <h2 className="text-xl font-semibold mb-2">Total Requests</h2>
            <p className="text-3xl font-bold text-primary">0</p>
          </div>
          
          <div className="p-6 bg-card border rounded-lg">
            <h2 className="text-xl font-semibold mb-2">Active Webhooks</h2>
            <p className="text-3xl font-bold text-primary">0</p>
          </div>
        </div>
        
        <div className="mt-8 p-6 bg-card border rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
          <p className="text-muted-foreground">No recent activity</p>
        </div>
        
        <div className="mt-8 flex gap-4">
          <a
            href="/webhooks"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          >
            Create Webhook
          </a>
          <a
            href={`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001'}/docs`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-md border px-4 py-2 text-sm font-medium hover:bg-accent"
          >
            API Documentation
          </a>
        </div>
        
        <div className="mt-8 p-4 bg-muted rounded-lg">
          <h3 className="font-semibold mb-2">Quick Start</h3>
          <ol className="list-decimal list-inside space-y-1 text-sm">
            <li>Create a new webhook endpoint</li>
            <li>Start sending HTTP requests to your webhook URL</li>
            <li>Monitor requests in real-time on this dashboard</li>
          </ol>
        </div>
      </div>
    </div>
  );
}
