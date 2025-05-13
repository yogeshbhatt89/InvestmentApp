// import React from 'react'
// import { connect } from 'react-redux'
// import { Tabs, Tab } from '@mui/material'
// import { RootState } from '../app/store'
// import { Dispatch } from 'redux'

// interface TabComponentProps {
//   tabs: { label: string; value: string }[]
//   onTabChange: (value: string) => void
//   activeTab: string
//   className?: string
// }

// interface TabComponentStateProps {
//   activeTab: string
// }

// interface TabComponentDispatchProps {
//   onTabChange: (value: string) => void
// }
// interface TabsAction {
//   type: string
//   payload?: string
// }
// interface TabsState {
//   activeTab: string
// }
// interface ConnectedTabComponentProps
//   extends TabComponentProps,
//     TabComponentStateProps,
//     TabComponentDispatchProps {}

// const initialState: TabsState = {
//   activeTab: '',
// }

// // eslint-disable-next-line react-refresh/only-export-components
// export const tabsReducer = (state = initialState, action: TabsAction) => {
//   switch (action.type) {
//     case 'SET_ACTIVE_TAB':
//       return { ...state, activeTab: action.payload }
//     default:
//       return state
//   }
// }
// const TabComponent: React.FC<TabComponentProps> = ({
//   tabs,
//   activeTab,
//   onTabChange,
// }: TabComponentProps) => {
//   const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
//     onTabChange(newValue)
//   }

//   return (
//     <Tabs
//       value={activeTab}
//       onChange={handleChange}
//       centered
//       textColor="primary"
//       indicatorColor="primary"
//       className=""
//     >
//       {tabs.map(tab => (
//         <Tab key={tab.value} label={tab.label} value={tab.value} />
//       ))}
//     </Tabs>
//   )
// }

// const mapStateToProps = (state: RootState): TabComponentStateProps => {
//   const tabsState = tabsReducer(state.tabs as { activeTab: string }, { type: 'INIT' })
//   return {
//     activeTab: tabsState.activeTab ?? '',
//   }
// }

// const mapDispatchToProps = (dispatch: Dispatch): TabComponentDispatchProps => {
//   return {
//     onTabChange: (value: string) => {
//       dispatch({ type: 'SET_ACTIVE_TAB', payload: value })
//     },
//   }
// }

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps,
// )(TabComponent) as React.ComponentType<ConnectedTabComponentProps>
