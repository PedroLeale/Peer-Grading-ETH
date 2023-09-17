import React, { useState, type ChangeEvent, type FormEvent } from "react";
import { toast } from "react-toastify";

interface Uploader {
  fieldName: string;
  file: File | null;
}

const SingleUploader: React.FC<{
  index: number;
  handleFileChange: (e: ChangeEvent<HTMLInputElement>, index: number) => void;
  handleFieldNameChange: (
    e: ChangeEvent<HTMLInputElement>,
    index: number
  ) => void;
}> = ({ index, handleFileChange, handleFieldNameChange }) => (
  <div className="flex flex-col mb-4">
    <label className="font-bold text-lg mb-2" htmlFor={`fieldName-${index}`}>
      Participant address
    </label>
    <input
      id={`fieldName-${index}`}
      type="text"
      className="border p-2 rounded"
      onChange={(e) => {
        handleFieldNameChange(e, index);
      }}
      required
    />
    <label className="font-bold text-lg mt-4 mb-2" htmlFor={`file-${index}`}>
      File:
    </label>
    <input
      id={`file-${index}`}
      type="file"
      className="border p-2 rounded"
      onChange={(e) => {
        handleFileChange(e, index);
      }}
      required
    />
  </div>
);

export const FileUploader: React.FC = () => {
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
            <SingleUploader
              index={index}
              handleFileChange={handleFileChange}
              handleFieldNameChange={handleFieldNameChange}
            />
            <button
              type="button"
              className="text-black font-bold py-2 px-4 rounded bg-[#FF0000]"
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
            className="bg-pg-primary py-2 px-4 font-bold w-1/5"
            onClick={addUploader}
          >
            Add More
          </button>
          <button
            className="bg-pg-primary py-2 px-4 font-bold w-1/2 mt-3"
            type="submit"
          >
            Upload All
          </button>
        </div>
      </form>
    </div>
  );
};
