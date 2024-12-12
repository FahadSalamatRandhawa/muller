import Pagelink from "@/components/link";
import { StoryblokComponent } from "@storyblok/react";
import Image from "next/image";

export default function AboutusStory({blok}:{blok:any}){
    //console.log(blok)
    return(
        <>
            {
                blok.blocks.map((nested:any)=>(
                    <StoryblokComponent blok={nested} key={nested._uid} />
                ))
            }
        </>
    )
}