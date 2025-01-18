/* eslint-disable react/prop-types */
import { Avatar, Button, Input, Typography } from "@material-tailwind/react";
import { useState } from "react";
import toast from "react-hot-toast";
import { BiPlusMedical } from "react-icons/bi";
import { LiaPenSolid } from "react-icons/lia";
import useAuth from "../hooks/useAuth";
import useAxiosSecure from "../hooks/useAxiosSecure";
import useDBUser from "../hooks/useDBUser";
import LoadingSpinner from "../page/shared/LoadingSpinner";
import { uploadPhotoDB } from "../utilites/utilites";

const Profile = ({ title }) => {
  const axiosSecure = useAxiosSecure();
  const { user, loading, updateUserProfile, setLoading } = useAuth();
  const [updateLoading, setUpdateLoading] = useState(false);
  // fetch user to db
  const { userDB, isLoading, refetch } = useDBUser();
  const [formData, setFormData] = useState({
    name: user?.displayName || "Anonymous",
    email: user?.email,
    photoURL:
      user?.photoURL ||
      "https://img.icons8.com/?size=100&id=20750&format=png&color=000000",
    phone: userDB?.phone,
    address: userDB?.address,
  });

  const [isEditing, setIsEditing] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, photoURL: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    // validate
    if (
      formData.name === "Anonymous" ||
      formData.photoURL ===
        "https://img.icons8.com/?size=100&id=20750&format=png&color=000000" ||
      !formData.name ||
      !formData.photoURL ||
      !formData.phone ||
      !formData.address
    ) {
      toast.error("Invalid file input");
      return;
    }
    try {
      setUpdateLoading(true);
      // upload photo
      const uploadedUrl = await uploadPhotoDB(null, formData.photoURL);

      formData.photoURL = uploadedUrl || formData.photoURL;

      // update firebase auth
      await updateUserProfile(formData.name, formData.photoURL);

      //   update mongoDB
      const updateUserData = {
        name: formData.name,
        photo: formData.photoURL,
        phone: formData.phone,
        address: formData.address,
      };
      const { data } = await axiosSecure.patch(
        `/user/${user.email}`,
        updateUserData
      );

      //   success message show
      toast.success(data?.message);
      setIsEditing(false);
      refetch();
    } catch (error) {
      toast.error(error.message);
    } finally {
      setUpdateLoading(false);
      setLoading(false);
    }
  };

  if (isLoading || loading) return <LoadingSpinner />;

  return (
    <div className="bg-gray-50 flex items-center justify-center sm:h-[calc(100vh-120px)]">
      <div className="bg-white rounded-lg shadow-md w-full max-w-lg p-2 sm:p-8">
        <Typography variant="h4" className="text-center mb-4">
          {title} Profile
        </Typography>
        <div className="flex flex-col items-center mb-6">
          {isEditing ? (
            <div className="relative">
              <Avatar
                src={formData.photoURL}
                alt="User Avatar"
                size="xl"
                withBorder
                className="mb-4"
              />
              <label
                htmlFor="photo-upload"
                className=" absolute cursor-pointer hover:underline top-0 -right-1 border bg-secondary p-0.5 rounded-full text-white  "
              >
                <LiaPenSolid className="" />
              </label>
              <input
                type="file"
                id="photo-upload"
                className="hidden"
                accept="image/*"
                onChange={handlePhotoUpload}
              />
            </div>
          ) : (
            <>
              <Avatar
                src={formData.photoURL}
                alt="User Avatar"
                size="xl"
                withBorder
                className="mb-4"
              />
              <h3 className="text-sm opacity-80">
                User ID: {userDB?._id || "#"}
              </h3>
            </>
          )}
        </div>
        <div className="space-y-4">
          {isEditing ? (
            <>
              <Input
                type="text"
                name="name"
                label="Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <Input
                type="text"
                name="phone"
                label="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                required
              />
              <Input
                type="text"
                name="address"
                label="Address"
                value={formData.address}
                onChange={handleChange}
                required
              />
            </>
          ) : (
            <>
              <div className="text-center">
                <Typography variant="h6" className="font-bold">
                  {formData.name}
                </Typography>
                <Typography variant="small" className="text-gray-600">
                  {formData.email}
                </Typography>
                {formData?.phone && (
                  <Typography variant="small" className="text-gray-600">
                    Phone: {formData?.phone}
                  </Typography>
                )}
                {formData?.address && (
                  <Typography variant="small" className="text-gray-600">
                    Address: {formData?.address}
                  </Typography>
                )}
              </div>
            </>
          )}
        </div>
        <div className="mt-6 flex justify-between">
          {isEditing ? (
            <Button
              onClick={handleSave}
              className="bg-accent hover:bg-secondary flex items-center "
            >
              {updateLoading && (
                <BiPlusMedical className="animate-spin size-4" />
              )}
              Save Changes
            </Button>
          ) : (
            <Button
              onClick={() => setIsEditing(true)}
              className="bg-accent hover:bg-secondary/80 "
            >
              Edit Profile
            </Button>
          )}
          {isEditing && (
            <Button
              onClick={() => setIsEditing(false)}
              className="bg-red-400 hover:bg-red-500"
            >
              Cancel
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
