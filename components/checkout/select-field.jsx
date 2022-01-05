import { Field } from "formik";
import { MdError } from "react-icons/md";

const SelectField = ({ id, error, errorMsg, type, disabled, options }) => {
  return options ? (
    <div className="flex flex-col items-baseline w-full my-2">
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
          className="w-full h-10 px-3 bg-transparent border-none rounded-lg outline-none"
          type={type}
          disabled={disabled}
          as="select"
        >
          {options.map((o) => {
            return (
              <option key={o.id} value={o.iso_2}>
                {o.display_name}
              </option>
            );
          })}
        </Field>
        {error && (
          <MdError className="text-[#eb948b] text-lg mr-3 bg-transparent border-none p-3 outline-none" />
        )}
      </div>
    </div>
  ) : (
    <div className="w-full h-10 p-3 border-none rounded-lg outline-none bg-logo-100" />
  );
};

export default SelectField;
