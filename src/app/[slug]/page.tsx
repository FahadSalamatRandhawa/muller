import { getStoryblokApi } from "@storyblok/react";
//import { render } from "storyblok-rich-text-react-renderer";
import {render} from 'storyblok-rich-text-react-renderer-ts';

import type { Metadata, ResolvingMetadata } from 'next'
import { returnMetaData } from "@/utils";

type Props = {
    params: { slug: string }
    searchParams: { [key: string]: string | string[] | undefined }
  }
  
export async function generateMetadata({params,searchParams}:Props,parent:ResolvingMetadata):Promise<Metadata>{
  const {data}= await fetchData(params.slug);
  const {meta_data}=data.stories[0].content
  
  return returnMetaData(meta_data)
}

export default async function Page({params:{slug}}:{params:{slug:any}}){
    //console.log(slug)
    const {data}=await fetchData(slug)
    const story=data.stories[0]
    console.log("Fetched story:", story); // Log the entire story object

    if (!story || !story.content || !story.content.pagedata) {
      console.error("Error: Missing required data in story object.");
      return null; // Or render an error message
    }
    
    return(
        <div className="px-[20px] py-[40px] py-[112px] lg:pt-[250px] lg:pb-[100px] normal-page bg-[#eee]">
          <div className="lg:max-w-[70%] m-auto normal-page bg-[#eee]">
          {story.content && story.content.pagedata && render(story.content.pagedata)}
            </div>
        </div>
    )
}

async function fetchData(slug:string) {
    const storyblokApi = getStoryblokApi();
    return storyblokApi.get(`cdn/stories/`, { version: "published",by_slugs:slug});
  }
