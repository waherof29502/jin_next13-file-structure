'use client';

import { Icons } from '@/components/icons';
import { useClerk } from '@clerk/nextjs';
import { type HandleOAuthCallbackParams } from '@clerk/types';
import React, { useEffect } from 'react';

interface SSOCallbackPageProps {
  searchParams: HandleOAuthCallbackParams;
}
export default function SSOCallback({ searchParams }: SSOCallbackPageProps) {
  const { handleRedirectCallback } = useClerk();
  useEffect(() => {
    void handleRedirectCallback(searchParams);
  }, [searchParams, handleRedirectCallback]);
  return (
    <div
      role="status"
      aria-label="Loading"
      aria-describedby="loading-description"
      className="flex items-center justify-center"
    >
      <Icons.spinner className="h-16 w-16 animate-spin" aria-hidden="true" />
    </div>
  );
}
