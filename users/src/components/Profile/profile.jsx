import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

function ProfileForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const { userId } = useParams();
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
    // Setting form values
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
    <form onSubmit={handleSubmit(onSubmit)} className="container mt-4">
      <h1 className="mb-3">Profile</h1>

      <div className="mb-3">
        <label htmlFor="username" className="form-label">User Name</label>
        <input
          type="text"
          className={`form-control ${errors.username ? 'is-invalid' : ''}`}
          id="username"
          {...register("username", { required: true })}
          defaultValue={userDetails.username}
        />
        {errors.username && (
          <div className="invalid-feedback">User Name is required and must be valid</div>
        )}
      </div>

      <div className="mb-3">
        <label htmlFor="email" className="form-label">Email</label>
        <input
          type="email"
          className={`form-control ${errors.email ? 'is-invalid' : ''}`}
          id="email"
          {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
          defaultValue={userDetails.email}
        />
        {errors.email && (
          <div className="invalid-feedback">Email is required and must be valid</div>
        )}
      </div>

      <div className="mb-3">
        <label htmlFor="password" className="form-label">Password</label>
        <input
          type="password"
          className={`form-control ${errors.password ? 'is-invalid' : ''}`}
          id="password"
          {...register("password", { required: true })}
          defaultValue={userDetails.password}
        />
        {errors.password && (
          <div className="invalid-feedback">Password is required</div>
        )}
      </div>

      <div className="mb-3">
        <label htmlFor="confirmpassword" className="form-label">Confirm Password</label>
        <input
          type="password"
          className={`form-control ${errors.confirmpassword ? 'is-invalid' : ''}`}
          id="confirmpassword"
          {...register("confirmpassword", { required: true })}
        />
        {errors.confirmpassword && (
          <div className="invalid-feedback">Confirm Password is required</div>
        )}
      </div>

      <button className="btn btn-primary" type="submit">
        Update
      </button>
    </form>
  );
}

export default ProfileForm;