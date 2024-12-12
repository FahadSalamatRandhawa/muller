"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import Pagelink from "@/components/link";

  const FormSchema = z.object({
    name: z
      .string({required_error:'required'}),
    email: z.string({required_error:'required'}).email(),
    message:z.string({required_error:'required'})
  })
  
  export function GetInTouch({blok}:{blok:any}) {
    //console.log(blok)
    const form = useForm<z.infer<typeof FormSchema>>({
      resolver: zodResolver(FormSchema),
    })
  
    function onSubmit(data: z.infer<typeof FormSchema>) {
      console.log(data)
    }
   const {color_variant}=blok;
   let {colors}=blok;
    colors=handleMissingColors(colors)
    return (
      <div className={`flex flex-col justify-center items-center gap-[20px] md:gap-[40px] lg:gap-[80px] py-[40px] lg:py-[112px] px-[30px] lg:px-[64px]`} style={{backgroundColor:colors[0].background_color,color:colors[0].text_color}} id={blok.anchor_id} {...storyblokEditable(blok)}>
        <div className={` flex flex-col ${blok.textalign}`}>
            <text className={`${color_variant=="black"?"Roboto_Text-16":''} mb-[16px]`}>{blok.title}</text>
            <h2 className={`${color_variant=="black"?" font-['Roboto'] text-[48px] font-[700] leading-[57px]":"heading2"} mb-[24px]`}>{blok.heading}</h2>
            <text className={` ${color_variant=="black"?" font-['Roboto'] text-[18px] font-[400]":"text-[18px] leading-[27px]"}`}>{blok.overview}</text>
        </div>
          <div className="grid grid-cols-1 w-full md:min-w-[520px] max-w-[560px] min-h-[543px] ">
              <Form {...form}>
              <form action={"mailto:"+blok.email.email} method="post" encType="text/plain" className={`w-full space-y-6 text-[16px] font-[400] leading-[24px] ${color_variant=="black"?"font-['Roboto']":""}`}>
                  <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                      <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                          <input {...field} placeholder={blok.nameplaceholder!=''?blok.nameplaceholder:"Your name"} className={` min-w-full h-[58px]  p-[12px] border-b-[1px] ${color_variant=="white"?"placeholder:text-grey-2":"placeholder:text-B-grey font-[500] "}`} style={{backgroundColor:"transparent",borderBottomColor:colors[0].border_color}}  />
                      </FormControl>
                      
                      <FormMessage />
                      </FormItem>
                  )}
                  />
                  <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                      <FormItem>
                      <FormLabel>Email Address</FormLabel>
                      <FormControl>
                          <input {...field} placeholder={blok.emailplaceholder!=''?blok.emailplaceholder:"Your email"}  className={` min-w-full border-b-[1px] p-[12px] h-[58px] ${color_variant=="white"?"placeholder:text-grey-2 bg-white":"placeholder:text-B-grey font-[500]"} `} style={{backgroundColor:"transparent",borderBottomColor:colors[0].border_color}}  />
                      </FormControl>
                      
                      <FormMessage />
                      </FormItem>
                  )}
                  />
                  <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                      <FormItem>
                      <FormLabel>Message</FormLabel>
                      <FormControl>
                      <textarea {...field} placeholder={blok.messageplaceholder!=''?blok.messageplaceholder:"Your Message"}  className={` min-w-full border-b-[1px] p-[12px] h-[156px] ${color_variant=="white"?"placeholder:text-grey-2 bg-white":"placeholder:text-B-grey  font-[500]"} `} style={{backgroundColor:"transparent",borderBottomColor:colors[0].border_color}} />
                      </FormControl>
                      <FormMessage />
                      </FormItem>
                  )}
                  />
                    <div className="  flex text-[14px] leading-[22.4px] "><hr className={`w-[20px] mt-[13px] border-[1px] mr-3`} style={{borderColor:colors[0].border_color}} /> {blok.disclaimer}</div>
                  <button className=" w-full" type="submit" ><Pagelink  variant={colors[0].link_variant} text={blok.button_text} /></button>
              </form>
              </Form>
          </div>
      </div>
    )
  }

  
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"
import { storyblokEditable } from "@storyblok/react"
import { handleMissingColors } from "@/utils"
import { useRef } from "react"
import { useInView } from "framer-motion"
import { AnimateFromBelowComponent, AnimateMultipleFromBelow } from "@/AnimationUtils"

  export function FAQs({blok}:{blok:any}){
    const ref=useRef(null);
    const isInView=useInView(ref,{once:true,margin:'-1px'});
    const link=blok.link[0]
    let {colors}=blok;
    colors=handleMissingColors(colors)
    return(
        blok.variant=="vertical"?(<div ref={ref} className=" flex flex-col gap-[20px] md:gap-[80px] px-[10px] md:px-[64px] py-[40px] md:py-[112px]" style={{backgroundColor:colors[0].background_color,color:colors[0].text_color}} id={blok.anchor_id} {...storyblokEditable(blok)}>
            {
                isInView&&
                <AnimateMultipleFromBelow className=" grid grid-cols-1 gap-[24px]">
                    <h2 className=" ">{blok.title}</h2>
                    <text>{blok.overview}</text>
                </AnimateMultipleFromBelow>
            }
            <Accordion type="single" className=" w-full " collapsible>
                {
                    isInView&&blok.questions.map((question:any,index:number)=>(
                        <AnimateFromBelowComponent className="" >
                            <AccordionItem value={question._uid} className=" gap-0" key={question._uid}>
                                <AccordionTrigger className=" py-[20px] ">{question.heading}</AccordionTrigger>
                                <AccordionContent >
                                    <text>{question.description}</text>
                                </AccordionContent>
                            </AccordionItem>
                        </AnimateFromBelowComponent>
                    ))
                }
            </Accordion>
            {
                isInView&&
                <AnimateMultipleFromBelow className=" flex flex-col gap-[16px]">
                    <h3 className=" ">{link.heading}</h3>
                    <text>{link.subheading}</text>
                    <>
                    {
                        blok.link&&blok.link.length>0?<Pagelink variant={colors[0].link_variant} text={link.Lable} url={link.link.url} />:null
                    }
                    </>
                </AnimateMultipleFromBelow>
            }
        </div>)
        :(
            <div ref={ref} className=" grid grid-cols-1 lg:grid-cols-2 px-[20] lg:px-[64px] py-[50px] lg:py-[112px] gap-[50px] " style={{backgroundColor:colors[0].background_color,color:colors[0].text_color}} id={blok.anchor_id} {...storyblokEditable(blok)}>
                {
                    isInView&&
                    <AnimateMultipleFromBelow className=" flex flex-col">
                        <h2 className="  mb-[24px]">{blok.title}</h2>
                        <text className=" mb-[32px]">{blok.overview}</text>
                        <Pagelink variant={colors[0].link_variant} />
                    </AnimateMultipleFromBelow>
                }
                {
                    isInView&&
                    <AnimateFromBelowComponent className=" flex flex-col ">
                        <Accordion type="single" collapsible>
                        {
                            blok.questions.map((question:any)=>(
                                <AccordionItem value={question._uid} className=" gap-0  " key={question._uid}>
                                    <AccordionTrigger className=" py-[20px] text-[18px] leading-[28.8px] font-[500]">{question.heading}</AccordionTrigger>
                                    <AccordionContent className=" flex flex-col py-[32px] gap-[32px] lg:gap-[64px]" >
                                        <text>{question.description}</text>
                                    </AccordionContent>
                                </AccordionItem>
                            ))
                        }
                        </Accordion>
                    </AnimateFromBelowComponent>
                }
            </div>
        )
    )
  }
