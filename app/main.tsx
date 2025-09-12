"use client";

// import Context from "@/app/context";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retryDelay: (attempIndex) => Math.min(1000 * 2 ** attempIndex, 30000),
    },
  },
});

const Main = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default Main;
