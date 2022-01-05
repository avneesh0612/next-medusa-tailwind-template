import { Field } from "formik";
import { MdError } from "react-icons/md";

const InputField = ({ id, placeholder, error, errorMsg, type, disabled }) => {
  return (
    <div className="flex flex-col items-baseline w-full my-1">
      {error ? (
        <p className="self-end text-sm text-[#e07367]">{errorMsg}</p>
      ) : (
        <p className="text-sm text-transparent" aria-hidden="true">
          fill
        </p>
      )}
      <div
        className={`w-full bg-white rounded-lg border-[1px] border-gray-400 flex items-center mt-1 relative transition-all duration-100 ease-in ${
          error ? "bg-[#fef1f2] border-[#f0ada6]" : ""
        }`}
      >
        <Field
          id={id}
          name={id}
          placeholder={placeholder}
          className="w-full h-10 p-3 bg-transparent border-none rounded-lg outline-none"
          type={type}
          disabled={disabled}
        />
        {error && (
          <MdError className="text-[#eb948b] text-lg mr-3 bg-transparent border-none p-3 outline-none" />
        )}
      </div>
    </div>
  );
};

export default InputField;
