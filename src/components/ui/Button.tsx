import React from 'react';

interface ButtonInfo {
    text: string;
    onClick?: () => void;
}

const Button: React.FC<ButtonInfo> = ({ text, onClick}) => {
    return (
        <button onClick={onClick}>{text}</button>
    );
}

export default Button;
