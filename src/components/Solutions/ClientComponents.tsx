"use client"

import { AnimateFromBelowComponent, AnimateFromFarRightComponent } from "@/AnimationUtils";
import { handleMissingColors } from "@/utils";
import { Skeleton } from "@chakra-ui/react";
import { getStoryblokApi, storyblokEditable } from "@storyblok/react";
import Image from "next/image"
import Link from "next/link";
import { useRef } from "react";
import { useInView } from "framer-motion";
import { BiLeftArrowAlt, BiRightArrowAlt } from "react-icons/bi"


import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import useSWR from "swr";
import { DiscoverNews } from "../News/SingleNews/Components";

const responsiveSettings = [
    {
        breakpoint: 1900,
        settings: {
            slidesToShow: 3,
            slidesToScroll: 1
        }
    },
    {
        breakpoint: 1200,
        settings: {
            slidesToShow: 3,
            slidesToScroll: 1
        }
    },
    {
        breakpoint: 700,
        settings: {
            slidesToShow: 2,
            slidesToScroll: 1
        }
    },{
        breakpoint: 400,
        settings: {
            slidesToShow: 1,
            slidesToScroll: 1
        }
    }
];

export default function Premade_Slider ({blok}:{blok:any}){
    const ref=useRef(null);
    const isInView=useInView(ref,{once:true})

  let {colors}=blok;
    colors=handleMissingColors(colors)
  
    const props={
        prevArrow:<button className=" flex w-[48px] h-[48px] rounded-full border-[1px] items-center justify-center" style={{borderColor:colors[0].border_color,color:colors[0].border_color}}>
        <div className=" scale-150"><BiLeftArrowAlt /></div>
    </button>,
        nextArrow:<button className=" flex w-[48px] h-[48px] rounded-full border-[1px] items-center justify-center" style={{borderColor:colors[0].border_color,color:colors[0].border_color}}>
        <div className=" scale-150"><BiRightArrowAlt/></div>
    </button>,
    }


    const { data, error, isLoading }=useSWR(blok.solutions,getDataList)
  if(isLoading){
    return(
      <div ref={ref} className=" flex gap-[20px] overflow-hidden">
        <Skeleton isLoaded={!isLoading} fitContent={true}  > 
      <div className=' flex flex-col h-[310px] w-[304px]' key={blok.uuid} >
      
        </div>
    </Skeleton>
      <Skeleton isLoaded={!isLoading} fitContent={true}  > 
      <div className=' flex flex-col h-[310px] w-[304px]' key={blok.uuid} >
      
        </div>
    </Skeleton>
    <Skeleton isLoaded={!isLoading} fitContent={true}  > 
      <div className=' flex flex-col h-[310px] w-[304px]' key={blok.uuid} >
      
        </div>
    </Skeleton>
      </div>
    )
  }
  if(error){
    return <div>Error .....</div>
  }

  
    return (
        <div ref={ref} className="flex flex-col lg:px-[64px] py-[40px] lg:py-[112px] gap-[40px] md:gap-[80px] px-2.5" style={{backgroundColor:colors[0].background_color,color:colors[0].text_color}} id={blok.anchor_id} {...storyblokEditable(blok)} >
            {
                isInView&&
                <AnimateFromBelowComponent className="">
                <div className="flex flex-col gap-[16px] mb-[40px] py-[1em]">
                <text>{blok.title}</text>
                <h3 className="">{blok.heading}</h3>
                <div className="flex flex-col md:flex-row px-2 justify-between gap-[10px]">
                    <text>{blok.overview}</text>
                    <Link href={blok.button_link.fieldtype=="story"?blok.button_link.cached_url:blok.button_link.url} className=" max-w-[150px] md:w-auto px-[24px] py-[12px] border-b hidden" style={{borderBottomColor:colors[0].border_color}}>
                    {blok.button_text}
                    </Link>
                </div>
                </div>
                </AnimateFromBelowComponent>
            }
           {
            isInView&&
            <AnimateFromFarRightComponent className="">
                 <Slide indicators={(index)=><div className=" indicator gap-10"></div>} {...props} autoplay={false} responsive={responsiveSettings} >
                {
                    isInView&&data&&data.map((s:any)=>{
                        const stop=s.content.blocks.filter((b:any)=>b.component=="stop")[0]
                    return (
                        <div className=" flex w-full justify-center h-full p-6" key={s.uuid}>
                            <div className=" flex w-full max-w-[500px] flex-col gap-4 justify-between ">
                            <div className=" relative h-[400px] " style={{backgroundPosition:"center"}}>
                                <Image src={s.content.cardimage?s.content.cardimage.filename:''} alt={s.content.cardimage?s.content.cardimage.alt:""} fill objectFit="cover" />
                            </div>
                            <div className="flex flex-col justify-between gap-6 px-5">
                                <div className=" grid grid-cols-1 gap-4">
                                    <h4 className=" ">{stop.heading}</h4>
                                    <text className=" text-[16px]">{stop.description}</text>
                                </div>
                                <Link href={"/"+s.full_slug} className=" text-center text-[18px] font-[500] leading-[28.8px] border-b py-2 " style={{borderColor:colors[0].border_color}}>{blok.Card_Button_Text}</Link>
                            </div>
                         </div>
                        </div>
                    )})
                }
            </Slide>
            </AnimateFromFarRightComponent>
           }
        </div>
    );
};


async function fetchData(s_uuid:any) {
    const storyblokApi = getStoryblokApi();
    return storyblokApi.get(`cdn/stories/`, { version: "published", by_uuids:s_uuid});
  }
  
  async function getDataList(solutions:string[]){
    const promisList=solutions.map(async(s_uuid:string) =>(await fetchData(s_uuid)).data.stories[0])
      const dataResults = await Promise.all(promisList).then((data)=>{return data});
      return dataResults;
  }