import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
}

const Input: React.FC<InputProps> = ({ label, name, ...props }) => {
    return (
        <div>
            <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
                {label}
            </label>
            <input
                id={name}
                name={name}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
                {...props}
            />
        </div>
    );
};

export default Input;
