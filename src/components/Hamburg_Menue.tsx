"use client";
import { storyblokEditable } from "@storyblok/react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { RxCross1 } from "react-icons/rx";

import { capitalizeFirstLetter } from "./navbar"
import {
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
  } from '@chakra-ui/react'
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";

export default function Header({blok}:{blok:any}) {
  const [openMbl, setopenMbl] = useState(false);
  const [expanded,setExpanded]=useState(-99)

  const showClass =
    " bg-brand -mt-2 border-0 text-white justify-content-center top-68 animate-open-menu absolute flex w-full origin-top flex-col ";
  const hideClass =
    "justify-content-center top-68 animate-close-menu absolute hidden w-full origin-bottom flex-col  bg-black text-3xl";
  return (
    <header className={`sticky z-50 text-white lg:invisible  lg:hidden `} {...storyblokEditable(blok)}>
      <section className={`flex justify-between items-center min-h-[37px] ${openMbl?"bg-brand":""} `}>
      <Link href={blok.logo_link.cached_url=="home"?"/":blok.logo_link.url}><Image className=" drop-shadow-2xl z-40" height={35} width={166} src={blok.logo.filename} alt={blok.logo.alt} /></Link>
            <div className={` flex flex-row-reverse items-center gap-[10px] md:gap-[20px]  px-[20px] rounded-bl-[8px] bg-brand`}>
            {
                blok.socials.map((social:any)=>(
                    <Link href={social.url.url} target="_blank"><Image src={social.image.filename} alt={social.image.alt} width={24} height={24} key={social._uid} /></Link>
                ))
            }
            <button onClick={()=>setopenMbl(!openMbl)} className=" flex flex-col gap-[6px] items-end text-white ">{openMbl?<RxCross1/>:<><hr className=" w-[35px]"/><hr className=" w-[20px]"/></>}</button>
            </div>
      </section>
      <section id="mobile-menu" className={openMbl ? showClass : hideClass}>
        <nav
          className="flex min-h-screen flex-col items-center py-8 "
          aria-label="mobile"
          onClick={() => {
            setopenMbl(!openMbl);
          }}
        >
          <Accordion className=" w-full flex flex-col gap-[10px] text-center" allowToggle>
            {
                blok.name.map((n:any,index:number)=>(
                    <AccordionItem className=" w-full flex flex-col justify-evenly min-h-[37px] " key={n._uid}>
                        <div className=" grid grid-cols-2 items-center justify-center">
                        {
                            n.items.length>0?
                                <AccordionButton w={"auto"} justifySelf={'end'}  alignSelf={"self-start"} onClick={()=>expanded==index?setExpanded(-99):setExpanded(index)} className="  ">
                                {expanded==index?<IoIosArrowDown/>:<IoIosArrowForward />}
                                </AccordionButton>
                                :<div className=" w-full invisible"><IoIosArrowDown/></div>
                        }
                        <Link  href={n.link.cached_url=="home"?"/":"/"+capitalizeFirstLetter(n.link.cached_url)} className=" justify-self-start ">{n.lable}</Link>
                        </div>
                        <AccordionPanel className=" flex flex-col ">
                        {
                            n.items.map((item:any)=>(
                                <div className="grid grid-cols-2 w-full  border-b border-white">
                                    <div className=" w-full"></div>
                                <Link href={item.url.linktype=="story"?"/"+item.url.cached_url:"/"+capitalizeFirstLetter(n.link.cached_url.split("/")[0])+item.url.url} className=" text-start justify-self-start py-[8px] " key={item._uid}>{item.Lable}</Link>
                                </div>
                            ))
                        }
                        </AccordionPanel>
                    </AccordionItem>
                ))
            }
            </Accordion>
        </nav>
      </section>
    </header>
  );
}