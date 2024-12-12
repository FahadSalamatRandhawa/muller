"use client"
import { handleMissingColors } from "@/utils";
import { useInterval } from "@chakra-ui/react";
import { storyblokEditable } from "@storyblok/react";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import {motion, useInView} from 'framer-motion'
import { AnimateXAxisComponent, AppearFromAbove, AppearFromBelow, ImageFromLeft, ImageFromRight, ImageFromRightFar, transition } from "@/AnimationUtils";

export default function Tagline({blok}:{blok:any}){
    const ref=useRef(null)
    const isInView=useInView(ref,{once:true,margin:"-1px"})

    const {locations}=blok
    let {colors}=blok;
    colors=handleMissingColors(colors)

    return(
        <div ref={ref} className=" overflow-hidden min-h-screen lg:h-auto flex flex-col justify-center px-[1em] md:px-[3em] xl:px-[5em] py-[4em] md:py-[6em] lg:py-[8em] gap-[80px] " style={{backgroundColor:colors[0].background_color,color:colors[0].text_color}} id={blok.anchor_id} {...storyblokEditable(blok)}>
            {
                isInView&&
                <motion.div variants={AppearFromBelow} initial={AppearFromBelow.start} animate={AppearFromBelow.finish} transition={transition} className=" grid grid-cols-1 px-[10px] md:px-0">
                <p>{blok.title}</p>
                <h2 className=" mt-[16px] mb-[24px]">{blok.heading}</h2>
                <p>{blok.tagline}</p>
                </motion.div>
            }
            <div className=" flex flex-col md:grid md:grid-cols-2 gap-10 md:justify-between">
                
                    {locations&&locations.map((l:any,i:number)=>(
                        <div className=" flex flex-col gap-10 justify-between ">
                            <div key={l._uid} className={` flex flex-col text-start`} >
                            <div className=" flex">
                                {
                                    isInView&&
                                    <motion.div variants={AppearFromBelow} initial={AppearFromBelow.start} animate={AppearFromBelow.finish} transition={transition} className=" grid grid-cols-1 pl-[10px] md:pl-[27px]" style={{borderLeft:`1px solid ${l.border_color}`}} >
                                        <text className=" heading3">{l.country}</text>
                                        <text className=" lg:leading-[33.6px] mt-[16px] mb-[24px]">{l.location}</text>
                                        <Link href={l.link} target="_blank"><text className=" font-[500] text-[18px]">{l.linktext}</text></Link>
                                        <Link href={l.linkcontact.linktype=="email"?"mailto:"+l.linkcontact.url:l.linkcontact.url} className=" font-[500] text-[18px]">{l.linktextcontact}</Link>
                                    </motion.div>
                                }
                            </div>
                            </div>
                            <div className=" flex flex-col gap-7">
                            {
                                l.image.map((image:any)=>(
                                    <AnimateXAxisComponent key={image._uid} X={400} className=" self-center h-[250px] lg:h-[440px] relative w-[95%] lg:w-[90%] xl:w-[90%] md:h-[300px]">
                                        <Image src={image.filename} fill objectFit="cover" sizes="(min-width: 800px) 542px" alt={image.alt} />
                                    </AnimateXAxisComponent>
                                ))
                            }
                            </div>
                        </div>
                    ))}
                

            </div>
        </div>
    )
}