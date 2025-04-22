import { unauthorizedAxios } from "@/client/axios";
import ENDPOINTS from "@/client/endpoints";
import PreviewComponent from "@/page-components/Preview/PreviewComponent";

export async function generateMetadata({ params }, parent){
    const { id } = await params;

    // const res = await unauthorizedAxios.get(`${ENDPOINTS.GET_SHARE_DETAILS}/${id}`);
    // const titleData = res.data;
    let baseUrl
    if (process.env.NODE_ENV === 'production') {
        baseUrl = process.env.NEXT_PUBLIC_PRODUCTION_BASE_URL;
    } else {
        baseUrl = process.env.NEXT_PUBLIC_STAGING_BASE_URL
    }
    // const baseUrl = process.env.NEXT_PUBLIC_DEV_BASE_URL

    const res = await fetch (`${baseUrl}${ENDPOINTS.GET_SHARE_DETAILS}/${id}`);
    if (!res.ok) throw new Error("Failed to fetch share details")
    
        
    const titleData = await res.json()
    if (!titleData) return
    
    const siteUrl = `${process.env.NEXT_PUBLIC_SITE_URL}`;
    const imageUrl = new URL(titleData.image, siteUrl).href
    

    return {
        metadataBase: siteUrl,
        title: `${titleData.title} | Genti Audio`,
        description: `Listen to ${titleData.title} by ${titleData.author} on Genti Audio. Stream African stories, audio dramas, and podcasts.`,
        openGraph: {
            title: `${titleData.title} | Genti Audio`,
            description: `Listen to ${titleData.title} ${titleData.author} on Genti Audio. Stream African stories, audio dramas, and podcasts.`,
            url: `${siteUrl}/preview/${id}`,
            images: [
                {
                    url: imageUrl,
                    width: 1200,
                    height: 630,
                    alt: `${titleData.title} | Genti Audio` || 'Genti Audio'
                }
            ]
        },
        twitter: {
            card: `summary_large_image`,
            title: `${titleData.title} | Genti Audio` || 'Genti Audio',
            description: `Listen to ${titleData.title} by ${titleData.author} on Genti Audio. Stream African stories, audio dramas, and podcasts.`,
            images: [imageUrl]
        }
    }
}

const PreviewPage = async ({params}) => {
    const { id } = await params;

    const res = await unauthorizedAxios.get(`${ENDPOINTS.GET_SHARE_DETAILS}/${id}`);
    const titleData = res.data;

    return (
        <PreviewComponent data={titleData} />
    )
}

export default PreviewPage