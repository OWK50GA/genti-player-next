import { unauthorizedAxios } from "@/client/axios";
import ENDPOINTS from "@/client/endpoints";
import { Metadata, ResolvingMetadata } from 'next'
import PreviewComponent from "@/pages/Preview/PreviewComponent";

export async function generateMetadata({ params }, parent){
    const { id } = await params;

    const res = await unauthorizedAxios.get(`${ENDPOINTS.GET_SHARE_DETAILS}/${id}`);
    const titleData = res.data;

    if (!titleData) return

    return {
        title: `${titleData.title} | Genti Audio` || 'Genti Audio',
        description: `Listen to ${titleData.title} by ${titleData.author} on Genti Audio. Stream African stories, audio dramas, and podcasts.`,
        openGraph: {
            title: `${titleData.title} | Genti Audio` || 'Genti Audio',
            description: `Listen to ${titleData.title} ${titleData.author} on Genti Audio. Stream African stories, audio dramas, and podcasts.`,
            images: [
                {
                    url: `${titleData.image}` || '/logo.svg',
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
            images: [titleData.image]
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