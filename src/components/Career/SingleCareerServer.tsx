import { handleMissingColors } from "@/utils";
import { storyblokEditable } from "@storyblok/react"
import Image from "next/image"
import { render } from "storyblok-rich-text-react-renderer"

export async function CareerTop({blok}:{blok:any}){
    let {colors}=blok;
    colors=handleMissingColors(colors)
    const {social_media_bg_color}=blok;
    return(
        <div className=" min-h-screen flex flex-col items-center justify-center gap-[30px] lg:gap-[80px] py-[50px] py-[170px]" style={{backgroundColor:colors[0].background_color,color:colors[0].text_color}} id={blok.anchor_id} {...storyblokEditable(blok)}>
                <div className=" w-full lg:w-3/5 flex flex-col gap-[24px] px-[30px] lg:px-[64px]">
                    <text className=" text-[16px] leading-[25.6px]">{blok.category}</text>
                    <h1 className=" ">{blok.title}</h1>
                    <div className=" flex flex-col md:flex-row items-center justify-between mt-[24px]">
                        <div className=" flex items-center text-[14px] leading-[22.4px] ">
                            <Image className=" rounded-full" width={56} height={56} src={blok.circledImage.filename} alt={blok.circledImage.alt} />
                            <text className=" ml-[16px] ">{(blok.date)}</text>
                            <text className=" px-[8px]">.</text>
                            <text>{blok.readtime}</text>
                        </div>
                        <div className=" flex gap-[8px]" >
                            {blok.socials.map((social:any)=>(<Image className=" p-[4px] rounded-full" style={{backgroundColor:social_media_bg_color}} width={24} height={24} src={social.filename} alt={social.alt} />))}
                        </div>
                    </div>
                </div>
                <div className=" relative w-full h-[300px] md:h-[450px] lg:h-[600px] bg-cover">
                    <Image objectFit="cover" fill src={blok.coverImage.filename} alt={blok.coverImage.alt} />
                </div>
            </div>
    )
}

export async function CareerDescription({blok}:{blok:any}){
    let {colors}=blok;
    colors=handleMissingColors(colors)
    const {social_tag_background_color}=blok;
    const {tag_text_color}=blok;
    return(
        <div className=" flex items-center justify-center lg:gap-[80px] px-[20px] py-[40px] lg:py-[112px]" style={{backgroundColor:colors[0].background_color,color:colors[0].text_color}} id={blok.anchor_id} {...storyblokEditable(blok)}>
                <div className=" w-full md:w-3/4 ">
                    <text className="prose" style={{color:colors[0].text_color}}>{render(blok.description)}</text>
                    <div className=" flex items-end justify-between mt-[24px] lg:mt-[64px]">
                            <div className=" flex flex-col gap-[16px] text-[18px] leading-[28.8px] ">
                                <text className=" font-[500]">{blok.sharelable}</text>
                                <div className=" flex gap-[8px]" >
                                    {blok.shareon&&blok.shareon.map((social:any)=>(<Image className=" p-[4px]  rounded-full" style={{backgroundColor:social_tag_background_color}} width={24} height={24} src={social.filename} alt={social.alt} />))}
                                </div>
                            </div>
                            <div className=" flex gap-[8px] text-[14px] font-[600] leading-[21px]">
                                {blok.jobtags.map((tag:any)=>(<text className=" px-[8px] py-[4px]" style={{backgroundColor:social_tag_background_color,color:tag_text_color}} key={tag._uid}>{tag.name}</text>))}
                            </div>
                    </div>
                    <hr className=" h-[1px] my-[48px] " style={{borderColor:colors[0].border_color}}></hr>
                    <div className=" flex gap-[16px]">
                        <Image src={blok.authorimage.filename} className=" rounded-full" width={56} height={56} alt={blok.authorimage.alt} />
                        <div className=" flex flex-col">
                            <text className=" text-[18px] font-[500] leading-[28.8px]">{blok.authorname}</text>
                            <text className=" text-[16px] leading-[25.5px]">{blok.authorrole}</text>
                        </div>
                    </div>
                </div>
            </div>
    )
}
