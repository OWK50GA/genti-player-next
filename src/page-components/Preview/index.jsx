'use client'

import { useQuery } from "@tanstack/react-query";
import PreviewComponent from "./PreviewComponent";
import Client from "../../client";
import { useParams, usePathname } from "next/navigation";

export default function PreviewPage(){

    // const [previewAudio, setPreviewAudio] = useState()
    const location = usePathname()

    const params = useParams();
    const { id } = params



    const {
        data: guestTitle, 
        isLoading: fetchIsLoading, 
        isFetching, 
        isError
    } = useQuery({
            queryKey: ['get-share-details', id], // Include id in query key
            queryFn: async () => {
                const response = await Client.preview.get_share_details(id)
                const data = response?.data
                // console.log(data)
                // setPreviewAudio(data?.preview)
                return data
            },
            enabled: !!id, // Only fetch when id is available
            refetchOnWindowFocus: false // Prevent unnecessary refetches
        }
    )

    // Construct meta description from title data
    const getMetaDescription = (data) => {
        if (!data) return "";
        const author = data.author ? `by ${data.author}` : "";
        return `Listen to ${data.title} ${author} on Genti Audio. Stream African stories, audio dramas, and podcasts.`;
    };

    return (
        <div>
            <Helmet>
                {/* Basic meta tags */}
                <title>{guestTitle?.title ? `${guestTitle.title} | Genti Audio` : 'Genti Audio'}</title>
                <meta name="description" content={getMetaDescription(guestTitle)} />

                {/* Open Graph meta tags */}
                <meta property="og:title" content={guestTitle?.title ? `${guestTitle.title} | Genti Audio` : 'Genti Audio'} />
                <meta property="og:description" content={getMetaDescription(guestTitle)} />
                <meta property="og:image" content={guestTitle?.image || '/logo.svg'} />
                {/* <meta property="og:url" content={`${window.location.origin}/title/${id}`} /> */}
                <meta property="og:type" content="website" />
                <meta property="og:site_name" content="Genti Audio" />

                {/* Twitter Card meta tags */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={guestTitle?.title ? `${guestTitle.title} | Genti Audio` : 'Genti Audio'} />
                <meta name="twitter:description" content={getMetaDescription(guestTitle)} />
                <meta name="twitter:image" content={guestTitle?.image || '/logo.svg'} />

                
            </Helmet>
           
            <PreviewComponent data={guestTitle} />
        </div>
    )
}