// import React, { useEffect } from 'react'
// import { useNavigate } from 'react-router-dom'
// import { useLogin } from '@/services/auth/useLogin'
// import TextFieldComponent, { useTextField } from '@/modules/TextField'
// import ButtonComponent from '@/modules/Button'
// import BackdropComponent from '@/modules/Backdrop'
// import BoxComponent from '@/modules/BoxComponent'

// const LoginComponent = () => {
//   const navigate = useNavigate()
//   const { login, isLoading, backdropOpen, isSuccess } = useLogin()

//   const {
//     getTextFieldValue: email,
//     setTextFieldValue: setEmail,
//     isEmpty: isEmailEmpty,
//     clearValue: clearEmail,
//   } = useTextField('email')

//   const {
//     getTextFieldValue: password,
//     setTextFieldValue: setPassword,
//     isEmpty: isPasswordEmpty,
//     clearValue: clearPassword,
//   } = useTextField('password')

//   const handleLoginSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     await login({ email, password })
//   }

//   const handleRegisterClick = () => {
//     navigate('/register')
//   }

//   useEffect(() => {
//     if (isSuccess) {
//       clearEmail()
//       clearPassword()
//       navigate('/home')
//     }
//   }, [isSuccess, navigate, clearEmail, clearPassword])

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
//       <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
//         <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Login</h2>
//         <BoxComponent component="form" onSubmit={handleLoginSubmit} noValidate>
//           <TextFieldComponent
//             label="Email"
//             value={email}
//             onChange={e => setEmail(e.target.value)}
//           />
//           <TextFieldComponent
//             label="Password"
//             type="password"
//             value={password}
//             onChange={e => setPassword(e.target.value)}
//           />
//           <div className="mt-6 flex flex-col sm:flex-row gap-4">
//             <ButtonComponent
//               label="Login"
//               type="submit"
//               disabled={isLoading || isEmailEmpty || isPasswordEmpty}
//             />
//             <ButtonComponent
//               label="Go to Register"
//               onClick={handleRegisterClick}
//               variant="outlined"
//             />
//           </div>
//         </BoxComponent>
//         <BackdropComponent open={backdropOpen} />
//       </div>
//     </div>
//   )
// }

// export default LoginComponent
