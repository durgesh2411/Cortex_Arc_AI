'use client';

import type { QueryClient } from '@tanstack/react-query';
import { QueryClientProvider } from '@tanstack/react-query';
import { createTRPCReact } from '@trpc/react-query';
import { httpBatchLink } from '@trpc/client';
import { useState } from 'react';
import { makeQueryClient } from './query-client';
import type { AppRouter } from './routers/_app';

export const trpc = createTRPCReact<AppRouter>();

export function useTRPC() {
  return { trpc };
}

let browserQueryClient: QueryClient;

function getQueryClient() {
  if (typeof window === 'undefined') {
    // Server: always make a new query client
    return makeQueryClient();
  }
  // Browser: make a new query client if we don't already have one
  // This is very important, so we don't re-make a new client if React
  // suspends during the initial render. This may not be needed if we
  // have a suspense boundary BELOW the creation of the query client
  if (!browserQueryClient) browserQueryClient = makeQueryClient();
  return browserQueryClient;
}

function getUrl() {
  const base = (() => {
    if (typeof window !== 'undefined') return '';
    return process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000';
  })();
  return `${base}/api/trpc`;
}

export function TRPCReactProvider(
  props: Readonly<{
    children: React.ReactNode;
  }>,
) {
  const queryClient = getQueryClient();
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: getUrl(),
        }),
      ],
    }),
  );

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        {props.children}
      </QueryClientProvider>
    </trpc.Provider>
  );
}
