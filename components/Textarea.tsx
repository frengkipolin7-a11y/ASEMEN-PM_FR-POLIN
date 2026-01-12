import React from 'react';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    label: string;
    labelAddon?: React.ReactNode;
}

const Textarea: React.FC<TextareaProps> = ({ label, name, labelAddon, ...props }) => {
    return (
        <div>
            <div className="flex justify-between items-center mb-1">
                <label htmlFor={name} className="block text-sm font-medium text-gray-700">
                    {label}
                </label>
                {labelAddon}
            </div>
            <textarea
                id={name}
                name={name}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
                {...props}
            />
        </div>
    );
};

export default Textarea;
