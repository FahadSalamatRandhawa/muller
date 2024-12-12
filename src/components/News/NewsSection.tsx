import { AnimateFromBelowComponent, AnimateFromFarRightComponent, AnimateFromLeftComponent } from "@/AnimationUtils";
import { Skeleton, SkeletonText } from "@chakra-ui/react";
import { getStoryblokApi, storyblokEditable } from "@storyblok/react";
import { useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import useSWR from "swr";

export default function NewsSection({blok}:{blok:any}) {
    const ref=useRef(null);
    const isInView=useInView(ref,{once:true,margin:"-10px"});
    const {colors}=blok;
    const button=blok.button[0]

    const {data,error,isLoading}=useSWR(blok.newslist,getDataList)
    
    if(error){
        <div>Error ....</div>
    }
    
    return(
        
            <div ref={ref} className=" flex flex-col py-[40px] lg:py-[112px] px-[20px] lg:px-[64px] gap-[80px]" style={{backgroundColor:colors[0].background_color,color:colors[0].text_color}} id={blok.anchor_id} {...storyblokEditable(blok)}>
            <div className=" flex flex-col gap-[16px]">
                {
                    isInView&&
                    <AnimateFromLeftComponent className="">
                        <text>{blok.title}</text>
                    </AnimateFromLeftComponent>
                }
                
                <div className=" flex justify-between ">
                    {
                        isInView&&
                        <AnimateFromBelowComponent className=" flex flex-col w-3/4">
                            <div >
                                <h2 className=" ">{blok.heading}</h2>
                                <p className=" mt-2">{blok.overview}</p>
                            </div>
                        </AnimateFromBelowComponent>
                    }
                    {
                        isInView&&
                        <AnimateFromBelowComponent className="hidden">
                            <Link href={button.link.url} className=" self-end px-[24px] py-[12px] border-b-[1px]" style={{borderBottomColor:button.button_border_color}}>{button.text}</Link>
                        </AnimateFromBelowComponent>
                    }
                </div>
            
            </div>
            <Skeleton className=" min-h-[300px]" isLoaded={!isLoading}>
            <div className=" flex justify-center flex-wrap gap-5">
                {
                    isInView&&data&&data.map((news)=>(
                        <AnimateFromFarRightComponent className="">
                            <NewsCard tag_color={blok.card_tag_color} tag_text_color={blok.card_tag_text_color} blok={news} key={news.uuid} />
                        </AnimateFromFarRightComponent>
                    ))
                }
            </div>
            </Skeleton>
        </div>
        
    )
}

export function NewsCard({blok,tag_color,tag_text_color}:{blok:any,tag_color:string,tag_text_color:string}){
    
    const {content}=blok;
    
    return(
        <Link href={"News/"+blok.slug} target="_self">
        <div className={`flex flex-col w-full md:w-[336px] gap-[24px] mb-5`}>
            <div className=" relative h-[300px]">
                <Image src={content.image.filename} alt={content.image.alt} objectFit="contain" fill />
            </div>
            <div className=" flex gap-[16px] text-[DM Mono] text-[14px] items-center ">
                <text className={`py-[4px] px-[8px]`} style={{backgroundColor:tag_color,color:tag_text_color}}>{content.category}</text>
                <text className=" font-[500]">{content.readtime}</text>
            </div>
            <div className="flex flex-col gap-[8px]">
                <h4 className=" ">{content.name}</h4>
                <p className=" text-[16px] leading-[25.6px]">{content.overview}</p>
            </div>
        </div></Link>
    )
}

async function fetchData(uuid:string) {
    const storyblokApi = getStoryblokApi();
    return storyblokApi.get(`cdn/stories/`, { version: "published",by_uuids:uuid});
  }
  
  async function getDataList(list:string[]){
    const promisList=list.map(async(s_uuid:string) =>(await fetchData(s_uuid)).data.stories[0])
      const dataResults = await Promise.all(promisList).then((data)=>{return data});
      //console.log(dataResults)
      return dataResults;
  }