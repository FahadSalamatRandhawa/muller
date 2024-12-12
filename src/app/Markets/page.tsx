import STop from "@/components/CommonComponents/stop";
import { returnMetaData } from "@/utils";
import { StoryblokComponent, getStoryblokApi } from "@storyblok/react";
import StoryblokStory from "@storyblok/react/story";

import { Metadata, ResolvingMetadata } from "next";
type Props = {
    params: { slug: string }
    searchParams: { [key: string]: string | string[] | undefined }
  }
  
export const generateMetadata=async():Promise<Metadata>=>{
  const {data}=await fetchData()
  const {meta_data}=data.story.content
  
  return returnMetaData(meta_data)
}

export default async function Markets(){
    console.log("Markets Page")
    const {data}=await fetchData()
    //console.log(data)
    return(
        <>
            <StoryblokStory story={data.story} />
        </>
    )
}

async function fetchData() {
    const storyblokApi = getStoryblokApi();
    return storyblokApi.get(`cdn/stories/Markets/`, { version: "published" });
  }
//   import { returnMetaData } from "@/utils";
// import { getStoryblokApi } from "@storyblok/react";
// import StoryblokStory from "@storyblok/react/story";

// import { Metadata, ResolvingMetadata } from "next";
// type Props = {
//     params: { slug: string }
//     searchParams: { [key: string]: string | string[] | undefined }
//   }
  
// export async function generateMetadata({params,searchParams}:Props,parent:ResolvingMetadata):Promise<Metadata>{
//   const {data}= await fetchData();
//   const {meta_data}=data.story.content
  
//   return returnMetaData(meta_data)
// }

// export default async function Markets() {
//     const {data}=await fetchData()

//     return(
//         <>
//             <StoryblokStory story={data.story} />
//         </>
//     )
// }

// async function fetchData() {
//     const storyblokApi = getStoryblokApi();
//     return storyblokApi.get(`cdn/stories/Markets/`, { version: "published" });
//   }