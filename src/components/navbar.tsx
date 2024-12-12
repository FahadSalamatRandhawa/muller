"use client"
import Image from "next/image";
import Link from "next/link";
import { MobileMenue } from "./MobileMenue";
import { storyblokEditable } from "@storyblok/react";
import { useEffect, useState } from "react";

export function capitalizeFirstLetter(string:string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export function Navigation({blok}:{blok:any}){
    //console.log(blok.socials[0].image.filename)
    //const {data}=await Storyblok.get('cdn/stories/navigation', {version:"published"});
    //const items=data.story.content.name;
    //console.log("NAVBAR")
    //console.log(blok.name[3])
    
    /**
     * <Link href={i.url.cached_url=="home"?"/":"/"+capitalizeFirstLetter(i.url.cached_url.split("/")[0])}legacyBehavior passHref >
                                
                                
                                {i.Lable}
                                
                               
                                </Link>
     * 
     */
     if (typeof window !== "undefined") {
            window.addEventListener("scroll", changeBg);
    }

    const {css_position_desktop}=blok;
    const {bg_change_trigger_value}=blok;
    const {background_color_change}=blok
    const {background_color}=blok;
    const {text_color}=blok;
    const {color_change}=blok;
    function changeBg(){
        var scrollValue=window.scrollY;
        if(scrollValue>bg_change_trigger_value&&isScollred!=true){
            if(color_change){
                setIsScrolled(true);
            }
        }else if(scrollValue<bg_change_trigger_value&&isScollred==true){
            setIsScrolled(false);
        }
        
    }
    const [isScollred, setIsScrolled] = useState(false);

    
    return(
        <>
        <div className=" invisible hidden lg:visible w-full h-[60px] lg:flex items-center justify-between -top-[1px] z-40 " style={{color:text_color,backgroundColor:isScollred?background_color_change:"",position:css_position_desktop}} {...storyblokEditable(blok)}>
            <Link href={blok.logo_link.cached_url=="home"?"/":blok.logo_link.url} className="bg-[#fff9] px-[10px] py-[10px] rounded-br-[8px]"><Image height={35} width={166} src={blok.logo.filename} alt={blok.logo.alt} priority/></Link>
            <div className=" h-full flex justify-end items-center w-auto px-[20px] text-[21px] font-[400] rounded-bl-[8px] gap-[20px]" style={{backgroundColor:isScollred?background_color_change:background_color}}>
            {
                blok.name.map((n:any)=>(
                    <div className="dropdown" key={n._uid}>
                        <Link href={n.link.cached_url=="home"?"/":"/"+capitalizeFirstLetter(n.link.cached_url)} className="dropbtn">{n.lable}</Link>
                        {
                            n.items.length&&n.items.length>0?(<div className="dropdown-content p-[15px] rounded-bl-[8px] rounded-br-[8px] Text-16 " style={{backgroundColor:isScollred?background_color_change:background_color}}>
                            {
                                n.items.map((item:any)=>(
                                    <Link href={item.url.linktype=="story"?"/"+item.url.cached_url:"/"+item.url.url} className=" py-[8px] border-b " key={item._uid}>{item.Lable}</Link>
                                ))
                            }
                            </div>)
                            :null
                            }
                    </div>
                ))
            }
            {
                blok.socials.map((social:any)=>(
                    <Link href={social.url.url} target="_blank" key={social._uid}><Image src={social.image.filename} alt={social.image.alt} width={24} height={24} /></Link>
                ))
            }
                
            </div>
        </div>
        <MobileMenue blok={blok} />
        </>
    )
}


/*
<div class="navbar">
  <a href="#home">Home</a>
  <a href="#news">News</a>
  <div class="dropdown">
    <button class="dropbtn">Dropdown
      <i class="fa fa-caret-down"></i>
    </button>
    <div class="dropdown-content">
      <a href="#">Link 1</a>
      <a href="#">Link 2</a>
      <a href="#">Link 3</a>
    </div>
  </div>
</div>
*/