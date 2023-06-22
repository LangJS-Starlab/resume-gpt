"use client"

import React from "react"
import { QueryClient, QueryClientProvider, QueryClientProviderProps } from "react-query"

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    }
  }
})

export function ReactQueryClientProvider({ children,  ...props }: Omit<QueryClientProviderProps, 'client'>) {
  return (
    <QueryClientProvider {...props} client={queryClient}>
      {children}
    </QueryClientProvider>
  )
}
