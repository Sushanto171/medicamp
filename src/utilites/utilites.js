import axios from "axios";
import toast from "react-hot-toast";

export const uploadPhotoDB = async (photo, base64 = null) => {
  try {
    const formData = new FormData();
    if (base64) {
      formData.append("image", base64.split(",")[1]);
      const data = formData.get("image");

      if (data === "undefined" || data === undefined || !data) {
        return;
      }
    }
    if (photo) {
      formData.append("image", photo[0]);
    }
    const { data } = await axios.post(
      `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API}`,
      formData
    );
    return data?.data?.url;
  } catch (error) {
    toast.error(error.message);
  }
};

export const saveUserDataDB = async (userData, axiosPublic) => {
  try {
    const { data } = await axiosPublic.post(
      `/users/${userData.email}`,
      userData
    );
    return data.data;
  } catch (error) {
    toast.error(error.message);
  }
};

export const scrollToTop = (behavior = "smooth") => {
  window.scrollTo({
    top: 0,
    behavior,
  });
};
