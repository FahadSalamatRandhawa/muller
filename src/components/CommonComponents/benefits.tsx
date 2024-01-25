"use client"
import Image from "next/image";
import { useRef, useState } from "react";
import Pagelink from "../link";
import { storyblokEditable } from "@storyblok/react";
import { handleMissingColors } from "@/utils";
import { useInView } from "framer-motion";
import { AnimateFromBelowComponent, AnimateFromFarRightComponent, AnimateFromLeftComponent, AnimateXAxisComponent, AppearFromBelow, transition } from "@/AnimationUtils";
import {motion} from 'framer-motion'

export default function Benefits({blok}:{blok:any}){
    console.log(blok)
    const ref=useRef(null);
    const isInView=useInView(ref,{once:true})
    const benefits=blok.benefits
    const [count,setCount]=useState(0)
    let {colors}=blok;
    colors=handleMissingColors(colors)
    let {link}=blok;
    if(!link){
        link=[{Label:"More info",url:""}]
    }
    
    return (
        <div ref={ref} className=" flex flex-col min-h-screen py-[50px]  lg:py-[112px] px-[10px] md:px-[64px] gap-[20px] md:gap-[40px] lg:gap-[72px]" style={{backgroundColor:colors[0].background_color,color:colors[0].text_color}} id={blok.anchor_id} {...storyblokEditable(blok)}>
            {
                isInView&&
                <AnimateFromBelowComponent className=" Text-18">
                    <p >{blok.title}</p>
                </AnimateFromBelowComponent>
            }
            <div className=" grid grid-cols-1 lg:grid-cols-2 lg:flex-row justify-between items-center lg:min-h-[500px] mb-[10px]">
               {
                isInView&&
                <AnimateXAxisComponent X={-300} className="" key={count}>
                    <div className=" relative min-w-[300px] min-h-[400px] lg:w-[90%] lg:h-[90%] xl:w-[90%] xl:h-[900px]">
                    <Image src={benefits[count].media.filename} fill objectFit="contain" alt={benefits[0].media.alt} style={{backgroundAttachment:"fixed"}} />
                    </div>
                </AnimateXAxisComponent>
               }
                {
                        <div className=" flex flex-col items-start py-[20px] gap-[40px]">
                        {
                            isInView&&benefits.map((benefit:any,i:number)=>(
                                <motion.button variants={AppearFromBelow} initial={AppearFromBelow.start} animate={AppearFromBelow.finish} transition={transition} onClick={()=>setCount(i)} className={`flex flex-col min-h-[150px] items-center gap-[20px] pl-[32px] border-l-2 `} style={{borderLeftColor:i==count?colors[0].border_color:null}} key={benefit._uid} >
                                <h4 className=" heading4">{benefit.title}</h4>
                                <p>{benefit.description}</p>
                                </motion.button>
                            ))
                        }
                        </div>
                }
            </div>
            {
                isInView&&
                <AnimateFromBelowComponent className="flex justify-end">
                    <div className="flex w-full max-w-[300px]" >{
                        link.map((l:any)=>(
                            <Pagelink key={l.url.url} text={l.Lable} url={l.url.url} openNew={false} variant={colors[0].link_variant} />
                        ))
                    }</div>
                </AnimateFromBelowComponent>
            }
        </div>
    )
}