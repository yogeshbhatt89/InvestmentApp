import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirection
import { useLogin } from "../../services/auth/useLogin"; // Your custom useLogin hook
import TextFieldComponent, { useTextField } from "../../modules/TextFieldComponent"; // Your custom TextFieldComponent
import ButtonComponent from "../../modules/ButtonComponent"; // Your custom ButtonComponent
import BackdropComponent from "../../modules/BackdropComponent"; // Your custom BackdropComponent

const LoginComponent = () => {
  const navigate = useNavigate(); // Use navigate hook for redirection
  const { login, isLoading, backdropOpen, isSuccess } = useLogin(); // Get login and backdropOpen from useLogin

  const { value: email, handleChange: handleEmailChange } = useTextField("email");
  const { value: password, handleChange: handlePasswordChange } = useTextField("password");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login({ email, password });
  };

  // Redirect to Home page on successful login
  useEffect(() => {
    if (isSuccess) {
      navigate("/home"); // Redirect to Home page on successful login
    }
  }, [isSuccess, navigate]);

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <TextFieldComponent
          label="Email"
          name="email"
          value={email}
          onChange={handleEmailChange}
        />
        <TextFieldComponent
          label="Password"
          name="password"
          type="password"
          value={password}
          onChange={handlePasswordChange}
        />
        <ButtonComponent
          label="Login"
          type="submit"
          fullWidth
          disabled={isLoading}
          className="mt-4"
        />
      </form>

      <BackdropComponent open={backdropOpen} />
    </div>
  );
};

export default LoginComponent;
