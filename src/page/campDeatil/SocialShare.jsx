/* eslint-disable react/prop-types */
import {
  FaFacebookF,
  FaLinkedinIn,
  FaShare,
  FaTwitter,
  FaWhatsapp,
} from "react-icons/fa";
const SocialShare = ({ campName }) => {
  const shareURL = window.location.href;
  const encodedURL = encodeURIComponent(shareURL);
  const encodedText = encodeURIComponent(`Check out this camp: ${campName}`);

  const socialLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedURL}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodedURL}&text=${encodedText}`,
    whatsapp: `https://api.whatsapp.com/send?text=${encodedText} - ${encodedURL}`,
    linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${encodedURL}&title=${encodedText}`,
  };
  return (
    <>
      {/* Social Share Buttons */}
      <div className=" gap-4  flex items-center scale-75 sm:scale-100 ">
        <h2 className="text-lg font-medium text-primary flex items-center  ">
          <FaShare />
          Social Share
        </h2>
        <div className="flex gap-4">
          <a
            href={socialLinks.facebook}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 flex items-center justify-center bg-blue-600 text-white rounded-full hover:bg-blue-700"
          >
            <FaFacebookF />
          </a>
          <a
            href={socialLinks.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 flex items-center justify-center bg-blue-400 text-white rounded-full hover:bg-blue-500"
          >
            <FaTwitter />
          </a>
          <a
            href={socialLinks.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 flex items-center justify-center bg-green-500 text-white rounded-full hover:bg-green-600"
          >
            <FaWhatsapp />
          </a>
          <a
            href={socialLinks.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 flex items-center justify-center bg-blue-700 text-white rounded-full hover:bg-blue-800"
          >
            <FaLinkedinIn />
          </a>
        </div>
      </div>
    </>
  );
};

export default SocialShare;
