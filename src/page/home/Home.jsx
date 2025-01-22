import Banner from "./Banner";
import { FeedbackSection } from "./FeedbackSection";
import KeyServices from "./KeyService";
import PopularMedicalCamps from "./PopularMedicalCamps";
import SuccessStories from "./SeccessStories";

const Home = () => {
  return (
    <div className="space-y-9 ">
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
