import React from 'react';

interface LoadingSpinnerProps {
    message?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ message }) => {
    return (
        <div className="flex flex-col items-center justify-center h-full text-center">
            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-4 text-gray-600 max-w-xs">
                {message || 'AI sedang membuat asesmen, mohon tunggu...'}
            </p>
        </div>
    );
};

export default LoadingSpinner;
