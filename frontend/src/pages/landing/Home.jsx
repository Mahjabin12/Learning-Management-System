import Hero from "./sections/Hero";
import Categories from "./sections/Categories";
import FeaturedCourses from "./sections/FeaturedCourses";
import About from "./sections/About";
import TopInstructors from "./sections/TopInstructors";
import TopReviews from "./sections/TopReviews";

import Blogs from "./sections/Blogs";

function Home() {
  return (
    <>
      <Hero />
      <Categories />
      <FeaturedCourses />
      <About />
      <TopInstructors />
      <TopReviews />
      
      <Blogs />
    </>
  );
}

export default Home;