import { useEffect } from "react";
import { scrollToTop } from "../../utilites/utilites";
import Banner from "./Banner";
import FeaturedDoctors from "./FeaturedDoctors";
import { FeedbackSection } from "./FeedbackSection";
import KeyServices from "./KeyService";
import PartnersCollaborations from "./PartnersCollaborations";
import PopularMedicalCamps from "./PopularMedicalCamps";
import RecentMedicalCamps from "./RecentMedicalCamps";
import SuccessStories from "./SeccessStories";

const Home = () => {
  useEffect(() => {
    scrollToTop();
  }, []);
  return (
    <div className=" ">
      {/* banner */}
      <Banner />
      <PopularMedicalCamps />
      <RecentMedicalCamps />
      <SuccessStories />
      <KeyServices />
      <FeaturedDoctors />
      <FeedbackSection />
      <PartnersCollaborations />
      <div></div>
    </div>
  );
};

export default Home;
