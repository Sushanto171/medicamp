import { Avatar, Button, Input, Typography } from "@material-tailwind/react";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import toast from "react-hot-toast";
import { LiaPenSolid } from "react-icons/lia";
import useAuth from "../hooks/useAuth";
import useAxiosSecure from "../hooks/useAxiosSecure";
import LoadingSpinner from "../page/shared/LoadingSpinner";
import { uploadPhotoDB } from "../utilites/utilites";

const Profile = () => {
  const axiosSecure = useAxiosSecure();
  const { user, loading, updateUserProfile, setLoading } = useAuth();
  const [updateLoading, setUpdateLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.displayName || "Anonymous",
    email: user?.email,
    photoURL:
      user?.photoURL ||
      "https://img.icons8.com/?size=100&id=20750&format=png&color=000000",
  });

  // fetch user to db
  const { data: userDB = {}, isLoading } = useQuery({
    queryKey: ["userDB", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure(`/user/${user?.email}`);
      return data?.data;
    },
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
      !formData.photoURL
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
      };
      const { data } = await axiosSecure.patch(
        `/user/${user.email}`,
        updateUserData
      );

      //   success message show
      toast.success(data?.message);
      setIsEditing(false);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setUpdateLoading(false);
      setLoading(false);
    }
  };
  console.log({ isLoading, loading, updateLoading });
  if (isLoading || loading || updateLoading) return <LoadingSpinner />;

  return (
    <div className="bg-gray-50 flex items-center justify-center sm:h-[calc(100vh-120px)]">
      <div className="bg-white rounded-lg shadow-md w-full max-w-lg p-2 sm:p-8">
        <Typography variant="h4" className="text-center mb-4">
          Organizer Profile
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
              {/* <Input
                type="email"
                name="email"
                label="Email"
                value={formData.email}
                onChange={handleChange}
                required
              /> */}
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
              </div>
            </>
          )}
        </div>
        <div className="mt-6 flex justify-between">
          {isEditing ? (
            <Button
              onClick={handleSave}
              className="bg-accent hover:bg-secondary"
            >
              Save Changes
            </Button>
          ) : (
            <Button
              onClick={() => setIsEditing(true)}
              className="bg-gray-500 hover:bg-gray-600"
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
