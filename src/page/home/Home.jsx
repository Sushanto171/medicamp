import Banner from "./Banner";
import PopularMedicalCamps from "./PopularMedicalCamps";

const Home = () => {
  return (
    <div className="space-y-9 ">
      {/* banner */}
      <Banner />
      <PopularMedicalCamps />
      <div></div>
    </div>
  );
};

export default Home;
