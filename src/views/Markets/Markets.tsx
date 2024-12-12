import { StoryblokComponent } from "@storyblok/react"

export default function MarketsView({blok}:{blok:any}){
    //console.log("Markets")
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