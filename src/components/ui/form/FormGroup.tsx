import React from 'react';
import FormLabel from './FormLabel';
import FormInput from './FormInput';

interface FormGroupProps {
    label: string;
    id: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    required?: boolean;
    type?: string;
    as?: 'input' | 'textarea';
}

const FormGroup: React.FC<FormGroupProps> = ({
    label,
    id,
    name,
    value,
    onChange,
    required = false,
    type = 'text',
    as = 'input'
}) => {
    return (
        <div className="form-group flex">
            <FormLabel htmlFor={id}>{label}</FormLabel>
            <FormInput
                type={type}
                id={id}
                name={name}
                value={value}
                onChange={onChange}
                required={required}
                as={as}
            />
        </div>
    );
};

export default FormGroup;