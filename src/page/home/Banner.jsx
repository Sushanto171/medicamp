// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import doctorImage from "../../assets/banner.jpeg"; // Replace with a doctor or medical staff image
import bgBanner from "../../assets/bg-banner.png";
import services from "../../assets/service.jpg";
import vaccinated from "../../assets/vaccinated.jpg";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import "./styles.css";

// Import required modules
import { Link } from "react-router-dom";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import Container from "../../components/Container";

const Banner = () => {
  const handleBtn = () => {
    const section = document.getElementById("popular-camps");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        // navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        {/* Slide 1: Welcome to MediCamp */}
        <SwiperSlide>
          <div
            className="w-full relative bg-no-repeat bg-cover"
            style={{ backgroundImage: `url(${services})` }}
          >
            <div className="h-[300px] sm:h-[400px] w-full flex items-center justify-center">
              <div className="absolute w-full h-full bg-gradient-to-r bg-black/40 opacity-80"></div>
              <div className="relative z-10 text-white text-center px-8 space-y-4">
                <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold">
                  Empowering Communities
                </h1>
                <p className="text-sm md:text-md lg:text-lg">
                  Over 500 families benefited from our health services in the
                  2024 MediCamp.
                </p>

                <button
                  onClick={handleBtn}
                  className="px-4 sm:px-6 py-2 bg-secondary text-white font-medium rounded hover:bg-primary transition"
                >
                  Discover Camps
                </button>
              </div>
            </div>
          </div>
        </SwiperSlide>

        {/* Slide 2: Trusted Medical Professionals */}
        <SwiperSlide>
          <div
            className="w-full relative bg-no-repeat bg-cover"
            style={{ backgroundImage: `url(${bgBanner})` }}
          >
            <Container>
              <div className="h-[300px] sm:h-[400px] w-full flex items-center justify-center">
                <div className="sm:grid grid-cols-2 items-center gap-8">
                  <div className="text-left space-y-4">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold  text-white">
                      Expert Care, Compassionate Service
                    </h2>
                    <p className="text-sm md:text-md lg:text-lg text-white">
                      Our dedicated healthcare team is committed to delivering
                      quality care with empathy and expertise.
                    </p>
                    <Link to={"/about-us"} className="block">
                      <button className="px-4 sm:px-6 py-2 hover:bg-primary text-white font-medium rounded bg-secondary transition">
                        Learn More About Us
                      </button>
                    </Link>
                  </div>
                  <div className="hidden sm:block">
                    <img
                      src={doctorImage}
                      alt="Medical Staff"
                      className="w-full hidden  sm:h-full object-cover rounded-tl-[150px] rounded-br-[150px] shadow-lg"
                    />
                  </div>
                </div>
              </div>
            </Container>
          </div>
        </SwiperSlide>

        {/* Slide 3: Join as a Volunteer */}
        <SwiperSlide>
          <div
            className="w-full relative bg-no-repeat bg-cover"
            style={{ backgroundImage: `url(${vaccinated})` }}
          >
            <div className="h-[300px] sm:h-[400px] w-full flex items-center justify-center">
              <div className="absolute w-full h-full bg-gradient-to-r from-green-800 via-transparent to-green-800 opacity-80"></div>
              <div className="relative z-10 text-white text-center px-8 space-y-4">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">
                  Making an Impact
                </h2>
                <p className="text-sm md:text-md lg:text-lg">
                  Vaccinated 2000+ children and adults in collaboration with
                  local NGOs.
                </p>
                <Link to="/career" className="block">
                  <button className="px-4 sm:px-6 py-2 hover:bg-primary text-white font-medium rounded bg-secondary transition">
                    Become a Volunteer
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </>
  );
};

export default Banner;
