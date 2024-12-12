"use client"
import useSWR from 'swr'
import { getStoryblokApi } from "@storyblok/react"
import Image from "next/image"
import Pagelink from "../link"
import { Skeleton } from '@chakra-ui/react'
import {inView, motion} from 'framer-motion'
import { useInView } from "framer-motion"
import { AppearFromBelow, AppearFromBottom, ImageFromLeft, ImageFromRight, transition } from '@/AnimationUtils'
import Link from 'next/link'
import { render } from "storyblok-rich-text-react-renderer";


export default function ItemCardMarket({blok,buttontext,link_variant,divider_color,isInView}:{blok:any,buttontext:string,link_variant:string,divider_color:string,isInView:boolean}) {
  
  const { data, error, isLoading }=useSWR(blok,getDataList)
  
  if(isLoading){
    return(
      <>
        <Skeleton isLoaded={!isLoading} fitContent={true}  > 
        <div className=' flex flex-col w-full md:w-[90%] 1400px:w-[95%] lg:w-[85%] xl:w-[900px] min-h-[400px] md:min-h-[600px] lg:h-[936px] xl:h-auto justify-between gap-[20px] py-[18px] xl:py-[30px]' key={blok.uuid} >
          
        </div>
      </Skeleton>
      <Skeleton isLoaded={!isLoading} fitContent={true}  > 
        <div className=' flex flex-col w-full md:w-[90%] 1400px:w-[95%] lg:w-[85%] xl:w-[900px] min-h-[400px] md:min-h-[600px] lg:h-[936px] xl:h-auto justify-between gap-[20px] py-[18px] xl:py-[30px]' key={blok.uuid} >
          
          </div>
      </Skeleton>
      <Skeleton isLoaded={!isLoading} fitContent={true}  > 
        <div className=' flex flex-col w-full md:w-[90%] 1400px:w-[95%] lg:w-[85%] xl:w-[900px] min-h-[400px] md:min-h-[600px] lg:h-[936px] xl:h-auto justify-between gap-[20px] py-[18px] xl:py-[30px]' key={blok.uuid} >
          
          </div>
      </Skeleton>
      <Skeleton isLoaded={!isLoading} fitContent={true}  > 
        <div className=' flex flex-col w-full md:w-[90%] 1400px:w-[95%] lg:w-[85%] xl:w-[900px] min-h-[400px] md:min-h-[600px] lg:h-[936px] xl:h-auto justify-between gap-[20px] py-[18px] xl:py-[30px]' key={blok.uuid} >
          
          </div>
      </Skeleton>
      </>
    )
  }
  if (error) return "An error has occurred"
  let animationDirection=ImageFromLeft;
    return(
        <>
          {
            data&&data.map((blok:any,index)=>{
              const stop=blok.content.blocks.filter((b:any)=>b.component=="stop")[0]
              //const info=blok.content.blocks.filter((b:any)=>b.component=="info")[0]
              //const productDescription=(render(info.description)[0])
              if(index%2!=0){
                animationDirection=ImageFromRight
              }else{
                animationDirection=ImageFromLeft
              }
              return(
                <Skeleton isLoaded={!isLoading} fitContent={true} key={blok._uid} > 
                    <div className=' flex flex-col w-full md:w-[95%] 1400px:w-[95%] lg:w-[90%] xl:w-[90%] pr-[10px] md:px-0 px-[15px] min-h-[400px] md:min-h-[525px] lg:h-[780px] xl:h-auto justify-between gap-[20px] py-[18px] xl:py-[30px]' key={blok.uuid} >
                    {
                      isInView&&
                      <Link href={`/${blok.full_slug}`}>
                        <motion.div variants={animationDirection} initial={animationDirection.start} animate={animationDirection.finish} transition={{duration:1,delay:0.5}} className=' relative w-full h-[358px] lg:min-h-[400px]'>
                        <Image src={stop.image.filename} placeholder='empty' objectFit='cover' alt={stop.image.alt} fill priority sizes='(max-height: 1179px) min-h-[300px],(min-width: 800px) 90vw,(min-width: 1180px) min-h-[400px] 85vw, (min-width:1880px) w-[90%]'/>
                      </motion.div>
                      </Link>
                    }
                    {
                      isInView&&<motion.div className=' h-full flex flex-col gap-1 md:justify-strech ' variants={AppearFromBottom} initial={AppearFromBottom.start} animate={AppearFromBottom.finish} transition={transition} >
                        <h3 className='max-h-[200px] overflow-hidden !text-[25px] w-full '>{stop.heading}</h3>
                        <div className={`w-[90%] border-b-[1px] `} style={{borderColor:divider_color}} ></div>
                        <text className={`w-[90%] overflow-hidden my-[8px]`}>{stop.description}</text>
                        <Pagelink variant={link_variant} url={blok.full_slug} text={buttontext!=''?buttontext:'Find out more'} />
                      </motion.div>
                    }
                  </div>
                </Skeleton>
              )
            })
          }
        </>
    )
}

async function fetchData(s_uuid:any) {
  const storyblokApi = getStoryblokApi();
  return storyblokApi.get(`cdn/stories/`, { version: "published", by_uuids:s_uuid});
}

async function getDataList(solutions:string[]){
  const promisList=solutions.map(async(s_uuid:string) =>(await fetchData(s_uuid)).data.stories[0])
    const dataResults = await Promise.all(promisList).then((data)=>{return data});
    return dataResults;
}


// export default function ItemsCards({items}:{items:any}) {
//   const [dataResults, setDataResults] = useState([] as any[]);

//   useEffect(() => {
//       const fetchDataForItems = async () => {
//           const dataPromises = items.map((s_uuid:string) => fetchData(s_uuid));
//           const results = await Promise.all(dataPromises);
//           setDataResults(results);
//       };

//       fetchDataForItems();
//   }, [items]);
//     return(
//         <>
//             {dataResults.map(async (s_uuid:string)=>{
//             const {data}=await fetchData(s_uuid)
//             //console.log(data)
//             //console.log(data.stories[0])
//             const blok=data.stories[0].content
//             if(!blok){
//               return null
//             }
//             const stop=blok.blocks.filter((b:any)=>b.component=="stop")
//             const info=blok.blocks.filter((b:any)=>b.component=="info")
//             return(
//               <div className=' flex flex-col md:w-[450px] lg:w-[550px] xl:w-[800px] min-h-[600px] h-[936px] xl:h-auto px-[10px] gap-[20px] py-[18px] xl:py-[30px]' key={data.stories[0]._uid} >
//                 <Image src={stop[0].image.filename} alt={stop[0].image.alt} width={520} height={358} style={{width:'100%',objectFit:'contain'}} />
//                 <text className=' heading2 w-[80%]'>{info[0].title}</text>
//                 <div className="w-[90%] border-b-[1px] border-[#00918E]" ></div>
//                 <text className=' w-[90%] h-min-[165px] overflow-hidden  my-[8px]'>{render(info[0].description)}</text>
//                 <Pagelink url={data.stories[0].full_slug} text="Click me" />
//               </div>
//             )
//           })}
//         </>
//     )
// }