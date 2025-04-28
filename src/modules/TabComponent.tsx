import React, { useState } from "react";
import { Tabs, Tab } from "@mui/material";

interface TabComponentProps {
  tabs: { label: string; value: string }[];
  onTabChange: (value: string) => void;
}

const TabComponent: React.FC<TabComponentProps> = ({ tabs, onTabChange }) => {
  const [value, setValue] = useState(tabs[0]?.value || "");

  const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
    onTabChange(newValue);
  };

  return (
    <Tabs
      value={value}
      onChange={handleChange}
      centered
      textColor="primary"
      indicatorColor="primary"
    >
      {tabs.map((tab) => (
        <Tab key={tab.value} label={tab.label} value={tab.value} />
      ))}
    </Tabs>
  );
};

export default TabComponent;
