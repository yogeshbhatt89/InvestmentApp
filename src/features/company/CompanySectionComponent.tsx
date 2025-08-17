import React from 'react';
import CompanyProfileSection from './CompanyProfileSection';
import CompanyRecommendationTrendSection from './CompanyRecommendationTrendSection';
import BreadcrumbWrapperComponent from '@/modules/BreadcrumbWrapperComponent';

interface CompanySectionComponentProps {
  symbol: string;
  onBackClick: () => void;
}

const CompanySectionComponent: React.FC<CompanySectionComponentProps> = ({ symbol, onBackClick }) => {
  return (
    <div>
      <BreadcrumbWrapperComponent items={[
        { label: 'Back to Search', onClick: onBackClick },
        { label: symbol },
      ]} />
      <CompanyProfileSection symbol={symbol} />
      <div className="mt-4" />
      <CompanyRecommendationTrendSection symbol={symbol} />

    </div>
  );
};

export default CompanySectionComponent;
