
"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Clock3,
  FileText,
  Play,
  RefreshCw,
  X,
} from "lucide-react";

import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";

type FileSlot = "previous" | "updated";

type SelectedFile = {
  file: File;
  name: string;
  size: string;
};

const formatFileSize = (bytes: number) => {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) {
    return `${(bytes / 1024).toFixed(0)} KB`;
  }
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
};

export default function UploadPage() {
  const [previousFile, setPreviousFile] =
    useState<SelectedFile | null>(null);

  const [updatedFile, setUpdatedFile] =
    useState<SelectedFile | null>(null);

  const [error, setError] = useState("");

  const previousInputRef = useRef<HTMLInputElement>(null);
  const updatedInputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File, slot: FileSlot) => {
    const fileName = file.name.toLowerCase();

    const isValid =
        fileName.endsWith(".bpm") ||
        fileName.endsWith(".bpmn") ||
        fileName.endsWith(".xml");

    if (!isValid) {
        setError("Only .bpmn and .xml files are accepted.");
        return;
    }

    if (file.size === 0) {
        setError("The selected file is empty.");
        return;
    }

    const selectedFile: SelectedFile = {
        file,
        name: file.name,
        size: formatFileSize(file.size),
    };

    if (slot === "previous") {
        setPreviousFile(selectedFile);
    } else {
        setUpdatedFile(selectedFile);
    }

    setError("");
};

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    slot: FileSlot
  ) => {
    const file = event.target.files?.[0];

    if (file) {
      handleFile(file, slot);
    }

    event.target.value = "";
  };

  const handleDrop = (
    event: React.DragEvent<HTMLDivElement>,
    slot: FileSlot
  ) => {
    event.preventDefault();

    const file = event.dataTransfer.files?.[0];

    if (file) {
      handleFile(file, slot);
    }
  };

  const removeFile = (slot: FileSlot) => {
    if (slot === "previous") {
      setPreviousFile(null);
    } else {
      setUpdatedFile(null);
    }
    setError("");
  };

  const canAnalyze = previousFile && updatedFile;

  return (
    <main className="min-h-[calc(100vh-72px)] bg-bg1 px-5 py-12 md:px-10">
      <div className="mx-auto w-full max-w-[1312px]">

        {/* Page Heading */}
        <section className="mb-10 text-center">
          <p className="mb-6 text-sm font-bold tracking-[2px] text-primary">
            Semantic Differential Mode
          </p>

          <h1 className="font-mono text-3xl font-bold md:text-[40px]">
            New Impact Analysis
          </h1>

          <p className="mx-auto mt-4 max-w-[800px] font-mono text-sm leading-relaxed text-text1">
            Upload both versions to identify structural divergence,
            sequence flow disruptions, and affected backend service bindings
          </p>
        </section>

        {/* Upload Cards */}
        <section className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-[94px]">

          {/* Previous BPMN */}
          <UploadCard
            number="01"
            title="Previous BPMN Version"
            description="Baseline specification for change detection"
            file={previousFile}
            icon="previous"
            onBrowse={() => previousInputRef.current?.click()}
            onDrop={(event) => handleDrop(event, "previous")}
            onRemove={() => removeFile("previous")}
          />

          {/* Updated BPMN */}
          <UploadCard
            number="02"
            title="Updated BPMN Version"
            description="Modified branch or proposal under test"
            file={updatedFile}
            icon="updated"
            onBrowse={() => updatedInputRef.current?.click()}
            onDrop={(event) => handleDrop(event, "updated")}
            onRemove={() => removeFile("updated")}
          />
        </section>

        {/* Hidden File Inputs */}
        <input
          ref={previousInputRef}
          type="file"
          accept="*" // .bpmn,.xml
          className="hidden"
          onChange={(event) => handleInputChange(event, "previous")}
        />

        <input
          ref={updatedInputRef}
          type="file"
          accept="*" // .bpmn,.xml
          className="hidden"
          onChange={(event) => handleInputChange(event, "updated")}
        />

        {/* Error Message */}
        {error && (
          <p className="mt-5 text-center text-sm font-medium text-red-600">
            {error}
          </p>
        )}

        {/* Bottom Actions */}
        <div className="mt-12 flex flex-col-reverse items-center justify-between gap-6 sm:flex-row">

          <Link
            href="/"
            className="flex items-center gap-3 font-mono text-base font-medium hover:text-primary"
          >
            <ArrowLeft size={20} />
            Back to Projects
          </Link>

          <Link
            href="/analysis"
            className={!canAnalyze ? "pointer-events-none" : ""}
            aria-disabled={!canAnalyze}
            tabIndex={canAnalyze ? 0 : -1}
          >
            <Button disabled={!canAnalyze} className="font-mono">
              <Play size={17} />
              Start New Analysis
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
}

type UploadCardProps = {
  number: string;
  title: string;
  description: string;
  file: SelectedFile | null;
  icon: "previous" | "updated";
  onBrowse: () => void;
  onDrop: (event: React.DragEvent<HTMLDivElement>) => void;
  onRemove: () => void;
};

function UploadCard({
  number,
  title,
  description,
  file,
  icon,
  onBrowse,
  onDrop,
  onRemove,
}: UploadCardProps) {
  const [isDragging, setIsDragging] = useState(false);

  const isUpdated = icon === "updated";

  return (
    <Card
      padding="medium"
      className="flex min-h-[470px] flex-col rounded-[20px] px-6 py-8 md:px-8"
    >
      {/* Card Heading */}
      <div className="flex items-center gap-3">
        <span
          className={`flex h-[42px] w-[47px] shrink-0 items-center justify-center rounded-lg text-xl ${
            isUpdated
              ? "bg-primary text-white"
              : "bg-secondary text-black"
          }`}
        >
          {number}
        </span>

        <div>
          <h2 className="text-xl font-semibold md:text-[24px]">
            {title}
          </h2>

          <p className="mt-1 font-mono text-xs text-text1">
            {description}
          </p>
        </div>
      </div>

      {/* Drop Zone */}
      <div
        onDragEnter={(event) => {
          event.preventDefault();
          setIsDragging(true);
        }}
        onDragOver={(event) => {
            event.preventDefault();
            event.dataTransfer.dropEffect = "copy";
            setIsDragging(true);
        }}
        onDragLeave={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget as Node)) {
            setIsDragging(false);
            }
        }}
        onDrop={(event) => {
            event.preventDefault();
            event.stopPropagation();
            setIsDragging(false);
            onDrop(event);
        }}

        className={`my-auto flex min-h-[205px] flex-col items-center justify-center rounded-xl border-2 border-dashed transition ${
          isDragging
            ? "border-primary bg-secondary"
            : "border-transparent"
        }`}
      >
        <div
          className={`mb-2 flex h-[58px] w-[58px] items-center justify-center rounded-full ${
            isUpdated
              ? "bg-button text-text2"
              : "bg-button text-text2"
          }`}
        >
          {isUpdated ? (
            <RefreshCw size={25} />
          ) : (
            <Clock3 size={25} />
          )}
        </div>

        <p className="text-center font-mono text-xs">
          Drag & drop {isUpdated ? "modified" : "reference"} file here, or{" "}
          <button
            type="button"
            onClick={onBrowse}
            className="text-primary hover:underline"
          >
            browse files
          </button>
        </p>

        <p className="mt-1 font-mono text-[10px] text-textgrey">
          Accepted formats: .bpmn, .xml
        </p>
      </div>

      {/* Selected File */}
      {file && (
        <div className="flex items-center gap-3 rounded-[20px] bg-button px-4 py-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white text-primary">
            <FileText size={21} />
          </div>

          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold">
              {file.name}
            </p>
            <p className="mt-1 font-mono text-[11px] text-text1">
              {file.size}
            </p>
          </div>

          <button
            type="button"
            aria-label={`Remove ${file.name}`}
            onClick={onRemove}
            className="rounded p-1 transition hover:bg-white"
          >
            <X size={19} />
          </button>
        </div>
      )}
    </Card>
  );
}