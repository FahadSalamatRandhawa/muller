import { StoryblokComponent } from "@storyblok/react";
import { RevealAnimationComponent } from "../RevealAnimation";

export default function Home({blok}:{blok:any}){

  return(
    <>
{/**      <RevealAnimationComponent /> */}
      {
        blok.block.map((b:any)=>(
          <StoryblokComponent blok={b} key={b._uid} />
        ))
      }
    </>
  )
}
