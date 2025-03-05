import React from 'react';

interface FormInputProps {
    type?: string;
    id: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    required?: boolean;
    as?: 'input' | 'textarea';
}

const FormInput: React.FC<FormInputProps> = ({ 
    type = 'text', 
    id, 
    name, 
    value, 
    onChange, 
    required = false,
    as = 'input'
}) => {
    if (as === 'textarea') {
        return (
            <textarea
                id={id}
                name={name}
                value={value}
                onChange={onChange}
                required={required}
            />
        );
    }

    return (
        <input
            type={type}
            id={id}
            name={name}
            value={value}
            onChange={onChange}
            required={required}
        />
    );
};

export default FormInput;