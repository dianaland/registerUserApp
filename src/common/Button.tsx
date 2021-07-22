import * as React from "react";
import './Button.css';

interface OwnProps {
    onClick: (arg: any) => void;
    size: "big" | "medium";
    classNames?: string;//define enum
    type: "submit" | "reset" | "button"
    textClassNames: string;
    disabled: boolean,
    contained: boolean,
}

const Button: React.FunctionComponent<OwnProps> = ({
                                                       children,
                                                       onClick,
                                                       classNames,
                                                       type,
                                                       textClassNames,
                                                       disabled,
                                                       contained
                                                   }) => {

    const buttonClasses = `${classNames} ${disabled ? "Button-disabled" : contained ? "Button-contained" : "Button-outlined"}`

    return (
        <button
            className={`Button-general ${buttonClasses}`}
            onClick={
                onClick
                    ? (arg) => onClick(arg)
                    : () => {
                        return;
                    }
            }
            type={type}
            disabled={disabled}
        >
            <p className={textClassNames}>
                {children}
            </p>
        </button>
    );
};

export default (Button);
