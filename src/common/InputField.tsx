import React, {ChangeEvent} from "react";
import "./InputField.css";

interface OwnProps {
    id: string;
    name: string;
    placeholder: string;
    className: string;
    type: "text" | "number" | "email";
    onChange: (e: string | ChangeEvent<any>) => void;
    value: any;
    disabled: boolean;
    onBlur: () => void;
    withoutBackground: boolean;
    valid?: boolean;
}


const InputField: React.FunctionComponent<OwnProps> = ({id, name,placeholder, className, type, withoutBackground, valid, onChange, value, disabled, onBlur}) => {
    const classes = `${className} InputField-general ${withoutBackground ? "InputField-withoutBackground": "InputField-withBackground"} ${valid !== undefined && (valid ? "InputField-valid": "InputField-error")} ${disabled && "Inputfield-disabled"}`
    return (
        <input id={id} name={name} onChange={onChange} value={value} className={classes} placeholder={placeholder} type={type} disabled={disabled} onBlur={onBlur}/>
    )

}

export default (InputField);