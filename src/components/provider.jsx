'use client'

import { QueryClient, QueryClientProvider } from "react-query"
import { GoogleOAuthProvider } from '@react-oauth/google'

export default function ClientProviders( { children } ){

    const queryClient = new QueryClient()

    return (
        <>
            <QueryClientProvider client={queryClient}>
                <GoogleOAuthProvider>
                    {children}
                </GoogleOAuthProvider>
            </QueryClientProvider>
        </>
    )
}