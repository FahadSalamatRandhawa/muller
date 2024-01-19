"use client"
import Link from "next/link";
import Pagelink from "../link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { storyblokEditable } from "@storyblok/react";
import {motion} from 'framer-motion'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { handleMissingColors } from "@/utils";
import { useInView } from "framer-motion";
import { AnimateFromBelowComponent, AnimateFromFarRightComponent, AnimateFromLeftComponent, AnimateFromRightComponent, AppearFromBelow, transition } from "@/AnimationUtils";


export function Organization({blok}:{blok:any}){

    const ref=useRef(null);
    const isInView=useInView(ref,{once:true})

    const [value,setValue]=useState(0);
    
    const {countries}=blok;
    const {departments}=countries[value]?countries[value]:countries[0];
    const {hiring}=blok
    let {colors}=blok;
    colors=handleMissingColors(colors)
    const {jobrole_text_color}=blok;

    return(
        <div ref={ref} className=" min-h-screen flex flex-col pl-[20px] pr-[10px] py-[20px] lg:pl-[76px] lg:pr-[49px] lg:py-[35px] overflow-x-hidden " style={{backgroundColor:colors[0].background_color,color:colors[0].text_color}} id={blok.anchor_id} {...storyblokEditable(blok)}>
                {
                    isInView&&
                    <AnimateFromBelowComponent className="">
                        <h3>{blok.title}</h3>
                    </AnimateFromBelowComponent>
                }
                <div className=" grid grid-cols-1 self-center md:self-start justify-center md:justify-normal md:grid-cols-3 lg:grid-cols-4 gap-[10px] md:gap-[24px] mt-[40px] lg:mt-[108px]">
                    {
                        isInView&&countries.map((country:any,index:number)=>(
                            <motion.button variants={AppearFromBelow} initial={AppearFromBelow.start} animate={AppearFromBelow.finish} transition={transition} className={` min-w-[270px] md:max-w-[300px] px-[34px] border-b-[1px] pb-[10px]`} style={{borderBottomColor:index==value?colors[0].border_color:'',color:index==value?colors[0].border_color:''}} key={country._uid} onClick={()=>setValue(index)} >
                                {country.countryname}
                            </motion.button>
                        ))
                    }
                </div>
                <div className=" min-h-[300px] pt-10 lg:pt-[100px] lg:min-h-[570px] flex flex-wrap justify-evenly md:justify-normal ">
                    <div className=" flex flex-wrap gap-[5px] md:gap-[10px] justify-center ">
                        {
                            isInView&&departments.map((dep:any,index:number)=>(
                                    <AnimateFromFarRightComponent className="">
                                        <Dialog>
                                        <DialogTrigger>
                                            {dep.department_head.map((head:any)=>(<EmployeeCard employee={head} jobrole_color={jobrole_text_color} />))}
                                        </DialogTrigger>
                                        <DialogContent className=" overflow-auto max-h-screen max-w-[95%] flex flex-wrap justify-evenly md:grid md:grid-cols-3 gap-[5px] hide-scroll " style={{backgroundColor:blok.popup_background_color,color:colors[0].text_color}}>
                                            {
                                                dep.employees.map((emp:any,index:number)=>(
                                                    <EmployeeCard employee={emp} jobrole_color={jobrole_text_color}  />
                                                ))
                                            }
                                        </DialogContent>
                                    </Dialog>
                                    </AnimateFromFarRightComponent>
                            ))
                        }
                    </div>
                </div>
                {
                    isInView&&
                    <AnimateFromBelowComponent className=" flex flex-col mt-[40px] lg:mt-[97px] gap-[19px] self-center text-center items-center  ">
                        <div >
                            <h4 className=" ">{hiring[0].title}</h4>
                            <text>{hiring[0].overview}</text>
                            <Pagelink text={hiring[0].link_text} variant={colors[0].link_variant} url={hiring[0].link.url} />
                        </div>
                    </AnimateFromBelowComponent>
                }
            </div>
    )
}


const EmployeeCard=({employee,jobrole_color,className}:{employee:any,jobrole_color:string,className?:string})=>{
    const emp=employee;
    return(
        <div className={`sm:w-[250px] md:max-w-[250px] min-h-[300px] flex flex-col items-center gap-[24px] `+className} key={emp._uid}>
            <Image src={emp.profileimage.filename} width={150} height={150} alt={emp.profileimage.alt} className=" justify-self-center" />
            <div className=" flex flex-col text-center font-[Roboto]">
                <text className=" text-[20px] leading-[30px] font-[600]">{emp.name}</text>
                <text className=" text-[18px] leading-[27px] " style={{color:jobrole_color}} >{emp.jobtitle}</text>
                <text className=" text-[16px] leading-[24px] mt-[16px] ">{emp.about}</text>
            </div>
            <div className="flex gap-[14px] justify-self-center">
                {
                    emp.socials.map((social:any)=>(
                        <Link href={social.url.url?social.url.url:''} target="_blank" key={social._uid}><Image src={social.image.filename} alt={social.image.alt} width={24} height={24} /></Link>
                    ))
                }
            </div>
        </div>
    )
}