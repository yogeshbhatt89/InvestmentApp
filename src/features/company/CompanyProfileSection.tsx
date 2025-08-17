import React from 'react'
import { useCompanyProfile } from '@/services/finnhub/useCompanyProfile'
import CardWrapperComponent from '@/modules/CardWrapperComponent'
import BoxComponent from '@/modules/BoxComponent'
import TypographyComponent from '@/modules/TypographyComponent'

interface CompanyProfileSectionProps {
  symbol: string
}

const CompanyProfileSection: React.FC<CompanyProfileSectionProps> = ({ symbol }) => {
  const { profile, isLoading, isError } = useCompanyProfile(symbol)

  return (
    <CardWrapperComponent className="company-profile-card">
      <BoxComponent sx={{ p: 2 }}>
        <TypographyComponent variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
          Company Profile ({symbol})
        </TypographyComponent>
        {isLoading && (
          <TypographyComponent variant="body2">Loading...</TypographyComponent>
        )}
        {isError && (
          <TypographyComponent variant="body2" color="error">
            Unable to fetch company profile.
          </TypographyComponent>
        )}
        {profile && (
          <>
            <BoxComponent sx={{ mb: 2 }}>
              <img src={profile.logo} alt={profile.name} style={{ height: 80 }} />
            </BoxComponent>
            <TypographyComponent variant="body1" sx={{ fontWeight: 'bold' }}>
              {profile.name}
            </TypographyComponent>
            <TypographyComponent variant="body2">
              Industry: {profile.finnhubIndustry}
            </TypographyComponent>
            <TypographyComponent variant="body2">
              Exchange: {profile.exchange}
            </TypographyComponent>
            <TypographyComponent variant="body2">
              Market Cap: ${profile.marketCapitalization?.toLocaleString()}
            </TypographyComponent>
            <TypographyComponent variant="body2">
              IPO: {profile.ipo}
            </TypographyComponent>
            <TypographyComponent variant="body2">
              Website: <a href={profile.weburl} target="_blank" rel="noopener noreferrer">{profile.weburl}</a>
            </TypographyComponent>
          </>
        )}
      </BoxComponent>
    </CardWrapperComponent>
  )
}

export default CompanyProfileSection
