"use client"
import { handleMissingColors } from "@/utils";
import { storyblokEditable } from "@storyblok/react";
import { render } from "storyblok-rich-text-react-renderer";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import {motion, useInView} from 'framer-motion'
import { AnimateXAxisComponent, AppearFromAbove, AppearFromBelow, ImageFromLeft, ImageFromRight, ImageFromRightFar, transition } from "@/AnimationUtils";

export default function infoAbout({blok}:{blok:any}){
    //console.log(blok)
    let {colors}=blok;
    colors=handleMissingColors(colors)
    const {images}=blok

    return(
        <div className="flex flex-col items-center px-[1em] md:px-[3em] xl:px-[5em] py-[4em] md:py-[6em] lg:py-[8em] " style={{backgroundColor:colors[0].background_color,color:colors[0].text_color}} id={blok.anchor_id} {...storyblokEditable(blok)}>
            <div className="lg:w-[70%] h-full flex flex-col justify-center gap-4 md:gap-7 lg:gap-[24px]">
                <h2 className="heading2 text-center">{blok.title}</h2>
                <text className=" max-w-none prose text-[21px] text-center" style={{color:colors[0].text_color}}>{render(blok.description)}</text>
            
                <div className="flex flex-col md:flex-row gab-5 gap-[20px] justify-center pt-7 m-auto">
                    {
                        images&&images.map((i:any)=>(
                            <AnimateXAxisComponent X={300} className="">
                                    <Image src={i.filename} width={800} height={600} alt={i.alt} objectFit="cover" className="w-full h-full m-auto"/>
                            </AnimateXAxisComponent>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}