import Banner from "./Banner";
import { FeedbackSection } from "./FeedbackSection";
import PopularMedicalCamps from "./PopularMedicalCamps";

const Home = () => {
  return (
    <div className="space-y-9 ">
      {/* banner */}
      <Banner />
      <PopularMedicalCamps />
      <FeedbackSection />
      <div></div>
    </div>
  );
};

export default Home;
