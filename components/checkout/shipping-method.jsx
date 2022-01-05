import { formatPrice } from "../../utils/helper-functions";

const ShippingMethod = ({ handleOption, option, chosen }) => {
  return (
    <div
      className={`flex items-center shadow-lg justify-between bg-white rounded-lg py-4 px-8 cursor-pointer ${
        option.id === chosen?.id ? "border-[1px] border-logo-400" : ""
      }`}
      onClick={() => handleOption(option)}
      role="button"
      tabIndex="0"
    >
      <p>{option.name}</p>
      <p>{formatPrice(option.amount, "EUR")}</p>
    </div>
  );
};

export default ShippingMethod;
