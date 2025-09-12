"use client";

import {
  Blog,
  Hero,
  News,
  About,
  Partners,
  Categories,
} from "@/app/components";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retryDelay: (attempIndex) => Math.min(1000 * 2 ** attempIndex, 30000),
    },
  },
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Hero />
      <About />
      <Categories />
      <News />
      <Blog />
      <Partners />
    </QueryClientProvider>
  );
};

export default App;
