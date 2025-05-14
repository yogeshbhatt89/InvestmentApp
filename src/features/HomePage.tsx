// import { useState } from 'react'

// import NavbarComponent from '../modules/NavbarComponent'
// import TabComponent from '../modules/TabComponent'
// import BoxComponent from '../modules/BoxComponent'
// import SearchComponent from '../modules/SearchComponent' // Importing SearchComponent

// const HomePage = () => {
//   const [selectedTab, setSelectedTab] = useState('overview') // State for keeping track of the selected tab

//   const handleTabChange = (tabValue: string) => {
//     setSelectedTab(tabValue) // Update selected tab
//     console.log('Selected Tab:', tabValue)
//   }

//   const tabs = [
//     { label: 'Overview', value: 'overview' },
//     { label: 'Portfolio', value: 'portfolio' },
//     { label: 'Markets', value: 'markets' },
//     { label: 'Search', value: 'search' }, // Adding the "Search" tab
//   ]

//   return (
//     <div>
//       <NavbarComponent />
//       <BoxComponent display="flex" justifyContent="center" alignItems="center">
//         <TabComponent tabs={tabs} onTabChange={handleTabChange} />
//       </BoxComponent>

//       <BoxComponent
//         display="flex"
//         justifyContent="center"
//         alignItems="center"
//         style={{ marginTop: '20px' }}
//       >
//         {selectedTab === 'search' && <SearchComponent />}{' '}
//         {/* Conditionally render SearchComponent when "Search" tab is selected */}
//       </BoxComponent>
//     </div>
//   )
// }

// export default HomePage
