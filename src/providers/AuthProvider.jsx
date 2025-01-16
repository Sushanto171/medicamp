/* eslint-disable react-refresh/only-export-components */
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import PropTypes from "prop-types";
import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase/firebase.init";
import useAxiosPublic from "../hooks/useAxiosPublic";

export const AuthContext = createContext();

// provider
const googleProvider = new GoogleAuthProvider();
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const axiosPublic = useAxiosPublic();

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        console.log("user --->", currentUser.email);
        setUser(currentUser);
        setLoading(false);
        const userData = {
          email: currentUser.email,
          name: currentUser?.displayName,
        };
        const { data } = await axiosPublic.post("/jwt", userData);
        // console.log(data);
        localStorage.setItem("token", data?.token);
      } else {
        console.log("log out", currentUser);
        setUser(currentUser);
        setLoading(false);
        localStorage.setItem("token", "");
      }
    });
    return () => unSubscribe();
  }, [axiosPublic]);

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
  };
  return (
    <AuthContext.Provider value={authInfo}>{children} </AuthContext.Provider>
  );
};
AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthProvider;
