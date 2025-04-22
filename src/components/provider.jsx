'use client'

import { QueryClient, QueryClientProvider, isServer } from "@tanstack/react-query"
import { GoogleOAuthProvider } from '@react-oauth/google'

function makeQueryClient(){
    return new QueryClient({
        defaultOptions: {
            queries: {
                staleTime: 60 * 1000
            }
        }
    })
}

let browserQueryClient = undefined

function getQueryClient(){
    if (isServer) {
        return makeQueryClient();
    } else {
        if (!browserQueryClient) browserQueryClient = makeQueryClient();
        return browserQueryClient
    }
}


export default function ClientProviders( { children } ){
    
    const queryClient = new getQueryClient();

    return (
        <>
            <QueryClientProvider client={queryClient}>
                <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENTID}>
                    {children}
                </GoogleOAuthProvider>
            </QueryClientProvider>
        </>
    )
}