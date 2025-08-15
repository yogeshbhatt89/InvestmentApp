import React from 'react'
import MarketNewsList from './MarketNewsList'
import LiveSearchSymbolLookup from './LiveSearchSymbolLookup'
import ButtonComponent from '@/modules/Button'
import CardWrapperComponent from '@/modules/CardWrapperComponent'
import TypographyComponent from '@/modules/TypographyComponent'
import NavbarComponent from '@/modules/NavbarComponent'

const LandingPage: React.FC = () => {
  return (
    <div>
      <NavbarComponent />
      <div className="max-w-lg mx-auto p-4 flex flex-col">
        <CardWrapperComponent className="max-w-lg mb-8">
          <div className="p-4 flex justify-center gap-4">
            <TypographyComponent
              variant="h2"
              className="text-lg font-bold text-center flex justify-center items-center"
            >
              Sign in to create a Portfolio
            </TypographyComponent>
            <ButtonComponent label="Sign In" variant="contained" color="primary" reduxId="login" />
          </div>
        </CardWrapperComponent>
        <div className="flex-1 mb-8">
          <LiveSearchSymbolLookup />
        </div>
        <div className="flex-1">
          <MarketNewsList category="general" minId={10} />
        </div>
      </div>
    </div>
  )
}

export default LandingPage
