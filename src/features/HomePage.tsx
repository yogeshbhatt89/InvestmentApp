import React from 'react'
import NavbarComponent from '@/modules/NavbarComponent'
import TabComponent from '@/modules/Tab'
import BoxComponent from '@/modules/BoxComponent'
// import SearchComponent from '@/modules/SearchComponent'

const HomePage = () => {
  const tabs = [
    {
      label: 'Overview',
      content: <div>Overview content goes here</div>,
    },
    {
      label: 'Portfolio',
      content: <div>Portfolio content goes here</div>,
    },
    {
      label: 'Markets',
      content: <div>Markets content goes here</div>,
    },
    {
      label: 'Search',
      content: (
        <div>
          {/* <SearchComponent /> */}
          Search content goes here
        </div>
      ),
    },
  ]

  return (
    <div>
      <NavbarComponent />
      <BoxComponent display="flex" justifyContent="center" alignItems="center">
        <TabComponent reduxId="home-tabs" tabs={tabs} />
      </BoxComponent>
    </div>
  )
}

export default HomePage
