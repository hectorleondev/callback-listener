'use client';

import { useFormStatus } from 'react-dom';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { useCreateWebhook } from '../hooks/useWebhookOperations';

export function CreateWebhookForm() {
  const createMutation = useCreateWebhook();
  
  const handleSubmit = async (formData: FormData) => {
    await createMutation.mutateAsync(formData);
  };
  
  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl">Create New Webhook</CardTitle>
      </CardHeader>
      <CardContent>
        <form action={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="path_id">Custom Path ID (Optional)</Label>
            <Input
              id="path_id"
              name="path_id"
              placeholder="my-custom-webhook"
              className="w-full"
            />
            <p className="text-sm text-muted-foreground">
              Leave empty to auto-generate a unique ID
            </p>
          </div>
          <div className="flex items-center justify-end space-x-2">
            <Button type="reset" variant="outline">
              Reset
            </Button>
            <SubmitButton />
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  
  return (
    <Button 
      type="submit" 
      disabled={pending}
    >
      {pending ? 'Creating...' : 'Create Webhook'}
    </Button>
  );
}