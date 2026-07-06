import Hero from "./sections/Hero";
import About from "./sections/About";
import Categories from "./sections/Categories";
import FeaturedCourses from "./sections/FeaturedCourses";
import TopInstructors from "./sections/TopInstructors";
import TopReviews from "./sections/TopReviews";

import Blogs from "./sections/Blogs";

function Home() {
  return (
    <>
      <Hero />
      <About />
      <Categories />     
      <FeaturedCourses />      
      <TopInstructors />
      <TopReviews />      
      <Blogs />
    </>
  );
}

export default Home;