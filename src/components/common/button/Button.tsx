

interface Iprops {
    className?: string;
    children: any;
    type?: any;
    onClick?: any;
    disabled?: boolean;
    isLoading?: boolean;
}

const Button = ({
    children,
    className,
    type,
    disabled,
    isLoading,
    ...rest
}: Iprops) => {
    return (
        <button
            className={` ${className ? className : ""} AtTransition`}
            type={type ? type : "button"}
            disabled={disabled ? true : false}
            {...rest}
        >
            {children}
        </button>
    )
}

export default Button;