import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

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
    <form onSubmit={handleSubmit(onSubmit)} className="container mt-4">
      <h1 className="mb-4">Sign Up</h1>

      <div className="mb-3">
        <label htmlFor="userName" className="form-label">User Name</label>
        <input
          type="text"
          className={`form-control ${errors.userName ? 'is-invalid' : ''}`}
          id="userName"
          {...register("userName", { required: true })}
        />
        {errors.userName && (
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
        Sign Up
      </button>
    </form>
  );
}

export default LoginForm;
