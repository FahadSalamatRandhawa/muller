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
        <div ref={ref} className=" min-h-screen flex flex-col px-[1em] ml py-[4em] md:py-[6em] lg:py-[8em] overflow-x-hidden " style={{backgroundColor:colors[0].background_color,color:colors[0].text_color}} id={blok.anchor_id} {...storyblokEditable(blok)}>
            <div className="mlx">
                {
                    isInView&&
                    <AnimateFromBelowComponent className="">
                        <h3 className="max-w-[1400px] text-left">{blok.title}</h3>
                    </AnimateFromBelowComponent>
                }
                <div className=" grid grid-cols-1 self-center md:self-start justify-center md:justify-normal md:grid-cols-3 lg:grid-cols-4 gap-[10px] md:gap-[24px] mt-[40px] lg:mt-[108px] max-w-[1400px]">
                    {
                        isInView&&countries.map((country:any,index:number)=>(
                            <motion.button variants={AppearFromBelow} initial={AppearFromBelow.start} animate={AppearFromBelow.finish} transition={transition} className={` min-w-[270px] md:max-w-[300px] px-[34px] border-b-[1px] pb-[10px] `} style={{borderBottomColor:index==value?colors[0].border_color:'',color:index==value?colors[0].border_color:''}} key={country._uid} onClick={()=>setValue(index)} >
                                {country.countryname}
                            </motion.button>
                        ))
                    }
                </div>
                <div className=" min-h-[300px] pt-10 lg:pt-[100px] lg:min-h-[570px] flex flex-wrap justify-evenly md:justify-normal max-w-[1400px]">
                    <div className=" w-full flex flex-wrap md:grid md:grid-cols-2 lg:grid-cols-3 gap-[10px] md:gap-[30px] lg:gap-[50px] justify-center ">
                        {
                            isInView&&departments.map((dep:any,index:number)=>(
                                    <AnimateFromFarRightComponent className="flex justify-center " key={index}>
                                        {
                                            dep.employees.length>0?
                                            <Dialog>
                                                <DialogTrigger >
                                                    {dep.department_head.map((head:any)=>(<EmployeeCard employee={head} jobrole_color={jobrole_text_color}  className="justify-self-center place-self-center"/>))}
                                                </DialogTrigger>
                                                <DialogContent className=" overflow-auto max-h-screen max-w-[95%] flex flex-wrap gap-[5px] " style={{backgroundColor:blok.popup_background_color,color:colors[0].text_color}}>
                                                    {
                                                        dep.employees.map((emp:any,index:number)=>(
                                                            <EmployeeCard employee={emp} key={index} className="justify-self-center place-self-center" jobrole_color={jobrole_text_color}  />
                                                        ))
                                                    }
                                                </DialogContent>
                                            </Dialog>
                                            :dep.department_head.map((head:any)=>(<EmployeeCard employee={head} jobrole_color={jobrole_text_color}  className="justify-self-center place-self-center"/>))
                                        }
                                    </AnimateFromFarRightComponent>
                            ))
                        }
                    </div>
                </div>
                {
                    isInView&&
                    <AnimateFromBelowComponent className=" flex flex-col mt-[40px] lg:mt-[97px] gap-[19px] self-center text-center items-center hidden">
                        <div>
                            <h4 className=" ">{hiring[0].title}</h4>
                            <text>{hiring[0].overview}</text>
                            <Pagelink text={hiring[0].link_text} variant={colors[0].link_variant} url={hiring[0].link.url} />
                        </div>
                    </AnimateFromBelowComponent>
                }
                </div>
            </div>
    )
}


const EmployeeCard=({employee,jobrole_color,className}:{employee:any,jobrole_color:string,className?:string})=>{
    const emp=employee;
    return(
        <div className={`w-[300px] md:max-w-[400px] imgml imgml min-h-[300px] flex flex-col items-center gap-[30px] `+className} key={emp._uid}>
            <Image src={emp.profileimage.filename} width={400} height={400} alt={emp.profileimage.alt} className=" justify-self-center square" />
            <div className=" flex flex-col text-center ">
                <text className=" text-[20px] leading-[30px] font-[600]">{emp.name}</text>
                <text className=" text-[18px] leading-[27px] " style={{color:jobrole_color}} >{emp.jobtitle}</text>
                <text className=" text-[16px] leading-[24px] ">{emp.about}</text>
            </div>
            <div className="flex gap-[14px] justify-self-center mb-4">
                {
                    emp.socials.map((social:any)=>(
                        <Link href={social.url.linktype == "email" ? (social.url.url ? "mailto:" + social.url.url : '') : social.url.url} target="_blank" key={social._uid}>
                        <Image src={social.image.filename} alt={social.image.alt || 'Social Icon'} width={24} height={24} />
                      </Link>                      
                    ))
                }
            </div>
        </div>
    )
}