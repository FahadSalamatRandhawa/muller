import Image from "next/image"
import Pagelink from "../link"
import { storyblokEditable } from "@storyblok/react"
import { ReactCompareSlider, ReactCompareSliderImage } from 'react-compare-slider';

export function AboutTop({blok}:{blok:any}){
    let {heading_tags}=blok;
    
    return(
        <div className=" relative flex flex-col w-full bg-[#eeeeee] h-600px lg:h-[650px] xl:h-[800px] text-white" id={blok.anchor_id} {...storyblokEditable(blok)}>
            <div className=" flex flex-col z-30 gap-[20px] mx-[20px] mb-[20px] lg:mb-[32px]">
                <AnimateFromBelowComponent className=" md:w-[40%] text-[#00918E] ">
                <h2 >{blok.title}</h2>
                </AnimateFromBelowComponent>
                <AnimateFromBelowComponent className=" md:w-[40%] self-end mb-3 " >
                <p >{blok.overview}</p>
                </AnimateFromBelowComponent>
            </div>
            <div className=" absolute w-[100%] h-[90%] mt-24">
                <ReactCompareSlider className=" absolute w-[100%] h-[100%]  "
                    itemOne={<MediaRenderer objectFit={blok.objectFit} muted={true} type={blok.leftmedia[0].type} url={blok.leftmedia[0].media.filename} alt={blok.leftmedia[0].media.alt} />}
                    itemTwo={<MediaRenderer objectFit={blok.objectFit} muted={true} type={blok.rightmedia[0].type} url={blok.rightmedia[0].media.filename} alt={blok.rightmedia[0].media.alt} />}
                    />
            </div>
            {/**Dark overlay <div className=" w-[100%] h-[100%] bg-black/30 absolute z-20 "></div> */}
        </div>
    )
}

export function Philosophy({blok}:{blok:any}){
    const ref=useRef(null);
    const isInView=useInView(ref,{once:true,margin:'-1px'})
    let {colors}=blok;
    colors=handleMissingColors(colors)
    return(
        <div ref={ref} className=" min-h-screen flex flex-col py-[10px] px-[15px] lg:px-0 lg:pl-[32px] xl:pl-[5%] lg:pr-[72px] xl:pr-[10%] " style={{backgroundColor:colors[0].background_color,color:colors[0].text_color}} id={blok.anchor_id} {...storyblokEditable(blok)}>
                {
                    isInView&&
                    <AnimateFromBelowComponent className=" mt-[10px] md:mt-[20px] lg:mt-[40px] xl:mt-[70px]">
                        <text style={{color:colors[0].text_color}}>{blok.title}</text>
                    </AnimateFromBelowComponent>
                }
                <div className=" flex flex-col justify-between lg:flex-row mt-[10px] md:mt-[30px] lg:mt-[68px] xl-[200px]">
                    {
                        isInView&&
                        <AnimateFromLeftComponent className="lg:w-[40%]">
                            <h2>{blok.heading}</h2>
                        </AnimateFromLeftComponent>
                    }
                    {
                        isInView&&
                        <AnimateFromBelowComponent className=" lg:w-[40%] mt-[5%] ">
                            <text>{blok.description}</text>
                        </AnimateFromBelowComponent>
                    }
                </div>
            </div>
    )
}

export function History({blok}:{blok:any}){
    const ref=useRef(null);
    const isInView=useInView(ref,{once:true})
    let {colors}=blok;
    colors=handleMissingColors(colors)
    const link=blok.link;
    const images=blok.images;
    return(
        <div ref={ref} className=" min-h-screen lg:p-none px-[1em] md:px-[3em] xl:px-[5em] py-[4em] md:py-[6em] lg:py-[8em] flex flex-col gap-[20px] md:gap-[40px] lg:gap-[80px] xl:gap-[120px]" style={{backgroundColor:colors[0].background_color,color:colors[0].text_color}} id={blok.anchor_id} {...storyblokEditable(blok)}>
                {
                    isInView&&
                    <AnimateFromBelowComponent className="">
                        <text >{blok.title}</text>
                    </AnimateFromBelowComponent>
                }
                <div className=" flex flex-col gap-[20px] lg:gap-0 lg:flex-col lg:justify-between">
                    {
                        isInView&&
                        <AnimateFromLeftComponent className="  lg:w-[100%] ">
                            <div  className=" flex flex-col gap-[10px] md:gap-[20px] lg:gap-[32px] xl:gap-[50px] mb-[60px]">
                                <h2 className=" ">{blok.heading}</h2>
                                {link && link.length > 0 && link[0].url && link[0].url.url && (
                                    <Pagelink url={link[0].url.url} text={link[0].Label} variant={colors[0].link_variant} />
                                )}
                            </div>
                        </AnimateFromLeftComponent>
                    }
                    <div className=" lg:w-[80%] flex flex-col gap-[29px] m-auto ">
                        {blok.historyevents.map((event:any,index:number)=>(
                        <>
                            {
                                isInView&&
                                <AnimateFromBelowComponent className=" flex flex-col gap-[16px]">
                                    <div  key={event._uid} >
                                    <div className=" flex gap-[20px] md:gap-[40px]  ">
                                        <Image src={blok.icon.filename} width={48} height={48} alt={blok.icon.alt}/>
                                        <h4 className=" ">{event.heading}</h4>
                                    </div>
                                    <div className=" flex gap-[20px] ">
                                        <div className="flex flex-col md:flex-row w-full justify-between">
                                        <text className={` flex justify-center ml-[24px] pl-[40px] pt-3 w-full max-w-[500px] items-center`} style={{borderLeft:index==blok.historyevents.length-1?"":`2px solid ${colors[0].border_color}`}}>{event.description}</text>
                                        {event.image.filename&&<Image src={event.image.filename} className="w-full max-w-[500px] max-md:mt-4 md:ml-4" priority width={400} height={400} alt={event.image.alt}/>}
                                        </div>

                                    </div>
                                </div>
                                </AnimateFromBelowComponent>
                            }
                        </>
                        ))}
                    </div>
                </div>
            </div>
    )
}


import MediaRenderer  from "../MediaComponent"
import {  handleMissingColors } from "@/utils";
import { AnimateFromBelowComponent, AnimateFromLeftComponent, AnimateFromRightComponent, AnimateMultipleFromBelow, AppearFromBelow } from "@/AnimationUtils";
import { useRef } from "react";
import { useInView } from "framer-motion";

export function Achievements({blok}:{blok:any}){
    const ref=useRef(null);
    const isInView=useInView(ref,{once:true})
    let {colors}=blok;
    colors=handleMissingColors(colors)
    return(
        <div ref={ref} className=" flex flex-col md:max-lg:min-h-screen pb-[100px] xl:pb-[200px] px-[20px] lg:px-[61px] py-[34px] " style={{backgroundColor:colors[0].background_color,color:colors[0].text_color}} id={blok.anchor_id} {...storyblokEditable(blok)}>
                {
                    isInView&&
                    <AnimateFromBelowComponent className="">
                        <text className="">{blok.title}</text>
                    </AnimateFromBelowComponent>
                }
                <div className=" grid grid-cols-1 md:grid-cols-2 gap-[50px] lg:gap-[177px] mt-[20px] justify-between">
                    {
                        isInView&&
                        <AnimateMultipleFromBelow className=" flex flex-col gap-[35px] mt-[30px] md:mt-[70px] lg:mt-[150px]">
                                <h2 className=" ">{blok.heading}</h2>
                                <text className=" mx-h-[235px] overflow-hidden mb-[10px]">{blok.overview}</text>
                                <Pagelink text={blok.link.Lable} url={blok.link.url} variant={colors[0].link_variant} />
                        </AnimateMultipleFromBelow>
                    }
                    <div className=" relative w-full flex items-center min-h-[400px] ">
                        {
                            isInView&&
                            <AnimateFromRightComponent className=" absolute w-[100%] h-[100%] max-h-min shadow-inner">
                                <div>
                                    {
                                        blok.media.map((m:any)=>(
                                            <MediaRenderer objectFit={m.objectFit} muted={true} url={m.media.filename} alt={m.media.alt} type={m.type} key={m._uid} />
                                        ))
                                    }
                                </div>
                            </AnimateFromRightComponent>
                        }
                    </div>
                </div>
        </div>
    )
}
