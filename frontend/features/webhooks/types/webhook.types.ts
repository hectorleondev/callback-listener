export interface WebhookPath {
  id: string;
  path_id: string;
  created_at: string;
  updated_at: string;
  request_count: number;
  status: 'active' | 'paused' | 'error';
}

export interface CreateWebhookRequest {
  path_id?: string;
  description?: string;
}

export interface WebhookFilters {
  status: string | null;
  search: string;
  sortBy: 'created_at' | 'request_count' | 'updated_at';
  sortOrder: 'asc' | 'desc';
}