import { FaDollarSign } from "react-icons/fa";
import { FaUserDoctor } from "react-icons/fa6";

import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import {
  MdAccessTime,
  MdDateRange,
  MdLocationOn,
  MdPeople,
} from "react-icons/md";
import { useParams } from "react-router-dom";
import { JoinCampModal } from "../../components/modal/JoinCampModal";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useIntersectionObserver from "../../hooks/useObserve";
import LoadingSpinner from "../shared/LoadingSpinner";
import { scrollToTop } from "./../../utilites/utilites";
import RatingFeedback from "./RatingFeedback";
import SocialShare from "./SocialShare";

const CampDetails = () => {
  const today = new Date().toISOString().split("T")[0];
  const axiosPublic = useAxiosPublic();
  const { id } = useParams();
  const { elementRef, isVisible } = useIntersectionObserver(0);
  const {
    data: camp = {},
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["camp-details", id],
    queryFn: async () => {
      const { data } = await axiosPublic(`/camp/${id}`);

      return data?.data;
    },
  });
  // scroll
  useEffect(() => {
    scrollToTop();
  }, [refetch]);
  if (isLoading) return <LoadingSpinner />;
  const {
    campName,
    image,
    campFees,
    date,
    time,
    location,
    healthcareProfessional,
    participantCount,
    description,
  } = camp;

  return (
    <div
      ref={elementRef}
      className={`flex flex-col lg:flex-row items-start gap-8 p-6 lg:p-12 bg-gray-50 dark:bg-background-dark min-h-screen ${
        isVisible ? "animate__animated animate__fadeInUp" : ""
      }`}
    >
      {/* Left: Image */}
      <div className="flex-1">
        <img
          src={image}
          alt="Camp"
          className="rounded-lg shadow-lg w-full max-h-[500px] object-cover"
          loading="lazy"
        />

        <RatingFeedback camp={camp} />
      </div>

      {/* Right: Camp Details */}
      <div className="flex-1 space-y-2 sm:space-y-6">
        <h1 className="text-2xl lg:text-4xl font-bold text-primary dark:text-white">
          {campName}
        </h1>

        {/* Date and Time */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex items-center gap-2">
            <MdDateRange className="text-primary dark:text-white" />
            <span className="text-gray-500 dark:text-white  font-medium hidden sm:block">
              Date:
            </span>
            <span className="text-text dark:text-gray-300 font-semibold">
              <span className={date < today ? "line-through" : ""}>{date}</span>{" "}
              {date < today && "(Campaigns Done)"}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <MdAccessTime className="text-primary dark:text-white" />
            <span className="text-gray-500 dark:text-white  font-medium hidden sm:block ">
              Time:
            </span>
            <span
              className={`text-text dark:text-gray-300 font-semibold ${
                date < today ? "line-through" : ""
              } `}
            >
              {time}
            </span>
          </div>
        </div>

        {/* Location */}
        <div className="flex items-center gap-2">
          <MdLocationOn className="text-primary dark:text-white" />
          <span className="text-gray-500 dark:text-white  font-medium hidden sm:block">
            Location:
          </span>
          <span className="text-text dark:text-gray-300 font-semibold">
            {location}
          </span>
        </div>

        {/* Camp Fees */}
        <div className="flex items-center gap-2">
          <FaDollarSign className="text-primary dark:text-white" />
          <span className="text-gray-500 dark:text-white  font-medium hidden sm:block">
            Camp Fees:
          </span>
          <span
            className={`text-text dark:text-gray-300 font-semibold ${
              campFees === 0 ? "text-green-600" : ""
            }`}
          >
            {campFees ? `$${campFees}` : "Free"}
          </span>
        </div>

        {/* Healthcare Professional */}
        <div className="flex items-center gap-2">
          <FaUserDoctor className="text-primary dark:text-white" />
          <span className="text-gray-500 dark:text-white  font-medium hidden sm:block">
            Healthcare Professional:
          </span>
          <span className="text-text dark:text-gray-300 font-semibold">
            {healthcareProfessional}
          </span>
        </div>

        {/* Participant Count */}
        <div className="flex items-center gap-2">
          <MdPeople className="text-primary dark:text-white" />
          <span className="text-gray-500 dark:text-white  font-medium hidden sm:block">
            Participants:
          </span>
          <span className="text-text dark:text-gray-300 font-semibold">
            {participantCount} people
          </span>
        </div>

        {/* Description */}
        <div>
          <h2 className="text-lg font-medium text-primary dark:text-white text-pretty">
            Description:
          </h2>
          <p className="text-gray-700 dark:text-white  leading-relaxed">
            {description}
          </p>
        </div>

        <div className="mt-4 sm:flex items-center justify-between space-y-4 sm:space-y-0">
          <div className="flex-1">
            <JoinCampModal refetch={refetch} campDetails={camp} />
          </div>
          <SocialShare campName={campName} />
        </div>
      </div>
    </div>
  );
};

export default CampDetails;
