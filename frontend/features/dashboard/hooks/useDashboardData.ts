'use client';

import { useQuery } from '@tanstack/react-query';
import { clientDashboardService } from '@/lib/services/client-api.service';

export function useDashboardStats() {
  return useQuery({
    queryKey: ['dashboard-stats'],
    queryFn: async () => {
      const result = await clientDashboardService.getStats();
      
      if (!result.success) {
        throw new Error(result.error);
      }
      
      return result.data;
    },
    staleTime: 1000 * 60, // 1 minute
  });
}