/* eslint-disable react/prop-types */
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import {
  FaCalendarAlt,
  FaClock,
  FaDollarSign,
  FaUserMd,
  FaUsers,
} from "react-icons/fa";
import { Link } from "react-router-dom";

export function PopularCampsCard({
  campName,
  image,
  campFees,
  date,
  time,

  healthcareProfessional,
  participantCount,
  _id,
}) {
  return (
    <Card
      variant="gradient"
      className="w-full bg-accent/30 p-3 max-w-[24rem]  mx-auto md:max-w-[24rem] dark:text-white lg:max-w-[32rem] pb-2 !flex flex-col justify-between"
    >
      <CardHeader
        floated={false}
        shadow={false}
        color="transparent"
        className="m-0 mb-3 rounded-none border-b border-white/10  text-center"
      >
        <img
          src={image}
          alt={`${campName}'s photo`}
          className="h-40 w-full object-cover rounded-lg"
        />
      </CardHeader>

      <CardBody className="p-0">
        <ul className="grid grid-cols-2 gap-1 ">
          <li className="flex items-center gap-2 col-span-full">
            <FaCalendarAlt className="text-blue-500" />
            <Typography className="font-semibold text-lg truncate">
              {campName}
            </Typography>
          </li>

          <li className="flex items-center gap-2 col-span-full">
            <FaUserMd className="text-indigo-500" />
            <Typography className="font-medium">
              {healthcareProfessional}
            </Typography>
          </li>

          {/* <li className="flex items-center gap-2 col-span-full">
            <FaMapMarkerAlt className="text-red-500" />
            <Typography className="font-medium">{location}</Typography>
          </li> */}

          <li className="flex items-center gap-2">
            <FaCalendarAlt className="text-orange-500" />
            <Typography className="font-medium">{date}</Typography>
          </li>

          <li className="flex items-center gap-2">
            <FaClock className="text-purple-500" />
            <Typography className="font-medium">{time}</Typography>
          </li>

          <li className="flex items-center gap-2">
            <FaDollarSign className="text-green-500" />
            <Typography className="font-medium">{campFees} $</Typography>
          </li>

          <li className="flex items-center gap-2">
            <FaUsers className="text-teal-500" />
            <Typography className="font-medium">
              {participantCount} Joined
            </Typography>
          </li>
        </ul>
      </CardBody>

      <CardFooter className="mt-3 p-0">
        <Link to={`/camp-details/${_id}`}>
          <Button
            size="lg"
            className="hover:scale-[1.02] bg-accent focus:scale-[1.02] active:scale-100 text-text"
            ripple={false}
            fullWidth={true}
          >
            See Details
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
