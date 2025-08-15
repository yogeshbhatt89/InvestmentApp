import React from 'react';
import MarketNewsList from './MarketNewsList';
import LiveSearchSymbolLookup from './LiveSearchSymbolLookup';

const LandingPage: React.FC = () => {
  return (
    <div>
      <LiveSearchSymbolLookup />
      <MarketNewsList category="general" minId={10} />
    </div>
  );
};

export default LandingPage;
