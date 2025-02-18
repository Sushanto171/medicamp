import Banner from "./Banner";
import { FeedbackSection } from "./FeedbackSection";
import KeyServices from "./KeyService";
import PartnersCollaborations from "./PartnersCollaborations";
import PopularMedicalCamps from "./PopularMedicalCamps";
import RecentMedicalCamps from "./RecentMedicalCamps";
import SuccessStories from "./SeccessStories";

const Home = () => {
  return (
    <div className=" ">
      {/* banner */}
      <Banner />
      <PopularMedicalCamps />
      <RecentMedicalCamps />
      <SuccessStories />
      <KeyServices />
      <FeedbackSection />
      <PartnersCollaborations />
      <div></div>
    </div>
  );
};

export default Home;
