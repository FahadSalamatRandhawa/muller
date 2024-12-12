import Image from "next/image"
import { useState } from "react";

export default async function location({blok}:{blok:any}){
    const [value,setValue]=useState(0);

    const locations=blok.locations
    return(
        <div className=" flex justify-between items-center">
                {locations.map((l:any,i:number)=>(
                    <button onClick={()=>{setValue(i)}} key={l._uid} className=" h-auto flex flex-col gap-[29px] ">
                    <div className={`grid grid-cols-1  pl-[27px] ${value==i?"border-l-[1px]":null} border-brand`}>
                    <text className=" text-[30px] leading-[33px]">{l.country}</text>
                    <text className=" leading-[33.6px] mt-[16px] mb-[24px]">{l.location}</text>
                    <text className=" font-[500] text-[18px]">{l.link}</text>
                    </div>
                </button>
                ))}
                <Image src={locations[value].image.filename} height={440} alt="location" className="w-full" />
            </div>
    )
}