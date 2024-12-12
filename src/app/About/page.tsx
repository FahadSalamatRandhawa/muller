import { returnMetaData } from "@/utils";
import { getStoryblokApi } from "@storyblok/react";
import StoryblokStory from "@storyblok/react/story";

import { Metadata, ResolvingMetadata } from "next";
type Props = {
    params: { slug: string }
    searchParams: { [key: string]: string | string[] | undefined }
  }
  
export const generateMetadata=async():Promise<Metadata>=>{
  const {data}= await fetchData();
  const {meta_data}=data.story.content
  
  return returnMetaData(meta_data)
}

export default async function Aboutus() {
    const {data}=await fetchData()
    //console.log(data)
    return(
        <StoryblokStory story={data.story} />
    )
}

async function fetchData() {
    const storyblokApi = getStoryblokApi();
    return storyblokApi.get(`cdn/stories/About`, { version: "published"});
  }