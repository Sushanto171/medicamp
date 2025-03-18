import { Avatar, Button, Input, Typography } from "@material-tailwind/react";
import { useState } from "react";
import toast from "react-hot-toast";
import { BiPlusMedical } from "react-icons/bi";
import { LiaPenSolid } from "react-icons/lia";
import banner from "../assets/profile-banner.jpg";
import useAuth from "../hooks/useAuth";
import useAxiosSecure from "../hooks/useAxiosSecure";
import useDBUser from "../hooks/useDBUser";
import LoadingSpinner from "../page/shared/LoadingSpinner";
import { uploadPhotoDB } from "../utilities/utilities";

const Profile = () => {
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
    <div className="bg-gray-50 dark:bg-background-dark min-h-screen flex flex-col items-center relative">
      {/* Banner Section */}
      <div className="w-full h-48 overflow-hidden bg-primary flex justify-center items-center text-white text-3xl font-bold shadow-lg">
        <img src={banner} alt="" className="w-full object-top object-cover" />
      </div>

      {/* Update Profile action */}
      <div className="absolute mt-8 top-48 right-7">
        {isEditing ? (
          <Button
            onClick={handleSave}
            className="bg-accent hover:bg-secondary flex items-center"
          >
            {updateLoading && <BiPlusMedical className="animate-spin size-4" />}{" "}
            Save Changes
          </Button>
        ) : (
          <Button
            onClick={() => setIsEditing(true)}
            className="bg-accent hover:bg-secondary/80"
          >
            Edit Profile
          </Button>
        )}
        {isEditing && (
          <Button
            onClick={() => setIsEditing(false)}
            className="bg-red-400 hover:bg-red-500 mt-4"
          >
            Cancel
          </Button>
        )}
      </div>

      {/* Profile Section */}
      <div className=" w-full  pr-8 p-3 pt-0">
        <div className="flex items-center mb-6">
          {isEditing ? (
            <div>
              <h3 className="text-center mb-4 text-lg">
                {isEditing ? "Edit Profile" : ""}
              </h3>
              <div className="relative flex">
                <Avatar
                  src={formData.photoURL}
                  alt="User Avatar"
                  size="xl"
                  withBorder
                  className="mb-4"
                />
                <label
                  htmlFor="photo-upload"
                  className="absolute cursor-pointer hover:underline top-0 -right-1 border bg-secondary p-0.5 rounded-full text-white"
                >
                  <LiaPenSolid />
                </label>
                <input
                  type="file"
                  id="photo-upload"
                  className="hidden"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                />
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
        <div className="space-y-4 ">
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
            <div className="mx-auto ">
              <div className="flex items-center gap-6">
                <Avatar
                  src={formData.photoURL}
                  alt="User Avatar"
                  className="w-32 h-32 rounded-full ring-4 ring-primary"
                />
                <div>
                  <Typography className="text-3xl font-semibold text-gray-800 dark:text-gray-200">
                    {formData.name}
                  </Typography>
                  <p className="text-sm text-gray-500 dark:text-gray-200">
                    User ID: #12345
                  </p>
                </div>
              </div>

              <div className="mt-8 text-center">
                {/* About Me Section */}
                <Typography
                  variant="h5"
                  className="text-xl font-bold text-gray-700 dark:text-gray-200 mb-4"
                >
                  About Me
                </Typography>
                <p className="text-gray-600 dark:text-gray-400 text-lg">
                  Passionate software developer with experience in full-stack
                  development, specialized in creating scalable web
                  applications.
                </p>
              </div>

              <div className="mt-8 space-y-4">
                <h2 className="text-xl font-semibold text-gray-700 text-center dark:text-gray-200">
                  Contact Information
                </h2>
                <div className="px-12">
                  {/* Email */}
                  <div className="grid grid-cols-4  text-gray-600 dark:text-gray-400">
                    <span className="font-semibold col-span-2">Email:</span>
                    <span className="col-span-2">{formData.email}</span>
                  </div>

                  {/* Phone */}
                  {formData?.phone && (
                    <div className="grid grid-cols-4 text-gray-600 dark:text-gray-400">
                      <span className="font-semibold col-span-2">Phone:</span>
                      <span className="col-span-2">{formData?.phone}</span>
                    </div>
                  )}

                  {/* Address */}
                  {formData?.address && (
                    <div className="grid grid-cols-4 text-gray-600 dark:text-gray-400">
                      <span className="font-semibold col-span-2">Address:</span>
                      <span className="col-span-2">{formData?.address}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
