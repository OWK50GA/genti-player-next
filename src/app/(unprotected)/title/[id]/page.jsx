import { unauthorizedAxios } from "@/client/axios";
import ENDPOINTS from "@/client/endpoints";
import PreviewComponent from "@/page-components/Preview/PreviewComponent";

export const dynamic = "force-dynamic"
export const revalidate = 0

export async function generateMetadata({ params }, parent){
    const { id } = await params;

    // const res = await unauthorizedAxios.get(`${ENDPOINTS.GET_SHARE_DETAILS}/${id}`);
    // const titleData = res.data;

    const res = await fetch(`${ENDPOINTS.GET_SHARE_DETAILS}/${id}`,
        { cache: 'no-store' }
    );
    if (!res.ok) throw new Error("Failed to fetch share details")
    
    const titleData = await res.json();
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
    const imageUrl = new URL(titleData.image, siteUrl).href;

    if (!titleData) return

    return {
        metadataBase: new URL(siteUrl),
        title: `${titleData?.title} | Genti Audio`,
        description: `Listen to ${titleData?.title} by ${titleData?.author} on Genti Audio. Stream African stories, audio dramas, and podcasts.`,
        openGraph: {
            title: `${titleData.title} | Genti Audio`,
            description: `Listen to ${titleData?.title} by ${titleData?.author} on Genti Audio. Stream African stories, audio dramas, and podcasts.`,
            url: `${siteUrl}/preview/${id}`,
            images: [
                {
                    url: imageUrl,
                    width: 1200,
                    height: 630,
                    alt: `${titleData?.title} | Genti Audio`
                }
            ]
        },
        twitter: {
            card: `summary_large_image`,
            title: `${titleData.title} | Genti Audio`,
            description: `Listen to ${titleData?.title} by ${titleData?.author} on Genti Audio. Stream African stories, audio dramas, and podcasts.`,
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