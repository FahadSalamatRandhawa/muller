"use client";
import { storyblokInit, apiPlugin } from "@storyblok/react/rsc";

/** 2. Import your components */
import { Navigation } from "./navbar";
import partners from "@/components/Home/partners";
import top from "@/components/Home/Top";
import USPList from "@/components/CommonComponents/USPList";
import Numbers from "@/components/Home/NumberList";
import { Card } from "./CommonComponents/Card";
import SolutionsPage from "@/views/Solutions/SolutionsPage";
import video from "./Media";
import ServicesPage from "@/views/ServicesPage";
import STop from "./CommonComponents/stop";
import Benefits from "./CommonComponents/benefits";
import Info from "./CommonComponents/info";
import Contact from "./CommonComponents/contact";
import Home from "./Home/Home";
import Testimonials from "./Home/testimonials";
import AboutusStory from "@/views/About us/Aboutus";
import { AboutTop, Achievements, History, Philosophy } from "./About/About";
import SolutionsList from "@/components/Solutions/Solutions";
import ServicesList from "./Services/Services";
import MarketsView from "@/views/Markets/Markets";
import MarketTop from "./Markets/markettop";
import MarketPoints from "./Markets/marketpoints";
import Projects from "./Markets/projects";
import SignUpMarkets from "./Markets/signup";
import NewsView from "@/views/News/NewsPage";
import NewsTop from "./News/N-Top";
import BlogSection from "./News/BlogSection";
import NewsSection from "./News/NewsSection";
import Signup from "./News/Signup";
import { DiscoverNews } from "./News/SingleNews/Components";
import SingleNews from "@/views/News/SingleNews";
import Tagline from "./Home/tagline";
import { Organization } from "./About/AboutClientComponents";
import Media from "./Media";
import CareersView from "@/views/Careers/page";
import CareersList, { CareersTop, IndividualsApply } from "./Career/CareersPage";
import { FAQs, GetInTouch } from "./Career/SingleCareerClient";
import SingleCareer from "@/views/Careers/SingleCareer";
import ContactView from "@/views/Contact/Page";
import { ContactTopGrid, GetInTouchGrid } from "./Contact/components";
import Footer from "./footer";
import { CareerDescription, CareerTop } from "./Career/SingleCareerServer";
import Premade_Slider from "./Solutions/ClientComponents";
import USPListH from "./CommonComponents/USPList-h";
import infoAbout from "./CommonComponents/infoabout";
import BenefitsService from "./CommonComponents/benefitsservice";
import USPListservice from "./CommonComponents/USPListservice";
import contactnew from "./CommonComponents/contactnew";
import marketlist from "./Markets/marketlist";
import MediaAdj from "./MediaAdj";
/** 3. Initialize it as usual */
storyblokInit({
  accessToken: process.env.STORYBLOKTOKEN,
  use: [apiPlugin],
  components: {

    //Globals
    Navigation:Navigation,
    footer:Footer,

    Partners:partners,
    testimonials:Testimonials,
    tagline:Tagline,
    Top:top,
    USPList:USPList,
    page:Home,
    NumbersList:Numbers,
    SolutionsList:SolutionsList,
    solution:Card,
    Service:Card,
    marketcard:Card, 
    SolutionsPage:SolutionsPage,
    video:video,
    servicespage:ServicesPage,
    stop:STop,
    benefits:Benefits,
    ServicesList:ServicesList,
    info:Info,
    contacts:Contact,
    USPListH:USPListH,
    infoAbout:infoAbout,
    BenefitsService:BenefitsService,
    USPListservice:USPListservice,
    contactnew:contactnew,
    marketlist:marketlist,

    //
    SolutionsThatWorkTogether:Premade_Slider,

    //About
    About:AboutusStory,
    abouttop:AboutTop,
    philosophy:Philosophy,
    history:History,
    organization:Organization,
    achievements:Achievements,

    Media:Media,
    MediaAdj:MediaAdj,
    
    //
    markets:MarketsView,
    markettop:MarketTop,
    marketpoints:MarketPoints,
    projects:Projects,
    signup:SignUpMarkets,

    //News
    NewsPage:NewsView,
    NewsTop:NewsTop,
    BlogsSection:BlogSection,
    NewsSection:NewsSection,
    NewsLetter:Signup,
    //Single_News
    DiscoverLatest:DiscoverNews,
    News:SingleNews,

    //
    Careers:CareersView,
    CareersTop:CareersTop,
    CurrentOpenings:CareersList,
    FAQ:FAQs,
    individualsapply:IndividualsApply,
    /**/
    Career:SingleCareer,
    CareerTop:CareerTop,
    CareerDescription:CareerDescription,
    GetInTouch:GetInTouch,

    //
    ContactPage:ContactView,
    Contact_TopGrid:ContactTopGrid,
    Contact_GetInTouchGrid:GetInTouchGrid,


  },
  apiOptions:{
    region:'eu',
    cache: {
      clear: 'auto',
      type: 'none',
    },
  }
});

export default function StoryblokProvider({ children }:{children:any}) {
  return children;
}
