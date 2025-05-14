import React from 'react'
import IconWrapper from '@/modules/Icon'
import { Icons } from '@/modules/Icon'

const DemoIconComponent = () => {
  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4">Available Icons</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {Object.entries(Icons).map(([name]) => (
            <div
              key={name}
              className="p-4 border rounded-lg flex items-center gap-3 hover:bg-gray-50"
            >
              <IconWrapper name={name as keyof typeof Icons} />
              <span className="text-sm text-gray-600">{name}</span>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Icon Sizes</h3>
        <div className="flex flex-wrap gap-8 items-center">
          <div className="flex flex-col items-center gap-2">
            <IconWrapper name="Star" size="small" />
            <span className="text-sm text-gray-600">Small</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <IconWrapper name="Star" size="medium" />
            <span className="text-sm text-gray-600">Medium</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <IconWrapper name="Star" size="large" />
            <span className="text-sm text-gray-600">Large</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <IconWrapper name="Star" size={40} />
            <span className="text-sm text-gray-600">Custom (40px)</span>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Icon Colors</h3>
        <div className="space-y-6">
          {/* MUI Theme Colors */}
          <div>
            <h4 className="text-md font-medium mb-3">Theme Colors</h4>
            <div className="flex flex-wrap gap-8 items-center">
              <div className="flex flex-col items-center gap-2">
                <IconWrapper name="Favorite" color="primary" size="large" />
                <span className="text-sm text-gray-600">Primary</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <IconWrapper name="Favorite" color="secondary" size="large" />
                <span className="text-sm text-gray-600">Secondary</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <IconWrapper name="Favorite" color="error" size="large" />
                <span className="text-sm text-gray-600">Error</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <IconWrapper name="Favorite" color="warning" size="large" />
                <span className="text-sm text-gray-600">Warning</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <IconWrapper name="Favorite" color="info" size="large" />
                <span className="text-sm text-gray-600">Info</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <IconWrapper name="Favorite" color="success" size="large" />
                <span className="text-sm text-gray-600">Success</span>
              </div>
            </div>
          </div>

          {/* Custom Colors */}
          <div>
            <h4 className="text-md font-medium mb-3">Custom Colors</h4>
            <div className="flex flex-wrap gap-8 items-center">
              <div className="flex flex-col items-center gap-2">
                <IconWrapper name="Star" size="large" sx={{ color: '#FF6B6B' }} />
                <span className="text-sm text-gray-600">Custom Red</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <IconWrapper name="Star" size="large" sx={{ color: '#4ECDC4' }} />
                <span className="text-sm text-gray-600">Custom Teal</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <IconWrapper name="Star" size="large" sx={{ color: '#FFD93D' }} />
                <span className="text-sm text-gray-600">Custom Yellow</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <IconWrapper name="Star" size="large" sx={{ color: '#6C5CE7' }} />
                <span className="text-sm text-gray-600">Custom Purple</span>
              </div>
            </div>
          </div>

          {/* Gradient Colors */}
          <div>
            <h4 className="text-md font-medium mb-3">Gradient Effects</h4>
            <div className="flex flex-wrap gap-8 items-center">
              <div className="flex flex-col items-center gap-2">
                <IconWrapper
                  name="Star"
                  size="large"
                  sx={{
                    background: 'linear-gradient(45deg, #FF6B6B, #FFD93D)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                />
                <span className="text-sm text-gray-600">Sunset Gradient</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <IconWrapper
                  name="Star"
                  size="large"
                  sx={{
                    background: 'linear-gradient(45deg, #4ECDC4, #6C5CE7)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                />
                <span className="text-sm text-gray-600">Ocean Gradient</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <IconWrapper
                  name="Star"
                  size="large"
                  sx={{
                    background: 'linear-gradient(45deg, #FF6B6B, #6C5CE7)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                />
                <span className="text-sm text-gray-600">Sunset Purple</span>
              </div>
            </div>
          </div>

          {/* Interactive Colors */}
          <div>
            <h4 className="text-md font-medium mb-3">Interactive Effects</h4>
            <div className="flex flex-wrap gap-8 items-center">
              <div className="flex flex-col items-center gap-2">
                <IconWrapper
                  name="Favorite"
                  size="large"
                  className="transition-colors duration-300 hover:text-red-500"
                  sx={{ color: '#718096' }}
                />
                <span className="text-sm text-gray-600">Hover Effect</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <IconWrapper
                  name="Favorite"
                  size="large"
                  sx={{
                    animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                    '@keyframes pulse': {
                      '0%, 100%': { opacity: 1 },
                      '50%': { opacity: 0.5 },
                    },
                    color: '#E53E3E',
                  }}
                />
                <span className="text-sm text-gray-600">Pulse Effect</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <IconWrapper
                  name="Star"
                  size="large"
                  sx={{
                    animation: 'bounce 1s infinite',
                    '@keyframes bounce': {
                      '0%, 100%': { transform: 'translateY(0)' },
                      '50%': { transform: 'translateY(-10px)' },
                    },
                    color: '#D69E2E',
                  }}
                />
                <span className="text-sm text-gray-600">Bounce Effect</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DemoIconComponent
