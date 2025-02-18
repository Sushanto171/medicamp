import Banner from "./Banner";
import { FeedbackSection } from "./FeedbackSection";
import KeyServices from "./KeyService";
import PopularMedicalCamps from "./PopularMedicalCamps";
import SuccessStories from "./SeccessStories";

const Home = () => {
  return (
    <div className=" ">
      {/* banner */}
      <Banner />
      <PopularMedicalCamps />
      <KeyServices />
      <SuccessStories />
      <FeedbackSection />
      <div></div>
    </div>
  );
};

export default Home;
