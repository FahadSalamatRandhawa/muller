"use client"
import Image from "next/image";
import Link from "next/link";
import Pagelink from "../link";
import MediaRenderer from "../MediaComponent";
import { HandleMissingTags } from "@/utils";
import { animate, motion, useAnimate } from "framer-motion"
import { useEffect, useState } from "react";
import { AppearFromBelow, textToWordsChunksArray } from "@/AnimationUtils";
import {render} from 'storyblok-rich-text-react-renderer-ts';


export default function top({blok}:{blok:any}){
  const [isTitleDone,setIsTitleDone]=useState(false)
  const [isDescriptionDone,setIsDescriptionDone]=useState(false)
  const {Title}=blok;
  const titleAnimationArray=textToWordsChunksArray({text:Title,chunkSize:3})

  const {description}=blok;
  const {anchor_id}=blok;

  
    let {heading_tags}=blok;
    heading_tags=HandleMissingTags(heading_tags);
    return(
      <div className={` relative flex flex-col min-h-screen justify-end text-white `} id={anchor_id} /*style={{backgroundImage:`url(${blok.image.filename})`}} */ >
        <div className=" absolute w-[100%] h-[100%] pointer-events-none " style={{objectFit:'cover'}} id="video_container_TOP"  >
        {
            blok.media&&blok.media.map((m:any)=>(
                <MediaRenderer objectFit={m.objectFit} muted={true} url={m.media.filename} alt={m.media.alt} type={m.type} key={m._uid} />
            ))
        }
        {/**Dark overlay */}
        <div className="absolute w-[100%] h-[100%] bg-black/30 z-20"></div>
        </div>
        <div className={`min-h-[300px] md:min-h-[500px] lg:w-[80%] xl:w-[60%] flex flex-col gap-[30px] mx-[10px] md:mx-[31px] z-30 mb-3`} id="home-top">
        <h1 className="flex flex-wrap gap-1 md:gap-2 ">
          {
            titleAnimationArray.map((arrayItem:string[],index)=>(
              <motion.text variants={AppearFromBelow}
              initial="start"
              animate="finish"
              transition={{duration:0.5,delay:index*0.25}}
              onAnimationComplete={()=> index==titleAnimationArray.length-1?setIsTitleDone(true):null}
              key={index}
              >{arrayItem}</motion.text>
            ))
          }
          </h1>

          {isTitleDone&&<motion.text className={`min-[883px]:max-h-[150px] overflow-hidden Text-18`}
            variants={AppearFromBelow}
            initial={AppearFromBelow.start}
            animate={AppearFromBelow.finish}
            transition={{duration:0.5,delay:0.25}}
            onAnimationComplete={()=>setIsDescriptionDone(true)}
          >{render(description)}</motion.text>}
          {
            isTitleDone&&isDescriptionDone&&blok.link.map((link:any)=>(
              <motion.div variants={AppearFromBelow} initial={AppearFromBelow.start} animate={AppearFromBelow.finish} transition={{duration:0.5,delay:0.25}} key={link._uid}>
                <Pagelink openNew={false} url={link.url.url} text={link.Lable} variant="white" />
              </motion.div>
            ))
          }
        </div>     
        <Link href="#solutions" className=' self-center z-20 mb-5 ' ><Image src="/Icon/down.svg" alt='scroll' className=" scale-75 md:scale-100 self-end" width={50} height={50} /></Link>
    </div>
    )
}


/**
 * <heading_tags.primary_heading className=' heading1 '><Typewriter
          onInit={(typewriter)=>{
            typewriter.typeString(blok.Title).callFunction(()=>{setTitle(true)}).changeDelay(5).start()
          }}
          options={{cursor:""}}
          /></heading_tags.primary_heading>
          {
            title&&<heading_tags.secondary_heading className=" h-[150px] md:max-h-[310px] overflow-hidden "><Typewriter
            onInit={(typewriter)=>{
              typewriter.typeString(blok.description).callFunction(()=>{setDescription(true)}).changeDelay(10).start()
            }}
            options={{cursor:""}}
            /></heading_tags.secondary_heading>
          }
          {
            title&&description&&blok.link.map((link:any)=>(
              <Pagelink url={link.url.url} text={link.Lable} variant="white" />
            ))
          }
 */