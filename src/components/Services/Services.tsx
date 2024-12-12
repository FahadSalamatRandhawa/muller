import {  getStoryblokApi, storyblokEditable } from "@storyblok/react";

import ItemsCard from "../CommonComponents/ItemCard";
import { handleMissingColors } from "@/utils";
import { useInView } from "framer-motion";
import { useRef } from "react";
import {motion} from 'framer-motion'
import { AppearFromBottom, ImageFromLeft } from "@/AnimationUtils";
export default function ServicesList({blok}:{blok:any}){

  const ref = useRef(null)
  const isInView = useInView(ref,{once:true,margin:'-5px'})

  const {card_divider_color}=blok;
  const {buttontext}=blok;
  const {services}=blok;
  let {colors}=blok;
  colors=handleMissingColors(colors)

  const {anchor_id}=blok;

    return(
        <div className=" flex flex-col h-auto px-[1em] md:px-[3em] xl:px-[5em] py-[4em] md:py-[6em] lg:py-[8em]" ref={ref} style={{backgroundColor:colors[0].background_color,color:colors[0].text_color}} id={anchor_id} {...storyblokEditable(blok)}>
          {isInView&&<motion.p variants={AppearFromBottom} initial={AppearFromBottom.start} animate={AppearFromBottom.finish} transition={{delay:0.5,duration:1}} className=''>{blok.title}</motion.p>}
          {isInView&&<motion.h2 variants={ImageFromLeft} initial={ImageFromLeft.start} animate={ImageFromLeft.finish} transition={{delay:0.5,duration:0.5}} className=" w-full m-auto mt-[30px] max-w-[1752px]" >{blok.heading}</motion.h2>}
          <div className=' grid grid-cols-1 md:grid-cols-2 1400px:grid-cols-4 w-full justify-center gap-[20px] lg:px-[10px] mt-[30px] lg:mt-[65px] max-w-[1752px] m-auto service-font'>
             
                <ItemsCard isInView={isInView} divider_color={card_divider_color} link_variant={colors[0].link_variant} buttontext={buttontext} blok={services}/>
             
          </div>
        </div>
    )
}


async function fetchData(s_uuid:any) {
  const storyblokApi = getStoryblokApi();
  return storyblokApi.get(`cdn/stories/`, { version: "published", by_uuids:s_uuid});
}

