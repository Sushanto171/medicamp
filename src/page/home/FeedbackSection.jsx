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
    <div>
      <div>
        <SectionTitle title="Participants Feedback" />
      </div>
      <div
        className="bg-no-repeat bg-cover relative mt-6"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <div className="backdrop-blur w-full h-full absolute"></div>
        <div className="py-12">
          <Swiper
            slidesPerView={"auto"}
            centeredSlides={true}
            autoplay={5000}
            spaceBetween={30}
            pagination={{
              clickable: true,
            }}
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
    </div>
  );
}
