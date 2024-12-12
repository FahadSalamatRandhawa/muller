"use client"
import { AnimateFromBelowComponent, AnimateFromFarRightComponent, AnimateFromLeftComponent, AnimateYAxisComponent } from "@/AnimationUtils";
import { handleMissingColors } from "@/utils";
import { storyblokEditable } from "@storyblok/react";
import { useInView } from "framer-motion";
import Image from "next/image";
import { useRef, useState } from "react";

export default function Projects({blok}:{blok:any}){
    const ref=useRef(null);
    const isInView=useInView(ref,{once:true,margin:'-20px'})
    const {projects}=blok;
    let {colors}=blok;
    colors=handleMissingColors(colors)

    const xl=310;
    const lg=63;
    const md=63;
    const sm=30;
    let max_words:number=sm;
    
    return(
        <div className=" flex flex-col px-[20px] xl:px-[40px] pt-[20px] pb-[40px] lg:pb-[112px] gap-[30px] lg:gap-y-[90px] items-center " style={{backgroundColor:colors[0].background_color,color:colors[0].text_color}} id={blok.anchor_id} {...storyblokEditable(blok)}>
            {
                isInView&&
                <AnimateFromLeftComponent className=" self-start" >
                    <text >{blok.title}</text>
                </AnimateFromLeftComponent>
            }
            {
                isInView&&
                <AnimateFromBelowComponent className="">
                    <div className=" flex flex-col text-center gap-[24px]">
                        <h2 className=" ">{blok.heading}</h2>
                        <p>{blok.overview}</p>
                    </div>
                </AnimateFromBelowComponent>
            }
            {
                projects.map((project:any,index:number)=>{
                    const [isExpanded,setIsExpanded]=useState(false)
                    return (
                        <div ref={ref} className=" lg:w-[90%] xl:w-full flex flex-col items-center gap-[24px] xl:px-[20px] py-5 overflow-hidden" id={project.anchor_id}  key={project._uid}>
                            {
                                isInView&&
                                <AnimateFromFarRightComponent className=" relative w-full h-[400px] lg:h-[640px] xl:h-[900px] z-10" key={index}>
                                    
                                        <Image src={project.image.filename} fill alt={project.image.alt} priority sizes="(min-width:1180px) h-[640px] 90vw ,(min-width:1880px) h-[900px] 100vw" style={{objectFit:"contain"}} />
                                    
                                </AnimateFromFarRightComponent>
                            }
                            {
                                isInView&&
                                <AnimateFromBelowComponent className="" key={index}>
                                    <div className={`grid grid-cols-1 md:grid-cols-2  transition-all animate-out ease-in-out duration-1000 `}>
                                        <div>
                                            <h4 className="  ">{project.name}</h4>
                                            <div className=" flex flex-wrap gap-[8px] text-[14px] leading-[22.4px] font-[500] mt-[16px] " style={{color:blok.tag_text_color}}>
                                                {
                                                    project.tags.map((tag:any)=>(
                                                        <div className=" h-[30px] px-[8px] py-[4px]" style={{backgroundColor:blok.tag_background_color}} key={tag._uid} >{tag.name}</div>
                                                    ))
                                                }
                                            </div>
                                        </div>
                                        <div className=" flex flex-col justify-between gap-[10px]  text-start">
                                        <p className={` overflow-ellipsis text-start transition-all animate-out ease-in-out duration-1000 md:${max_words=md} lg:${max_words=lg} xl:${max_words=xl}`}>{isExpanded?project.overview:(project.overview).slice(0,max_words)}</p>
                                        {
                                            (project.overview.length)>max_words+1?
                                            <button onClick={()=>setIsExpanded(!isExpanded)} style={{backgroundColor:blok.button_color}} >{!isExpanded?"Read more ...":"Read less ..."}</button>
                                            :null
                                        }
                                        </div>
                                    </div>
                                </AnimateFromBelowComponent>
                            }
                        </div>
                    )
                })
            }
        </div>
    )
}
