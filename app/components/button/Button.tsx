interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
}

const Button = ({
  children,
  isLoading,
  disabled,
  onClick,
  className,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={`border-1  text-center text-sm uppercase leading-11 px-10 border-blue text-blue disabled:border-gray-extra-light disabled:text-gray-extra-light ${className}`}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {isLoading ? 'loading' : children}
    </button>
  );
};

export default Button;
