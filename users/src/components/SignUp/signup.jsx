import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import "./signup.css";

import axios from "axios";

function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();  // Create history object

  const onSubmit = async (data) => {
    if (data.password !== data.confirmpassword) {
      alert('Passwords do not match!');
      return;
    }
  
    try {
      const response = await axios.post(
        "https://comp305groupproject.onrender.com/api/users",
        {
          username: data.userName,
          email: data.email,
          password: data.password,
        }
      );
  
      console.log(response.data); // Assuming the server sends back some data
      alert("User successfully created!");


      //direct to the profile page
      const responseAdded = await axios.get(`https://comp305groupproject.onrender.com/api/users/username/${data.userName}`);

      // Assuming the response data contains the user ID
      const userId = responseAdded.data._id;

      // Redirect to the profile page with the user ID as a parameter
      navigate(`/profile/${userId}`);
    } catch (error) {
      console.error("Error creating user:", error);
      alert("Error creating user. Please try again later.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="hook">
      {/* Title */}
      <h1 className="hook__title">Sign Up</h1>

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

      {/* email */}
      <label className="hook__text">Email</label>
      <input
        type="email"
        className="hook__input"
        {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
      />
      {errors.email && (
        <p className="hook__error">Email is required and must be valid</p>
      )}

      {/* password */}
      <label className="hook__text">Password</label>
      <input
        type="password"
        className="hook__input"
        {...register("password", { required: true })}
      />
      {errors.password && <p className="hook__error">Password is required</p>}

      {/* confirm password */}
      <label className="hook__text">Confirm Password</label>
      <input
        type="password"
        className="hook__input"
        {...register("confirmpassword", { required: true})}
      />
      {errors.confirmpassword && <p className="hook__error">Confirm Password is required</p>}

      <button className="hook__button" type="submit">
        Sign Up
      </button>
    </form>
  );
}

export default LoginForm;
