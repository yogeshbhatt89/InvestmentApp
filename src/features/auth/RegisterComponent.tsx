import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRegister } from '@/services/auth/useRegister';
import { useLogin } from '@/services/auth/useLogin';
import DataFieldComponent from '@/modules/DataFieldComponent';
import ButtonComponent from '@/modules/Button';
import BoxComponent from '@/modules/BoxComponent';
import useDialog from '@/modules/Dialog/useDialog';
import LoginComponent from './LoginComponent';
// import { countries, languages } from '@/data';
import { DataField } from '@/modules/DataFieldComponent';
import { useTextField } from '@/modules/TextField/useTextField';
import { useDropdown } from '@/modules/Dropdown/useDropdown';
import { useDatePicker } from '@/modules/DatePicker/useDatePicker';
import { useCountries } from '@/services/utils/useLookups';
import { useLanguages } from '@/services/utils/useLookups';
import { DropdownOption } from '@/modules/Dropdown/DropdownComponent';

const RegisterComponent = () => {
  const { register, isLoading: isRegistering, isSuccess: isRegisterSuccess } = useRegister();
  const { login, isSuccess: isLoginSuccess } = useLogin();
  const { countries } = useCountries();
  const formattedCountries = countries?.map((country) => ({
    value: country.id,
    label: country.name,
  })) as DropdownOption[];
  const { languages } = useLanguages();

  const formattedLanguages = languages?.map((language) => ({
    value: language.id,
    label: language.name,
  })) as DropdownOption[];
  const navigate = useNavigate();
  const { openDialog } = useDialog();
  const { value: birthday } = useDatePicker('birthday');
  const { getTextFieldValue: firstName } = useTextField('firstName');
  const { getTextFieldValue: lastName } = useTextField('lastName');
  const { getTextFieldValue: email } = useTextField('email');
  const { getTextFieldValue: username } = useTextField('username');
  const { getTextFieldValue: password } = useTextField('password');
  const { selectedValue: country } = useDropdown('country');
  const { selectedValue: language } = useDropdown('language');
  const { getTextFieldValue: profilePictureUrl } = useTextField('profilePictureUrl');

  const [errors, _setErrors] = useState<{ [key: string]: string }>([]);
  const [touched, setTouched] = useState({
    firstName: false,
    lastName: false,
    email: false,
    username: false,
    passwordHash: false,
    birthday: false,
    country: false,
    language: false,
    profilePictureUrl: false,
  });
  const [pendingLogin, setPendingLogin] = useState<{ email: string; password: string } | null>(null);

  const handleBlur = (field: string) => {
    setTouched((prevTouched) => ({ ...prevTouched, [field]: true }));
  };

  // const handleChange = (field: string, value: string) => {
  //   setErrors((prevErrors) => ({ ...prevErrors, [field]: validateField(field, value) }));
  // };

  // const validateField = (field: string, value: string) => {
  //   switch (field) {
  //     case 'email':
  //       if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
  //         return 'Invalid email address';
  //       }
  //       break;
  //     case 'password':
  //       if (value.length < 8) {
  //         return 'Password must be at least 8 characters long';
  //       }
  //       break;
  //     case 'username':
  //       if (value.length < 3) {
  //         return 'Username must be at least 3 characters long';
  //       }
  //       break;
  //     case 'firstName':
  //     case 'lastName':
  //       if (value.trim() === '') {
  //         return 'First name and last name are required';
  //       }
  //       break;
  //     case 'birthday':
  //       if (!value) {
  //         return 'Birthday is required';
  //       }
  //       break;
  //     case 'country':
  //     case 'language':
  //       if (!value) {
  //         return 'Country and language are required';
  //       }
  //       break;
  //     default:
  //       return '';
  //   }
  //   return '';
  // };

  const fields: DataField[] = [
    {
      label: 'First Name',
      type: 'text',
      reduxId: 'firstName',
      error: touched.firstName && !!errors.firstName,
      helperText: touched.firstName ? errors.firstName : '',
      onBlur: () => handleBlur('firstName'),
    },
    {
      label: 'Last Name',
      type: 'text',
      reduxId: 'lastName',
      error: touched.lastName && !!errors.lastName,
      helperText: touched.lastName ? errors.lastName : '',
      onBlur: () => handleBlur('lastName'),
    },
    {
      label: 'Email',
      type: 'email',
      reduxId: 'email',
      error: touched.email && !!errors.email,
      helperText: touched.email ? errors.email : '',
    },
    {
      label: 'Username',
      type: 'text',
      reduxId: 'username',
      error: touched.username && !!errors.username,
      helperText: touched.username ? errors.username : '',
    },
    {
      label: 'Password',
      type: 'password',
      reduxId: 'password',
      error: touched.passwordHash && !!errors.passwordHash,
      helperText: touched.passwordHash ? errors.passwordHash : '',
    },
    {
      label: 'Birthday',
      type: 'date',
      reduxId: 'birthday',
      error: touched.birthday && !!errors.birthday,
      helperText: touched.birthday ? errors.birthday : '',
    },
    {
      label: 'Country',
      type: 'select',
      reduxId: 'country',
      options: formattedCountries || [],
      error: touched.country && !!errors.country,
      helperText: touched.country ? errors.country : '',
    },
    {
      label: 'Language',
      type: 'select',
      reduxId: 'language',
      options: formattedLanguages || [],
      error: touched.language && !!errors.language,
      helperText: touched.language ? errors.language : '',
    },
    {
      label: 'Profile Picture',
      type: 'icon',
      reduxId: 'profilePictureUrl',
      error: touched.profilePictureUrl && !!errors.profilePictureUrl,
      helperText: touched.profilePictureUrl ? errors.profilePictureUrl : '',
    },
  ];

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const hasError = Object.values(errors).some(Boolean);
    if (hasError) {
      // Display error messages to the user
      return;
    }
    // Submit the form
    await register({
      firstName,
      lastName,
      email,
      username,
      password,
      birthday: birthday,
      country: String(country),
      language: String(language),
      profilePictureUrl: profilePictureUrl,
    });
    setPendingLogin({ email: email, password: password }); // Save credentials for auto-login
  };

  useEffect(() => {
    // After registration success, trigger login
    if (isRegisterSuccess && pendingLogin) {
      login(pendingLogin);
    }
    // eslint-disable-next-line
  }, [isRegisterSuccess, pendingLogin]);

  useEffect(() => {
    // After login success, clear fields and navigate to home
    if (isLoginSuccess) {
      navigate('/home');
    }
    // eslint-disable-next-line
  }, [isLoginSuccess]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Register</h2>
        <BoxComponent component="form" onSubmit={handleRegisterSubmit} noValidate>
          <DataFieldComponent fields={fields} />
          <div className="mt-6 flex flex-col sm:flex-row gap-4">
            <ButtonComponent
              reduxId="register"
              label="Register"
              type="submit"
              disabled={isRegistering}
            />
            <ButtonComponent
              reduxId="goToLogin"
              label="Go to Login"
              type="button"
              onClick={() => openDialog('', <LoginComponent />)}
              variant="outlined"
            />
          </div>
        </BoxComponent>
      </div>
    </div>
  );
};

export default RegisterComponent;
