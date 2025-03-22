'use client';

import { BarChart2 } from 'lucide-react';

interface EmptyStateProps {
  message?: string;
}

export default function EmptyState({ message = 'No data available' }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center space-y-2 text-center text-muted-foreground">
      <BarChart2 className="size-6" />
      <p className="text-sm">{message}</p>
    </div>
  );
}
