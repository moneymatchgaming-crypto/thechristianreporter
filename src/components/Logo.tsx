import React from 'react';

interface LogoProps {
  variant?: 'default' | 'compact' | 'icon-only';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  onClick?: () => void;
}

const Logo: React.FC<LogoProps> = ({ 
  variant = 'default', 
  size = 'md', 
  className = '',
  onClick 
}) => {
  const sizeClasses = {
    sm: 'w-16 h-8',
    md: 'w-24 h-12',
    lg: 'w-32 h-16',
    xl: 'w-40 h-20'
  };

  const renderLogoImage = () => (
    <div className={`${sizeClasses[size]} relative`}>
      {/* Main logo image with multiple fallback paths */}
      <img 
        src="/CR-logo-2025.png" 
        alt="The Christian Reporter - Faith-based news & Christian content" 
        className="w-full h-full object-contain drop-shadow-lg"
      />
      
      {/* Subtle glow effect */}
      <div className="absolute inset-0 bg-primary-400 rounded-full blur-md opacity-20 animate-pulse"></div>
    </div>
  );

  const renderCompactLogo = () => (
    <div className="flex items-center space-x-3">
      {renderLogoImage()}
      <div className="flex flex-col">
        <p className="text-sm text-gray-600 font-medium">
          Faith-based news
        </p>
      </div>
    </div>
  );

  const renderDefaultLogo = () => (
    <div className="flex items-center space-x-4">
      {renderLogoImage()}
      <div className="flex flex-col">
        <p className="text-sm text-gray-600 font-medium">
          Faith-based news & Christian content
        </p>
      </div>
    </div>
  );

  const renderIconOnly = () => (
    <div className="relative group">
      {renderLogoImage()}
      {/* Tooltip */}
      <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
        <div className="bg-gray-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
          The Christian Reporter
        </div>
        <div className="w-2 h-2 bg-gray-900 transform rotate-45 absolute -top-1 left-1/2 -translate-x-1/2"></div>
      </div>
    </div>
  );

  const renderLogo = () => {
    switch (variant) {
      case 'compact':
        return renderCompactLogo();
      case 'icon-only':
        return renderIconOnly();
      default:
        return renderDefaultLogo();
    }
  };

  const Wrapper = onClick ? 'button' : 'div';
  const wrapperProps = onClick ? {
    onClick,
    className: `hover:opacity-80 transition-opacity cursor-pointer ${className}`,
    title: variant === 'icon-only' ? 'Click to view all news' : undefined
  } : {
    className
  };

  return (
    <Wrapper {...wrapperProps}>
      {renderLogo()}
    </Wrapper>
  );
};

export default Logo;
