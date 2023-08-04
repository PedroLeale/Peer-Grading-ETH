import { type Dispatch, type SetStateAction } from "react";

interface Props {
  inputFields: string[];
  setter: Dispatch<SetStateAction<string[]>>;
  label: string;
}

const DynamicInputForm = ({ inputFields, label, setter }: Props) => {
  const handleFormChange = (index: number, value: string) => {
    const updatedFields = [...inputFields];
    updatedFields[index] = value;
    setter(updatedFields);
  };

  const removeInput = (index: number) => {
    const updatedFields = [...inputFields];
    updatedFields.splice(index, 1);
    setter(updatedFields);
  };

  return (
    <div className="flex flex-col justify-center mt-3">
      {inputFields.map((input, index) => (
        <div key={index}>
          <input
            name="address"
            className=" appearance-none
             border
             mt-2
             w-1/3
             rounded py-2 px-3 text-gray-700 "
            placeholder={`${label} ${index + 1}`}
            value={input}
            onChange={(e) => {
              handleFormChange(index, e.target.value);
            }}
          />
          <button
            onClick={() => {
              removeInput(index);
            }}
            className="bg-dark-blue p-2 ml-2 rounded text-white"
          >
            remove
          </button>
        </div>
      ))}
    </div>
  );
};

export default DynamicInputForm;
