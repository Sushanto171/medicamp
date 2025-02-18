/* eslint-disable react-refresh/only-export-components */
import {
  createUserWithEmailAndPassword,
  GithubAuthProvider,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import PropTypes from "prop-types";
import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { auth } from "../firebase/firebase.init";
import useAxiosPublic from "../hooks/useAxiosPublic";

export const AuthContext = createContext();

// provider
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const axiosPublic = useAxiosPublic();
  const [notifications, setNotifications] = useState([]);
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        // console.log("user --->", currentUser.email);
        setUser(currentUser);
        setLoading(false);
        const userData = {
          email: currentUser.email,
          name: currentUser?.displayName,
        };
        const { data } = await axiosPublic.post("/jwt", userData);

        localStorage.setItem("token", data?.token);
      } else {
        setUser(currentUser);
        setLoading(false);
        localStorage.setItem("token", "");
      }
    });
    return () => unSubscribe();
  }, [axiosPublic]);

  // handle dark/light mood
  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [dark]);

  const registerNow = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const joinNow = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const loginWithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };
  const LoginWithGithub = () => {
    setLoading(true);
    return signInWithPopup(auth, githubProvider);
  };

  const updateUserProfile = (name, photoUrl) => {
    setLoading(true);
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photoUrl,
    });
  };

  const signOutUser = async () => {
    setLoading(true);
    await signOut(auth);
    toast.success("Sign out success");
  };

  const authInfo = {
    user,
    loading,
    setLoading,
    joinNow,
    loginWithGoogle,
    updateUserProfile,
    registerNow,
    signOutUser,
    notifications,
    setNotifications,
    LoginWithGithub,
    dark,
    setDark,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children} </AuthContext.Provider>
  );
};
AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthProvider;
