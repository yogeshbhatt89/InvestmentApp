import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRegister } from "../../services/auth/useRegister";
import TextFieldComponent from "../../modules/TextFieldComponent";
import ButtonComponent from "../../modules/ButtonComponent";
import BackdropComponent from "../../modules/BackdropComponent";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

// Define the validation schema using yup
const validationSchema = yup.object({
  username: yup.string().required("Username is required"),
  email: yup
    .string()
    .matches(
      /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Enter a valid email"
    )
    .required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  fullName: yup.string().required("Full Name is required"),
});

const RegisterComponent = () => {
  const { register, isLoading, backdropOpen, isSuccess } = useRegister();
  const navigate = useNavigate();

  // Setup react-hook-form with validation
  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(validationSchema),
  });

  interface FormData {
    username: string;
    email: string;
    password: string;
    fullName: string;
  }
  // Handle form submission
  const onSubmit = async (data: FormData) => {
    await register({
      username: data.username,
      email: data.email,
      password: data.password,
      fullName: data.fullName,
    });
  };

  useEffect(() => {
    if (isSuccess) {
      navigate("/login");
    }
  }, [isSuccess, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Register</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Username Field */}
          <Controller
            name="username"
            control={control}
            render={({ field }) => (
              <TextFieldComponent
                label="Username"
                name="username"
                value={field.value}
                onChange={field.onChange}
                fullWidth
                error={!!errors.username}
                helperText={errors.username?.message}
              />
            )}
          />

          {/* Email Field */}
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <TextFieldComponent
                label="Email"
                name="email"
                value={field.value}
                onChange={field.onChange}
                fullWidth
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            )}
          />

          {/* Password Field */}
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <TextFieldComponent
                label="Password"
                name="password"
                type="password"
                value={field.value}
                onChange={field.onChange}
                fullWidth
                error={!!errors.password}
                helperText={errors.password?.message}
              />
            )}
          />

          {/* Full Name Field */}
          <Controller
            name="fullName"
            control={control}
            render={({ field }) => (
              <TextFieldComponent
                label="Full Name"
                name="fullName"
                value={field.value}
                onChange={field.onChange}
                fullWidth
                error={!!errors.fullName}
                helperText={errors.fullName?.message}
              />
            )}
          />

          {/* Register Button */}
          <ButtonComponent
            label="Register"
            type="submit"
            fullWidth
            disabled={isLoading}
            className="mt-4"
          />
        </form>

        <BackdropComponent open={backdropOpen} />
      </div>
    </div>
  );
};

export default RegisterComponent;
