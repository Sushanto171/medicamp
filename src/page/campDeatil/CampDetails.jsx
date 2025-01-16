import { Button } from "@material-tailwind/react";
import { FaDollarSign } from "react-icons/fa";
import { FaUserDoctor } from "react-icons/fa6";
import { IoIosArrowRoundForward } from "react-icons/io";

import {
  MdAccessTime,
  MdDateRange,
  MdLocationOn,
  MdPeople,
} from "react-icons/md";
import { useLoaderData } from "react-router-dom";
import SocialShare from "./SocialShare";

const CampDetails = () => {
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
  } = useLoaderData() || {};

  return (
    <div className="flex flex-col lg:flex-row items-start gap-8 p-6 lg:p-12 bg-gray-50 min-h-screen">
      {/* Left: Image */}
      <div className="flex-1">
        <img
          src={image}
          alt="Camp"
          className="rounded-lg shadow-lg w-full max-h-[500px] object-cover"
          loading="lazy"
        />
      </div>

      {/* Right: Camp Details */}
      <div className="flex-1 space-y-2 sm:space-y-6">
        <h1 className="text-2xl lg:text-4xl font-bold text-primary">
          {campName}
        </h1>

        {/* Date and Time */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex items-center gap-2">
            <MdDateRange className="text-primary" />
            <span className="text-gray-500 font-medium hidden sm:block">
              Date:
            </span>
            <span className="text-text font-semibold">{date}</span>
          </div>
          <div className="flex items-center gap-2">
            <MdAccessTime className="text-primary" />
            <span className="text-gray-500 font-medium hidden sm:block">
              Time:
            </span>
            <span className="text-text font-semibold">{time}</span>
          </div>
        </div>

        {/* Location */}
        <div className="flex items-center gap-2">
          <MdLocationOn className="text-primary" />
          <span className="text-gray-500 font-medium hidden sm:block">
            Location:
          </span>
          <span className="text-text font-semibold">{location}</span>
        </div>

        {/* Camp Fees */}
        <div className="flex items-center gap-2">
          <FaDollarSign className="text-primary" />
          <span className="text-gray-500 font-medium hidden sm:block">
            Camp Fees:
          </span>
          <span
            className={`text-text font-semibold ${
              campFees === 0 ? "text-green-600" : ""
            }`}
          >
            {campFees ? `$${campFees}` : "Free"}
          </span>
        </div>

        {/* Healthcare Professional */}
        <div className="flex items-center gap-2">
          <FaUserDoctor className="text-primary" />
          <span className="text-gray-500 font-medium hidden sm:block">
            Healthcare Professional:
          </span>
          <span className="text-text font-semibold">
            {healthcareProfessional}
          </span>
        </div>

        {/* Participant Count */}
        <div className="flex items-center gap-2">
          <MdPeople className="text-primary" />
          <span className="text-gray-500 font-medium hidden sm:block">
            Participants:
          </span>
          <span className="text-text font-semibold">
            {participantCount} people
          </span>
        </div>

        {/* Description */}
        <div>
          <h2 className="text-lg font-medium text-primary text-pretty">
            Description:
          </h2>
          <p className="text-gray-700 leading-relaxed">{description}</p>
        </div>

        <div className="mt-4 sm:flex items-center justify-between space-y-4 sm:space-y-0">
          <div className="flex-1">
            <Button
              variant="text"
              className="flex items-center gap-1 bg-secondary text-white hover:text-primary border border-b-4 border-secondary group relative pr-12 hover:bg-accent/10"
            >
              Join Camp
              <IoIosArrowRoundForward className="text-2xl group-hover:right-3 absolute right-5 transition-all " />
            </Button>
          </div>
          <SocialShare campName={campName} />
        </div>
      </div>
    </div>
  );
};

export default CampDetails;
