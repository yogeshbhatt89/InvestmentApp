import React from 'react'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'

interface ListWrapperComponentProps {
  children: React.ReactNode
  className?: string
}

const ListWrapperComponent: React.FC<ListWrapperComponentProps> = ({ children, className }) => {
  return <List className={className}>{children}</List>
}

interface ListItemComponentProps {
  children: React.ReactNode
  className?: string
}

const ListItemComponent: React.FC<ListItemComponentProps> = ({ children, className }) => {
  return <ListItem className={className}>{children}</ListItem>
}

interface ListItemIconComponentProps {
  children: React.ReactNode
  className?: string
}

const ListItemIconComponent: React.FC<ListItemIconComponentProps> = ({ children, className }) => {
  return <ListItemIcon className={className}>{children}</ListItemIcon>
}

interface ListItemTextComponentProps {
  primary: string
  secondary: string
  className?: string
}

const ListItemTextComponent: React.FC<ListItemTextComponentProps> = ({
  primary,
  secondary,
  className,
}) => {
  return <ListItemText primary={primary} secondary={secondary} className={className} />
}

export { ListWrapperComponent, ListItemComponent, ListItemIconComponent, ListItemTextComponent }
