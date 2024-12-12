import { StoryblokComponent } from "@storyblok/react";
//{image,heading,text,link}:{image:string,heading:string,text:string,link:string}
export function Card({blok}:{blok:any}){
  console.log('Card')
  //console.log(blok)
  
    return(
        <>
          {
            blok.blocks.map((b:any)=>(
              <StoryblokComponent blok={b} key={b._uid} />
            ))
          }
        </>
    )
}