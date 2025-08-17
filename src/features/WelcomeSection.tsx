// src/components/WelcomeSection.tsx
import React from 'react';
import TypographyComponent from '@/modules/TypographyComponent';
import CardWrapperComponent from '@/modules/CardWrapperComponent';
import SignIn from './SignIn';
import { ListWrapperComponent, ListItemComponent, ListItemIconComponent, ListItemTextComponent } from '@/modules/List';
import IconWrapper from '@/modules/Icon/IconWrapper';

const WelcomeSection = () => {
  return (
    <CardWrapperComponent className="flex flex-col items-center">
      <TypographyComponent variant="h2" className="mb-2 text-center">
        Welcome!
      </TypographyComponent>
      <ListWrapperComponent>
        <ListItemComponent>
          <ListItemIconComponent>
            <IconWrapper name="Search" size="large" sx={{ color: '#FF6B6B' }} />
          </ListItemIconComponent>
          <ListItemTextComponent primary="Search for stocks by symbol or company name" secondary='' />
        </ListItemComponent>
        <ListItemComponent>
          <ListItemIconComponent>
            <IconWrapper name="InsertChart" size="large" sx={{ color: '#4ECDC4' }} />
          </ListItemIconComponent>
          <ListItemTextComponent primary="Create a virtual portfolio" secondary='' />
        </ListItemComponent>
        <ListItemComponent>
          <ListItemIconComponent>
            <IconWrapper name="MonetizationOn" size="large" sx={{ color: '#34A85A' }} />
          </ListItemIconComponent>
          <ListItemTextComponent primary="Mock trade stocks with fake money" secondary='' />
        </ListItemComponent>
      </ListWrapperComponent>
      <SignIn />
    </CardWrapperComponent>
  );
};

export default WelcomeSection;
