"use client"
import { storyblokEditable } from "@storyblok/react";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { handleMissingColors } from "@/utils";
import { useInView } from "framer-motion";
import { AnimateFromAboveComponent, AnimateFromBelowComponent, AnimateFromRightComponent, AnimateXAxisComponent, AppearFromAbove, transition } from "@/AnimationUtils";
import { motion } from "framer-motion";

export default function Contact({blok}:{blok:any}) {
    const ref=useRef(null)
    const isInView=useInView(ref,{once:true})
    const {contacts}=blok;
    const [count,setCount]=useState(0)
    let {colors}=blok;
    colors=handleMissingColors(colors)
    return(
        <>
            <div ref={ref} className="flex flex-col px-[20px] lg:px-[64px] py-[40px] lg:py-[112px] gap-[30px] lg:gap-[80px] " style={{backgroundColor:colors[0].background_color,color:colors[0].text_color}} id={blok.anchor_id} {...storyblokEditable(blok)}>
            {
                isInView&&
                <AnimateFromBelowComponent className="" >
                    <div className=" flex flex-col gap-[24px] max-w-[1400px] m-auto" >
                    <p>{blok.title}</p>
                    <h2 className=" heading1">{blok.heading}</h2>
                    <text>{blok.overview}</text>
                </div>
                </AnimateFromBelowComponent>
            }
            <div className=" flex flex-col md:flex-row justify-between items-center gap-[20px] md:gap-0 m-auto max-w-[1400px] w-full">
                <div className=" flex flex-col w-full gap-[29px] md:w-[60%]">
                {
                    contacts.map((c:any,i:number)=>(
                        <button className={`flex flex-col `} onClick={()=>setCount(i)} key={c._uid} >
                        <div className=" flex gap-[10px] lg:gap-[27px]">
                        {count==i&&isInView?<motion.div className=" flex flex-col w-[1px] " variants={AppearFromAbove} initial={AppearFromAbove.start} animate={AppearFromAbove.finish} transition={transition} style={{backgroundColor:colors[0].border_color}}></motion.div>:<div></div>}
                        {
                            isInView&&
                            <AnimateFromBelowComponent className="">
                                <div className=" flex flex-col gap-[16px] text-start">
                                    <h4 className=" heading4">{c.country}</h4>
                                    <text className=" ">{c.name}</text>
                                    <Link href={c.link.linktype=="email"?"mailto:"+c.link.url:c.link.url} className=" font-[500] text-[18px]">{c.link_text}</Link>
                                </div>
                            </AnimateFromBelowComponent>
                        }
                        </div>
                        </button>
                    ))
                }
                </div>
                {
                    isInView&&
                    <AnimateXAxisComponent X={300} className=" relative w-full w-[300px] md:w-[40%] h-full h-[300px] md:h-[400px] lg:h-[600px]" key={count}>
                        <div>
                            <Image src={contacts[count].image.filename} alt={contacts[count].image.alt} objectFit="cover" fill />
                        </div>
                    </AnimateXAxisComponent>
                }
            </div>
        </div>
        </>
    )
}