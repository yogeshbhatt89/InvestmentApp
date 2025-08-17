import React from 'react'
import TypographyComponent from '@/modules/TypographyComponent'
import ButtonComponent from '@/modules/Button'
import DialogComponent from '@/modules/Dialog/DialogComponent'
import useDialog from '@/modules/Dialog/useDialog'
import LoginComponent from '@/features/auth/LoginComponent'

const SignIn: React.FC = () => {
  const { openDialog } = useDialog()

  const handleSignInClick = () => {
    openDialog('', <LoginComponent />)
  }

  return (
    <div className="p-4 flex justify-center gap-4">
      <TypographyComponent
        variant="h2"
        className="text-lg font-bold text-center flex justify-center items-center"
      >
        Lets get started!
      </TypographyComponent>
      <ButtonComponent
        label="Sign In"
        variant="contained"
        color="primary"
        reduxId="login"
        onClick={handleSignInClick}
      />
      <DialogComponent />
    </div>
  )
}

export default SignIn
