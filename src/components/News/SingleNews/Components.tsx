"use client"
import Link from "next/link";
import { useState } from "react"
import {render} from 'storyblok-rich-text-react-renderer-ts';

import { getStoryblokApi, storyblokEditable } from "@storyblok/react";
import Image from "next/image";
import Pagelink from "@/components/link";
import useSWR from "swr";
import { Skeleton } from "@chakra-ui/react";
import { handleMissingColors } from "@/utils";
import MediaRenderer from '../../MediaComponent'; // Importieren Sie MediaRenderer, falls nicht bereits vorhanden


// export function HeadingsDescription({blok,Colors,SelectedColor}:{blok:any,Colors:any,SelectedColor:any}){
//     const content=blok;
//     const [value,setValue]=useState(0)
//     const [hovered,setHovered]=useState<number|null>(null)
//     return (
//         <>
//             <div className=" flex flex-col-reverse md:flex-row py-[20px] md:py-[40px] px-[30px] lg:px-[64px]" style={{backgroundColor:Colors[0].background_color,color:Colors[0].text_color}} {...storyblokEditable(blok)} id={blok.anchor_id}>
//                 <div className=" flex flex-col gap-[40px] md:w-[70%] w-full max-md:mt-6">
//                     {content.headings.map((h:any)=>(
//                         <div className=" flex flex-col gap-[16px]"  key={h._uid}>
//                             <text className={`text-[${h.textsize}px] font-[${h.fontweight}]`}  id={h.heading} >{h.heading}</text>
//                             <text className=" max-w-none prose text-[21px]" style={{color:Colors[0].text_color}}>{render(h.description)}</text>
//                         </div>
//                     ))}
//                 </div>
//                 <div className=" flex flex-col md:pl-[2em] md:w-[30%] w-full" >
//                     <h4 className="mb-3">Contents</h4>
//                     {
//                         content.headings.map((h:any,index:number)=>{
//                             return (
//                             <Link onMouseOver={()=>setHovered(index)} onMouseLeave={()=>setHovered(null)} onClick={()=>setValue(index)} className={`ml-[${index*20}px] px-[16px] py-[12px]`} style={{backgroundColor:index==value||index==hovered?SelectedColor:""}} href={"#"+h.heading} key={h._uid}>{h.heading}</Link>
//                         )})
//                     }
//                 </div>
                
//             </div>
//         </>
//     )
// }

export function HeadingsDescription({blok,Colors,SelectedColor}:{blok:any,Colors:any,SelectedColor:any}){
    const content = blok;
    const [value, setValue] = useState(0);
    const [hovered, setHovered] = useState<number | null>(null);
  
    return (
      <>
        <div
          className="flex flex-col-reverse md:flex-row py-[20px] md:py-[40px] px-[30px] lg:px-[64px]"
          style={{ backgroundColor: Colors[0].background_color, color: Colors[0].text_color }}
          {...storyblokEditable(blok)} // assuming this is a function that adds props
          id={blok.anchor_id}
        >
          <div className="flex flex-col gap-[40px] md:w-[70%] w-full max-md:mt-6">
            {content.headings.map((h: any) => {
              if (h.component === "Media") {
                return (
                  <div className="h-[300px] md:h-[500px] lg:h-[600px]" key={h._uid}>
                    <MediaRenderer objectFit={h.objectFit} url={h.media.filename} type={h.type} alt={h.media.alt} />
                  </div>
                );
              }
  
              return (
                <div className="flex flex-col gap-[16px]" key={h._uid}>
                  <text className={`text-[${h.textsize}px] font-[${h.fontweight}]`} id={h.heading}>
                    {h.heading}
                  </text>
                  <text className="max-w-none prose text-[21px]" style={{ color: Colors[0].text_color }}>
                    {render(h.description)}
                  </text>
                </div>
              );
            })}
          </div>
          <div className="flex flex-col md:pl-[2em] md:w-[30%] w-full">
            <h4 className="mb-3">Contents</h4>
            {content.headings.map((h: any, index: number) => (
              <Link
                onMouseOver={() => setHovered(index)}
                onMouseLeave={() => setHovered(null)}
                onClick={() => setValue(index)}
                className={`ml-[${index * 20}px] px-[16px] py-[12px]`}
                style={{ backgroundColor: index === value || index === hovered ? SelectedColor : "" }}
                href={"#" + h.heading}
                key={h._uid}
              >
                {h.heading}
              </Link>
            ))}
          </div>
        </div>
      </>
    );
  }


export function DiscoverNews({blok}:{blok:any}){
    const {data,error,isLoading}=useSWR(blok.News,getDataList);
    if(error){
        return <div className="flex text-center min-h-[300px] items-center " style={{backgroundColor:'red',opacity:.5}}>Error</div>
    }
    let {colors}=blok;
    colors=handleMissingColors(colors)
    return(
        <div className=" min-h-screen flex flex-col px-[20px] lg:px-[64px] py-[40px] lg:py-[112px]" style={{backgroundColor:colors[0].background_color,color:colors[0].text_color}} id={blok.anchor_id} {...storyblokEditable(blok)} >
            <text className=" mb-[16px] Text-16 ">{blok.title}</text>
            <h2 className=" mb-[24px] ">{blok.heading}</h2>
            <text className=" mb-[80px]">{blok.overview}</text>
            <Skeleton className=" min-h-[300px]" isLoaded={!isLoading}>
            <div className=" flex flex-wrap gap-5">
                {
                    data&&data.map((news:any)=>(
                        <DiscoverNewsCard link_variant={colors[0].link_variant} tag_color={blok.card_tag_color} tag_text_color={blok.card_tag_text_color} blok={news} key={news.uuid} />
                    ))
                }
            </div>
            </Skeleton>
        </div>
    )
}

export function DiscoverNewsCard({blok,link_variant,tag_color,tag_text_color}:{blok:any,link_variant:string,tag_color:string,tag_text_color:string}){
    
    const {content}=blok;
    return(
        <div className={`flex flex-col md:w-[336px] gap-[24px]`} id={blok.anchor_id}>
            <div className=" relative h-[300px]">
                <Image src={content.image.filename} alt={content.image.alt} fill objectFit="contain"/>
            </div>
            <div className="flex flex-col justify-between">
                <div className=" flex gap-[16px] text-[14px] items-center ">
                    <text className={`py-[4px] px-[8px] `} style={{backgroundColor:tag_color,color:tag_text_color}}>{content.category}</text>
                    <text className=" font-[500]">{content.readtime}</text>
                </div>
                <div className="flex flex-col gap-[8px] mt-4">
                    <h4 className=" ">{content.name}</h4>
                    <text className=" text-[16px] leading-[25.6px] min-h-[200px] mb-4">{content.overview}</text>
                </div>
                <Pagelink url={blok.slug} variant={link_variant} width="200px" />
            </div>
        </div>
    )
}

async function fetchData(uuid:string) {
    const storyblokApi = getStoryblokApi();
    return storyblokApi.get(`cdn/stories/`, { version: "published",by_uuids:uuid});
  }

  export async function getDataList(solutions:string[]){
    const promisList=solutions.map(async(s_uuid:string) =>(await fetchData(s_uuid)).data.stories[0])
      const dataResults = await Promise.all(promisList);
      return dataResults;
  }