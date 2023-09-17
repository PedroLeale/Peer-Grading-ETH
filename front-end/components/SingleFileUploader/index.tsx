import React, { type ChangeEvent } from "react";

type Props = {
  index: number;
  handleFileChange: (e: ChangeEvent<HTMLInputElement>, index: number) => void;
  handleFieldNameChange: (
    e: ChangeEvent<HTMLInputElement>,
    index: number
  ) => void;
};

export const SingleFileUploader = ({
  index,
  handleFileChange,
  handleFieldNameChange,
}: Props) => (
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
