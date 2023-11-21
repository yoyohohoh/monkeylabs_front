// ProfileForm.js
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom"; // Import useParams
import "./profile.css";
import axios from "axios";
import { useEffect, useState } from "react";

function ProfileForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  // Use useParams to get the user ID from the URL
  const { userId } = useParams();

  // State to store user details
  const [userDetails, setUserDetails] = useState({
    username: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    axios
      .get(`https://comp305groupproject.onrender.com/api/users/${userId}`)
      .then((response) => {
        setUserDetails(response.data);
      })
      .catch((error) => {
        console.error("Error fetching user details:", error);
      });
  }, [userId]);

  useEffect(() => {
    console.log("userDetails:", userDetails);
    setValue("username", userDetails.username);
    setValue("email", userDetails.email);
    setValue("password", userDetails.password);
  }, [userDetails, setValue]);

  const onSubmit = async (data) => {
    if (data.password !== data.confirmpassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const response = await axios.put(
        `https://comp305groupproject.onrender.com/api/users/${userId}`,
        {
          username: data.username,
          email: data.email,
          password: data.password,
        }
      );

      console.log(response.data); // Assuming the server sends back some data
      alert("User successfully updated!");
    } catch (error) {
      console.error("Error updating user:", error);
      alert("Error updating user. Please try again later.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="hook">
      {/* Title */}
      <h1 className="hook__title">Profile</h1>

      {/* User Name */}
      <label className="hook__text">User Name</label>
      <input
        type="username"
        className="hook__input"
        {...register("username", { required: true })}
        defaultValue={userDetails.username}
      />
      {errors.username && (
        <p className="hook__error">User Name is required and must be valid</p>
      )}

      {/* Email */}
      <label className="hook__text">Email</label>
      <input
        type="email"
        className="hook__input"
        {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
        defaultValue={userDetails.email}
      />
      {errors.email && (
        <p className="hook__error">Email is required and must be valid</p>
      )}

      {/* Password */}
      <label className="hook__text">Password</label>
      <input
        type="password"
        className="hook__input"
        {...register("password", { required: true })}
        defaultValue={userDetails.password}
      />
      {errors.password && (
        <p className="hook__error">Password is required</p>
      )}

      {/* Confirm Password */}
      <label className="hook__text">Confirm Password</label>
      <input
        type="password"
        className="hook__input"
        {...register("confirmpassword", { required: true })}
        
      />
      {errors.confirmpassword && (
        <p className="hook__error">Confirm Password is required</p>
      )}

      {/* Submit Button */}
      <button className="hook__button" type="submit">
        Update
      </button>
    </form>
  );
}

export default ProfileForm;
