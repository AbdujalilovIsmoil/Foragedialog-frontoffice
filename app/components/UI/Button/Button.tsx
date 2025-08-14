import React from "react";

interface IButton extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

function Button({ children, ...props }: IButton) {
  return <button {...props}>{children}</button>;
}

export default Button;
