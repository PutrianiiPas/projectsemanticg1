
"use client";

import { useState } from "react";
import { Upload } from "lucide-react";

export default function FileUpload({
  title,
}: {
  title: string;
}) {
  const [file, setFile] = useState<File | null>(null);

  function handleFileChange(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const selectedFile = event.target.files?.[0];

    if (!selectedFile) return;

    const valid = /\.(bpmn|xml)$/i.test(selectedFile.name);

    if (!valid) {
      alert("Please upload a BPMN or XML file.");
      event.target.value = "";
      return;
    }

    setFile(selectedFile);
  }

  return (
    <div className="bg-white rounded-2xl p-8">
      <h2 className="text-xl font-semibold">{title}</h2>

      <label className="mt-10 flex flex-col items-center justify-center border-2 border-dashed border-orange-200 rounded-xl p-12 cursor-pointer hover:bg-orange-50">
        <Upload className="text-orange-500" size={32} />

        <span className="mt-4 text-sm">
          Drag & drop or browse files
        </span>

        <span className="text-xs text-gray-400 mt-2">
          Accepted formats: .bpmn, .xml
        </span>

        <input
          type="file"
          accept=".bpmn,.xml"
          className="hidden"
          onChange={handleFileChange}
        />
      </label>

      {file && (
        <div className="mt-5 bg-[#F0EBE7] rounded-lg p-4 flex justify-between">
          <span className="text-sm truncate">
            {file.name}
          </span>

          <button onClick={() => setFile(null)}>
            Remove
          </button>
        </div>
      )}
    </div>
  );
}