"use state"

import { Button } from "@/components/ui/button"

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { capitalizeFirstLetter } from "./navbar"
import {
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
  } from '@chakra-ui/react'

import { storyblokEditable } from "@storyblok/react"
import {  IoIosArrowForward } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import { RxCross1 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "@/state_stores/MobileMenueStore"
import { menue_close, mobile_state_toggle } from "@/state_stores/Mobile_Menue_Slice"



export function MobileMenue({blok}:{blok:any}){

    const [expanded,setExpanded]=useState(-99)
    const dispatch=useDispatch()
    const mobile_state=useSelector((state:RootState)=>state.Mobile_Menue_Slice.opened);

    const {background_color}=blok;
    const {text_color}=blok;

    return <div className={`w-full sticky flex justify-between items-center z-50 top-0 h-[40px] lg:invisible lg:hidden `} style={{backgroundColor:mobile_state?background_color:""}} {...storyblokEditable(blok)}>
            <Link href={blok.logo_link.cached_url=="home"?"/":blok.logo_link.url}><Image className=" drop-shadow-2xl z-40" height={35} width={166} src={mobile_state?blok.mobile_menue_open_logo.filename:blok.logo.filename} alt={blok.logo.alt} /></Link>
            <div className={` flex flex-row-reverse items-center gap-[10px] md:gap-[20px]  px-[20px] rounded-bl-[8px] `} style={{backgroundColor:background_color}}>
            {
                blok.socials.map((social:any)=>(
                    <Link href={social.url.url} target="_blank" key={social._uid}><Image src={social.image.filename} alt={social.image.alt} width={24} height={24} /></Link>
                ))
            }
            <Popover open={mobile_state}>
            <PopoverTrigger onClick={()=>(dispatch(mobile_state_toggle()))} style={{backgroundColor:background_color}} asChild>
                <Button className=" flex flex-col gap-[6px] items-end text-white ">{mobile_state?<RxCross1/>:<><hr className=" w-[35px]"/><hr className=" w-[20px]"/></>}</Button>
            </PopoverTrigger>
            <PopoverContent className=" w-screen min-h-screen flex flex-col text-center -mt-2 border-0 bg-cover" style={{backgroundColor:background_color,color:text_color}}>
            <Accordion className=" flex flex-col gap-[10px] text-center "  borderColor={background_color} allowToggle>
            {
                blok.name.map((n:any,index:number)=>(
                    <AccordionItem className=" w-full flex flex-col items-center min-h-[37px] " borderWidth={0} key={n._uid}>
                        
                        <div className="relative inline-flex justify-center ">
                        {
                            n.items.length>0&&
                                <AccordionButton width={'fit-content'} p={"4px"} onClick={(event) => {event.stopPropagation();expanded == index ? setExpanded(-99) : setExpanded(index);
                                }} key={index}>
                               {expanded==index?<IoIosArrowDown/>:<IoIosArrowForward />}
                                </AccordionButton>
                        }
                            <Link onClick={()=>(dispatch(menue_close()))} href={n.link.cached_url=="home"?"/":"/"+capitalizeFirstLetter(n.link.cached_url)} className=" min-h-[30px] self-center">{n.lable}</Link>

                        </div>
                        
                        <AccordionPanel className=" flex flex-col items-center w-full ">
                        {
                            n.items.map((item:any)=>(
                                
                                <Link onClick={()=>(dispatch(menue_close()))} href={item.url.linktype=="story"?"/"+item.url.cached_url:"/"+capitalizeFirstLetter(n.link.cached_url.split("/")[0])+item.url.url} className=" text-start justify-self-start py-[8px] " key={item._uid}>{item.Lable}</Link>
                               
                            ))
                        }
                        </AccordionPanel>
                    </AccordionItem>
                ))
            }
            </Accordion>
            </PopoverContent>
            </Popover>
            </div>
        </div>
}

/**
 * {
                                n.items.map((item:any)=>(
                                    <Link href={item.url.linktype=="story"?"/"+item.url.cached_url:"/"+capitalizeFirstLetter(n.link.cached_url.split("/")[0])+item.url.url} className=" py-[8px] border-b border-white " key={item._uid}>{item.Lable}</Link>
                                ))
                        }
 */
