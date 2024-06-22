import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactElement, ReactNode } from 'react';

// https://testing-library.com/docs/react-testing-library/setup#custom-render
export const TestProviders = (props: { children: ReactNode }): ReactElement => {
  const { children } = props;
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false, // fails after the first try, making error tests easier
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
