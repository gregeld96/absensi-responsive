import { useState } from "react";
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai';

export const PasswordField = ({
    required,
    label,
    value,
    placeholder,
    onChange,
    labelColor,
    labelWeight,
}) => {
    const [show, setShow] = useState(false);

    return (
        <div className="w-full">
            <label
                className={`block tracking-wide ${labelColor ?? "text-white"} ${labelWeight ?? "font-bold"} text-sm mb-2`}
                htmlFor={`input-${label.replace(/ /g, "-")}`}
            >
                {label}
            </label>
            <div className="flex justify-between items-center">
                <input
                    required={required}
                    value={value}
                    className=" appearance-none text-base font-normal w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id={`input-${label.replace(/ /g, "-")}`}
                    type={show ? "text" : "password"}
                    placeholder={placeholder}
                    onChange={onChange}
                />
                <div onClick={() => setShow(!show)} className="cursor-pointer inline inset-y-0 ml-[-100px] items-center px-2 text-gray-700">
                    {
                        show ?  <AiOutlineEyeInvisible size={20} /> :<AiOutlineEye size={20} />
                    }
                </div>
            </div>

        </div>
    );
};
