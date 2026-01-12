import React from 'react';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    label: string;
    options: { value: string; label: string }[];
}

const Select: React.FC<SelectProps> = ({ label, name, options, ...props }) => {
    return (
        <div>
            <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
                {label}
            </label>
            <select
                id={name}
                name={name}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out bg-white"
                {...props}
            >
                {options.map(option => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default Select;
