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
    sm: 'w-52 h-26',
    md: 'w-72 h-36',
    lg: 'w-104 h-52',
    xl: 'w-128 h-64'
  };

  const renderLogoImage = () => (
    <div className={`${sizeClasses[size]} relative p-0 m-0 mx-auto`}>
      {/* Main logo image - using public folder asset */}
      <img 
        src="/CR-logo-2025.png" 
        alt="The Christian Reporter - Faith-based news & Christian content" 
        className="w-full h-full object-contain drop-shadow-lg p-0 m-0"
      />
    </div>
  );

  const renderCompactLogo = () => (
    <div className="flex flex-col items-center justify-center p-0 m-0 w-full">
      <div className="flex justify-center w-full">
        {renderLogoImage()}
      </div>
      <div className="text-center p-0 m-0 -mt-1 w-full">
        <p className="text-xl text-gray-600 font-medium p-0 m-0">
          Faith-based news
        </p>
      </div>
    </div>
  );

  const renderDefaultLogo = () => (
    <div className="flex flex-col items-center justify-center p-0 m-0 w-full">
      <div className="flex justify-center w-full">
        {renderLogoImage()}
      </div>
      <div className="text-center p-0 m-0 -mt-1 w-full">
        <p className="text-xl text-gray-600 font-medium p-0 m-0">
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
