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
    const ref=useRef(null);
    const isInView=useInView(ref,{once:true})
    const benefits=blok.benefits
    const [count,setCount]=useState(0)
    let {colors}=blok;
    colors=handleMissingColors(colors)
    let {link}=blok;
    const variant=blok.variant;
    const {anchor_id}=blok;
    // if(!link){
    //     link=[{Label:"More info",url:""}]
    // }
    
    return (
        <div ref={ref} className=" flex flex-col px-[1em] md:px-[3em] xl:px-[5em] py-[4em] md:py-[6em] lg:py-[8em] gap-[20px] md:gap-[40px] lg:gap-[72px]" style={{backgroundColor:colors[0].background_color,color:colors[0].text_color}} id={blok.anchor_id} {...storyblokEditable(blok)}>
            {
                isInView&&
                <AnimateFromBelowComponent className=" Text-18">
                    <p >{blok.title}</p>
                </AnimateFromBelowComponent>
            }
           <div className="grid grid-cols-1 lg:grid-cols-2 lg:flex-row justify-between items-start md:items-center lg:min-h-[500px] mb-[10px]">
                {variant === 'right' ? (
                    // Wenn variant === 'right', Text und Pagelink zuerst
                    <div className="flex flex-col items-start py-[20px] gap-[40px]">
                        {isInView && benefits.map((benefit: any, i: number) => (
                            <motion.button 
                                variants={AppearFromBelow} 
                                initial={AppearFromBelow.start} 
                                animate={AppearFromBelow.finish} 
                                transition={transition} 
                                onClick={() => setCount(i)} 
                                className="flex flex-col min-h-[150px] items-start gap-[20px] pl-[32px] border-l-2"
                                style={{borderLeftColor: i === count ? colors[0].border_color : null}} 
                                key={benefit._uid}>
                                <h3 className="heading4 text-left">{benefit.title}</h3>
                                <p className="text-left">{benefit.description}</p>
                            </motion.button>
                        ))}
                        {
                            // Pagelink innerhalb der Textspalte, animiert, wenn variant === 'right'
                            isInView && link && link.length > 0 && link.map((l:any) => (
                                <AnimateFromBelowComponent className="flex w-full max-w-[300px] mt-[2em]">
                                    <Pagelink text={l.Lable} key={l.url.url} url={l.url.url} openNew={false} variant={colors[0].link_variant} />
                                </AnimateFromBelowComponent>
                            ))
                        }
                    </div>
                ) : null}

                {isInView && (
                    <AnimateXAxisComponent X={variant === 'right' ? 300 : -300} className="" key={count}>
                        <div className="relative min-[450px]:min-w-[400px] min-h-[450px] lg:w-[90%] lg:h-[90%] xl:w-[90%] xl:h-[900px]">
                            <Image src={benefits[count].media.filename} fill objectFit="contain" alt={benefits[0].media.alt} style={{ backgroundAttachment: "fixed" }} />
                        </div>
                    </AnimateXAxisComponent>
                )}

                {variant !== 'right' ? (
                    // Wenn variant !== 'right', Text und Pagelink danach
                    <div className="flex flex-col items-start py-[20px] gap-[40px]">
                        {isInView && benefits.map((benefit: any, i: number) => (
                            <motion.button 
                                variants={AppearFromBelow} 
                                initial={AppearFromBelow.start} 
                                animate={AppearFromBelow.finish} 
                                transition={transition} 
                                onClick={() => setCount(i)} 
                                className="flex flex-col min-h-[150px] items-start gap-[20px] pl-[32px] border-l-2"
                                style={{borderLeftColor: i === count ? colors[0].border_color : null}} 
                                key={benefit._uid}>
                                <h3 className="heading4 text-left">{benefit.title}</h3>
                                <p className="text-left">{benefit.description}</p>
                            </motion.button>
                        ))}
                        {
                            // Pagelink innerhalb der Textspalte, animiert, wenn variant !== 'right'
                            isInView && link && link.length > 0 && link.map((l:any) => (
                                <AnimateFromBelowComponent key={l.url.url} className="flex w-full max-w-[300px] mt-[2em]">
                                    <Pagelink text={l.Lable} url={l.url.url} openNew={false} variant={colors[0].link_variant} />
                                </AnimateFromBelowComponent>
                            ))
                        }
                    </div>
                    
                ) : null}
            </div>

        </div>
    )
}