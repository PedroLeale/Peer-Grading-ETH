import React, {
  useState,
  type ChangeEvent,
  type FormEvent,
  type Dispatch,
  type SetStateAction,
} from "react";
import { toast } from "react-toastify";
import { SingleFileUploader } from "../SingleFileUploader";

interface Uploader {
  fieldName: string;
  file: File | null;
}

interface Props {
  setCid: Dispatch<SetStateAction<string>>;
}

export const FileUploader = ({ setCid }: Props) => {
  const [uploaders, setUploaders] = useState<Uploader[]>([
    { fieldName: "", file: null },
  ]);

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

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const formData = new FormData();

    for (const uploader of uploaders) {
      if (!uploader.file || !uploader.fieldName) {
        alert("Both field name and file must be provided for all uploaders");
        return;
      }
      formData.append(uploader.fieldName, uploader.file);
    }

    try {
      const response = await fetch("/api/store", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      console.log("Server Response:", data);
      setCid(data.cid);
      toast.success("files successfully uploaded!");
    } catch (error) {
      toast.error("error uploading files");

      console.error("There was an error uploading the files:", error);
    }
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
          <button
            className="bg-pg-primary py-2 px-4 font-bold w-1/2 mt-3"
            type="submit"
          >
            Create contract
          </button>
        </div>
      </form>
    </div>
  );
};
