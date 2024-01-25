import React, {
  type ChangeEvent,
  type FormEvent,
  type Dispatch,
  type SetStateAction,
} from "react";
import { SingleFileUploader } from "../SingleFileUploader";

interface Uploader {
  fieldName: string;
  file: File | null;
}

interface Props {
  uploaders: Uploader[];
  setUploaders: Dispatch<SetStateAction<Uploader[]>>;
  setCid: Dispatch<SetStateAction<string>>;
  handleSubmit: (e: FormEvent) => void;
}

export const FileUploader = ({
  uploaders,
  setUploaders,
  setCid,
  handleSubmit,
}: Props) => {
  const handleFileChange = (
    e: ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const newFile = e.target.files?.[0] ?? null;
    const newUploaders = [...uploaders];
    newUploaders[index].file = newFile;
    setUploaders(newUploaders);
  };

  const handleFieldNameChange = (
    e: ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const newFieldName = e.target.value;
    const newUploaders = [...uploaders];
    newUploaders[index].fieldName = newFieldName;
    setUploaders(newUploaders);
  };

  const addUploader = () => {
    setUploaders([...uploaders, { fieldName: "", file: null }]);
  };

  const removeUploader = (index: number) => {
    const newUploaders = [...uploaders];
    newUploaders.splice(index, 1);
    setUploaders(newUploaders);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold">Participants List:</h1>
      <form onSubmit={handleSubmit}>
        {uploaders.map((uploader, index) => (
          <div key={index}>
            <SingleFileUploader
              index={index}
              handleFileChange={handleFileChange}
              handleFieldNameChange={handleFieldNameChange}
            />
            <button
              type="button"
              className="text-white font-bold py-2 px-4 rounded bg-[#FF0000]"
              onClick={() => {
                removeUploader(index);
              }}
            >
              Remove
            </button>
          </div>
        ))}

        <div className="flex flex-col mt-8">
          <button
            type="button"
            className="bg-pg-primary py-2 px-4 font-bold self-contain"
            onClick={addUploader}
          >
            Add More participants
          </button>
        </div>
      </form>
    </div>
  );
};
