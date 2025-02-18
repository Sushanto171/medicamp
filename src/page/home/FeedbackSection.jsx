import { useQuery } from "@tanstack/react-query";
import { Swiper, SwiperSlide } from "swiper/react";
import bgImage from "../../assets/bg-feedback.jpg";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import LoadingSpinner from "../shared/LoadingSpinner";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";
import FeedbackCard from "../../components/FeedbackCard";
import SectionTitle from "../../components/SectionTitle";
import "./styles.css";
export function FeedbackSection() {
  const axiosPublic = useAxiosPublic();

  const { data: feedbacks = [], isLoading } = useQuery({
    queryKey: ["feedbacks"],
    queryFn: async () => {
      const { data } = await axiosPublic("/feedbacks");
      return data?.data;
    },
  });

  if (isLoading) return <LoadingSpinner />;
  return (
    <>
      <div
        className="bg-no-repeat bg-cover relative"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <div className="backdrop-blur -z-0 w-full h-full absolute"></div>
        <div className="py-12 relative">
          <div className="pb-8">
            <SectionTitle feedback={true} title="Participants Feedback" />
          </div>
          <Swiper
            slidesPerView={"auto"}
            centeredSlides={true}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
            }}
            pauseOnMouseEnter={true}
            modules={[Pagination, Autoplay]}
            className="mySwiper"
          >
            {feedbacks.map((feedback) => (
              <SwiperSlide className="!bg-transparent" key={feedback._id}>
                <FeedbackCard feedbackData={feedback} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </>
  );
}
