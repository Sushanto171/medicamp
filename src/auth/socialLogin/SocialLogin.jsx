import LoginWithFacebook from "./LoginWithFacebook";
import LoginWithGoogle from "./LoginWithGoogle";

const SocialLogin = () => {
  return (
    <>
      <div className="text-center my-6 border-t-2 relative flex justify-center items-center">
        <span className="absolute -top-3 bg-white px-4 opacity-70">OR</span>
      </div>
      <div className="flex items-center my-2 justify-center">
        <LoginWithGoogle /> <LoginWithFacebook />
      </div>
    </>
  );
};

export default SocialLogin;
