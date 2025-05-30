// app/providers.tsx
'use client'

import FontFamily from '@/contants/Rapper/FontFamily'
import { CacheProvider } from '@chakra-ui/next-js'
import { ChakraProvider } from '@chakra-ui/react'

export function ChrakaLayout({ children }: { children: React.ReactNode }) {
  return (
    <CacheProvider>
      
      <ChakraProvider theme={FontFamily}>{children}</ChakraProvider>
    </CacheProvider>
  )
}