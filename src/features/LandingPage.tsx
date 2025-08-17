// src/features/LandingPage.tsx
import React, { useState } from 'react';
import MarketNewsList from './MarketNewsList';
import LiveSearchSymbolLookup from './LiveSearchSymbolLookup';
import CompanySectionComponent from './company/CompanySectionComponent';
import MarketStatus from './MarketStatus';
import NavbarComponent from '@/modules/NavbarComponent';
import CompanyQuoteSection from './company/CompanyQuoteSection';
import { getLastWeekDate, getTodayDate } from '@/utils/utils';
import CompanyNewsSection from './company/CompanyNewsSection';
import WelcomeSection from './WelcomeSection';
const LandingPage = () => {
  const [selectedSymbol, setSelectedSymbol] = useState<string | null>(null);

  const handleRowClick = (symbol: string) => {
    setSelectedSymbol(symbol);
  };

  const handleBackClick = () => {
    setSelectedSymbol(null);
  };

  return (
    <div>
      <NavbarComponent />
      <div className="max-w-4xl mx-auto p-4 flex flex-col">

        <div className="flex justify-between mb-4">
          <div className="w-1/2">
            {selectedSymbol ? (
              <CompanySectionComponent symbol={selectedSymbol} onBackClick={handleBackClick} />
            ) : (
              <>
                <LiveSearchSymbolLookup onRowClick={handleRowClick} />
                <WelcomeSection />
              </>
            )}

          </div>
          <div className="w-1/2 pl-4">
            {selectedSymbol ? (
              <CompanyQuoteSection symbol={selectedSymbol} />
            ) : (
              <MarketStatus />
            )}
            <div className="mt-4">
              {selectedSymbol ? (
                <CompanyNewsSection symbol={selectedSymbol} from={getLastWeekDate()} to={getTodayDate()} />
              ) : (
                <MarketNewsList category="general" minId={10} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
