import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import "./login.css";

import axios from "axios";

function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();  // Create history object

  const onSubmit = async (data) => {
    try {
      const response = await axios.get(`https://comp305groupproject.onrender.com/api/users/username/${data.userName}`);

      if(response.data.password !== data.password) {
        alert("Incorrect password. Please try again.");
        return;
      }
      // Check if the user was found
      if (response.status === 200) {
        // Assuming the response data contains the user ID
        const userId = response.data._id;

        // Redirect to the profile page with the user ID as a parameter
        navigate(`/profile/${userId}`);
      } else {
        // Handle the case where the user was not found
        alert("User not found. Please check the username.");
      }
    } catch (error) {
      console.error("Error fetching user by username:", error);
      alert("Error fetching user by username. Please try again later.");
    }
  };


  return (
    <form onSubmit={handleSubmit(onSubmit)} className="hook">
      {/* Title */}
      <h1 className="hook__title">Login</h1>

      {/* username */}
      <label className="hook__text">User Name</label>
      <input
        type="userName"
        className="hook__input"
        {...register("userName", { required: true})}
      />
      {errors.userName && (
        <p className="hook__error">User Name is required and must be valid</p>
      )}

      {/* password */}
      <label className="hook__text">Password</label>
      <input
        type="password"
        className="hook__input"
        {...register("password", { required: true })}
      />
      {errors.password && <p className="hook__error">Password is required</p>}

      <button className="hook__button" type="submit">
        Log In
      </button>
    </form>
  );
}

export default LoginForm;
