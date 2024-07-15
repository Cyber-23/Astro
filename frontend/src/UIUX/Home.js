import HomeBlogs from "./HomePage/HomeBlogs.js";
import Footer from "./HomePage/Footer";
import FooterForm from "./HomePage/FooterForm";
import HeroSection from "./HomePage/HeroSection";
import HomeServices from "./HomePage/HomeServices.js";
import Testimonial from "./HomePage/Testimonial"
export default function Home(){
    return (
       <>
        <HeroSection/>
        <HomeServices/>
        <HomeBlogs/>
        <Testimonial/>
       </>
    )
}