import axios from "axios";
import toast from "react-hot-toast";

export const uploadPhotoDB = async (photo) => {
  try {
    const formData = new FormData();
    formData.append("image", photo[0]);
    const { data } = await axios.post(
      `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API}`,
      formData
    );
    return data?.data?.url;
  } catch (error) {
    toast.error(error.message);
  }
};
