import AppLayout from "@/components/Layout/App";
import ClientProviders from "@/components/provider";

export default function ProtectedRootLayout({children}){

    return (
        <>
            {/* <ClientProviders> */}
                <AppLayout>
                    {children}
                </AppLayout>
            {/* </ClientProviders> */}
        </>
    )
}