import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRegister } from "../../services/auth/useRegister";
import TextFieldComponent from "../../modules/TextFieldComponent";
import ButtonComponent from "../../modules/ButtonComponent";
import BackdropComponent from "../../modules/BackdropComponent";
import ContainerComponent from "../../modules/ContainerComponent";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const validationSchema = yup.object({
  username: yup.string().required("Username is required"),
  email: yup
    .string()
    .matches(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Enter a valid email")
    .required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  fullName: yup.string().required("Full Name is required"),
});

interface FormData {
  username: string;
  email: string;
  password: string;
  fullName: string;
}

const RegisterComponent = () => {
  const { register, isLoading, backdropOpen, isSuccess } = useRegister();
  const navigate = useNavigate();

  const { control, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (data: FormData) => {
    await register(data);
  };

  useEffect(() => {
    if (isSuccess) {
      navigate("/login");
    }
  }, [isSuccess, navigate]);

  const handleGoToLogin = () => {
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <ContainerComponent maxWidth="sm">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full">
          <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Register</h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Controller
              name="username"
              control={control}
              render={({ field }) => (
                <TextFieldComponent
                  label="Username"
                  name="username"
                  value={field.value}
                  onChange={field.onChange}
                  error={!!errors.username}
                  helperText={errors.username?.message}
                />
              )}
            />

            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <TextFieldComponent
                  label="Email"
                  name="email"
                  value={field.value}
                  onChange={field.onChange}
                  error={!!errors.email}
                  helperText={errors.email?.message}
                />
              )}
            />

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
                  error={!!errors.password}
                  helperText={errors.password?.message}
                />
              )}
            />

            <Controller
              name="fullName"
              control={control}
              render={({ field }) => (
                <TextFieldComponent
                  label="Full Name"
                  name="fullName"
                  value={field.value}
                  onChange={field.onChange}
                  error={!!errors.fullName}
                  helperText={errors.fullName?.message}
                />
              )}
            />

            <ButtonComponent
              label="Register"
              type="submit"
              disabled={isLoading}
              className="mt-2"
            />

            <ButtonComponent
              label="Go to Login"
              type="button"
              onClick={handleGoToLogin}
              variant="outlined"
              className="mt-2"
            />
          </form>

          <BackdropComponent open={backdropOpen} />
        </div>
      </ContainerComponent>
    </div>
  );
};

export default RegisterComponent;
