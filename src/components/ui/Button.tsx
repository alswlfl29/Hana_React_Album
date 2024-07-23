import { ButtonHTMLAttributes, PropsWithChildren } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

export const Button = ({
  children,
  className,
  ...props
}: PropsWithChildren<ButtonProps>) => {
  return (
    <button className={className} {...props}>
      {children}
    </button>
  );
};
