
export const InputSingleField = ({
  required,
  label,
  value,
  placeholder,
  type,
  onChange,
  multiple,
  labelColor,
  labelWeight,
}) => {
  return (
    <div className="w-full">
      <label
        className={`block tracking-wide ${labelColor ?? "text-white"} ${labelWeight ?? "font-bold"} text-sm mb-2`}
        htmlFor={`input-${label.replace(/ /g, "-")}`}
      >
        {label}
      </label>
      <input
        required={required}
        value={value}
        className="appearance-none block text-base font-normal w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
        id={`input-${label.replace(/ /g, "-")}`}
        type={type ?? "text"}
        multiple={type === 'file' ? multiple : false}
        placeholder={placeholder}
        onChange={onChange}
      />
    </div>
  );
};
