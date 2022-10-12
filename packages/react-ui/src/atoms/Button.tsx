import * as React from "react";

export interface ButtonProps {
  children: React.ReactNode;
  type: String;
  label: String;
}

export const Button: React.FC<ButtonProps> = ({ children = false, type = 'primary', label = 'Button' }) => {
  const handleClick = () => {
    alert("Hello from React UI!");
  }

  return (
    <button className={`button--${type}`} onClick={ () => handleClick() }>
      { children || label }
    </button>
  );
}

Button.displayName = "Button";
export default Button;