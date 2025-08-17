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
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-20 h-20'
  };

  const textSizes = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-3xl',
    xl: 'text-4xl'
  };

  const subtitleSizes = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
    xl: 'text-lg'
  };

  const renderLogoIcon = () => (
    <div className={`${sizeClasses[size]} relative`}>
      {/* Main logo image */}
      <img 
        src="/images/CR-logo-2025.png" 
        alt="Christian Reporter Logo" 
        className="w-full h-full object-contain drop-shadow-lg"
      />
      
      {/* Subtle glow effect */}
      <div className="absolute inset-0 bg-primary-400 rounded-full blur-md opacity-20 animate-pulse"></div>
    </div>
  );

  const renderCompactLogo = () => (
    <div className="flex items-center space-x-3">
      {renderLogoIcon()}
      <div className="flex flex-col">
        <h1 className={`${textSizes[size]} font-bold text-gray-900 font-serif leading-tight`}>
          Christian Reporter
        </h1>
        <p className={`${subtitleSizes[size]} text-gray-600 font-medium`}>
          Faith-based news
        </p>
      </div>
    </div>
  );

  const renderDefaultLogo = () => (
    <div className="flex items-center space-x-4">
      {renderLogoIcon()}
      <div className="flex flex-col">
        <h1 className={`${textSizes[size]} font-bold text-gray-900 font-serif leading-tight`}>
          The Christian Reporter
        </h1>
        <p className={`${subtitleSizes[size]} text-gray-600 font-medium`}>
          Faith-based news & Christian content
        </p>
      </div>
    </div>
  );

  const renderIconOnly = () => (
    <div className="relative group">
      {renderLogoIcon()}
      {/* Tooltip */}
      <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
        <div className="bg-gray-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
          Christian Reporter
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
