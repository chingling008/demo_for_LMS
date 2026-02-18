import { Loader2 } from 'lucide-react';

const LoadingSpinner = ({ size = 'md', fullScreen = false, message = 'Loading...' }) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
  };

  if (fullScreen) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <Loader2 className={`${sizeClasses[size]} animate-spin text-indigo-600 mx-auto mb-4`} />
          <p className="text-slate-600 font-medium">{message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center py-12">
      <div className="text-center">
        <Loader2 className={`${sizeClasses[size]} animate-spin text-indigo-600 mx-auto mb-2`} />
        <p className="text-sm text-slate-600">{message}</p>
      </div>
    </div>
  );
};

export default LoadingSpinner;
