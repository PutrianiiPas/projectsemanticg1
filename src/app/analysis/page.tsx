
"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Archive,
  ArrowLeft,
  CheckCircle2,
  ChevronRight,
  CircleDot,
  Code2,
  Download,
  FileCode2,
  FileText,
  FolderClosed,
  GitBranch,
  RefreshCw,
  Settings,
  User,
  Workflow,
} from "lucide-react";

const bpmnChanges = [
  {
    type: "User Task",
    status: "Modified",
    title: "Approve High-Value Order",
    id: "Task_ManualApprove_01b",
    icon: User,
  },
  {
    type: "Service Task",
    status: "Modified",
    title: "Verify Payment Authorization",
    id: "Service_AuthPayment_99x",
    icon: Settings,
  },
  {
    type: "Send Task",
    status: "Added",
    title: "Send Delay Notification",
    id: "Task_NotifyDelay_33a",
    icon: Workflow,
  },
];

const affectedFiles = [
  {
    name: "orderService.ts",
    path: "src/services/orderService.ts",
    description: "TypeScript Service",
    lines: 244,
    score: 94,
  },
  {
    name: "orderController.ts",
    path: "src/controllers/orderController.ts",
    description: "TypeScript Controller",
    lines: 182,
    score: 87,
  },
  {
    name: "orderRepository.ts",
    path: "src/repositories/orderRepository.ts",
    description: "TypeScript Repository",
    lines: 310,
    score: 81,
  },
];

export default function AnalysisPage() {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleExport = () => {
    const report = {
      pipelineId: "RUN-001-DIFF",
      repository: "E-Commerce Management System",
      method: "Semantic Retrieval",
      totalChanges: 6,
      affectedFiles,
      bpmnChanges,
    };

    const blob = new Blob([JSON.stringify(report, null, 2)], {
      type: "application/json",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "impact-analysis-report.json";
    link.click();

    URL.revokeObjectURL(url);
  };

  const handleRerun = () => {
    setIsRefreshing(true);

    // Simulasi proses analisis karena backend belum tersedia.
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1000);
  };

  return (
    <main className="min-h-screen bg-[#FFF1E6] px-5 py-8 md:px-10">
      <div className="mx-auto max-w-[1400px]">
        {/* Page Header */}
        <div className="mb-8 flex flex-col justify-between gap-5 md:flex-row md:items-center">
          <div>
            <p className="mb-2 font-mono text-sm font-bold tracking-[0.15em] text-[#F28C45]">
              PIPELINE ID: RUN-001-DIFF
            </p>

            <h1 className="font-mono text-3xl font-bold text-black md:text-[42px]">
              Impact Analysis Results
            </h1>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={handleExport}
              className="flex items-center gap-2 rounded-lg bg-[#EEDDD0] px-5 py-3 font-mono text-sm text-[#896953] transition hover:bg-[#E5CDBB]"
            >
              <Download size={18} />
              Export Report
            </button>

            <button
              onClick={handleRerun}
              disabled={isRefreshing}
              className="flex items-center gap-2 rounded-lg bg-[#F28C45] px-5 py-3 font-mono text-sm text-white transition hover:bg-[#E77C32] disabled:opacity-70"
            >
              <RefreshCw
                size={18}
                className={isRefreshing ? "animate-spin" : ""}
              />
              {isRefreshing ? "Re-running..." : "Re-run Analysis"}
            </button>
          </div>
        </div>

        {/* Summary */}
        <section className="mb-10 grid grid-cols-1 gap-3 rounded-[22px] bg-white p-5 md:grid-cols-2 md:p-6 lg:grid-cols-4">
          <SummaryItem
            icon={<Archive size={19} />}
            label="TARGET REPOSITORY"
            value="E-Commerce Management"
          />

          <SummaryItem
            icon={<GitBranch size={19} />}
            label="BPMN DIFFS"
            value="6 changes"
            suffix="detected"
          />

          <SummaryItem
            icon={<FolderClosed size={19} />}
            label="CANDIDATE SCOPE"
            value="3 files"
            suffix="identified"
          />

          <div className="flex items-center justify-start lg:justify-end">
            <span className="flex items-center gap-2 rounded-md bg-[#FCE5D3] px-3 py-1.5 font-mono text-sm text-[#896953]">
              <CircleDot size={12} className="fill-[#F28C45] text-[#F28C45]" />
              Semantic Retrieval
            </span>
          </div>
        </section>

        {/* BPMN Changes */}
        <section className="mb-10">
          <div className="mb-5 flex items-center gap-3">
            <h2 className="font-mono text-2xl font-semibold text-black">
              BPMN Changes
            </h2>

            <span className="rounded-full bg-[#EEDDD0] px-2.5 py-1 text-xs font-semibold text-black">
              3
            </span>
          </div>

          <div className="grid grid-cols-1 gap-3 lg:grid-cols-3">
            {bpmnChanges.map((change) => {
              const Icon = change.icon;

              return (
                <div
                  key={change.id}
                  className="rounded-xl bg-white p-4 transition hover:shadow-sm"
                >
                  <div className="mb-3 flex items-center justify-between">
                    <span className="flex items-center gap-1 rounded bg-[#F0EBE8] px-2 py-1 font-serif text-[11px] text-[#896953]">
                      <Icon size={12} />
                      {change.type}
                    </span>

                    <span
                      className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                        change.status === "Added"
                          ? "bg-[#F2DDCC] text-[#80583E]"
                          : "bg-[#FFDCC9] text-[#994A18]"
                      }`}
                    >
                      {change.status}
                    </span>
                  </div>

                  <h3 className="font-semibold text-[#222222]">
                    {change.title}
                  </h3>

                  <p className="mt-1 font-serif text-xs text-[#896953]">
                    ID: {change.id}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Affected Source Code */}
        <section>
          <div className="mb-5">
            <h2 className="font-mono text-2xl font-semibold text-black">
              Potentially Affected Source Code
            </h2>

            <p className="mt-1 font-mono text-sm text-[#896953]">
              Ranked by embedding vector similarity against the AST entity graph
            </p>
          </div>

          {/* Desktop Table */}
          <div className="hidden overflow-hidden rounded-xl bg-white md:block">
            <table className="w-full border-collapse text-left">
              <thead className="bg-[#EEE9E5] text-xs font-semibold text-black">
                <tr>
                  <th className="px-7 py-4">File Name</th>
                  <th className="px-5 py-4">File Path</th>
                  <th className="px-5 py-4">Relevance Score</th>
                  <th className="px-7 py-4 text-center">Action</th>
                </tr>
              </thead>

              <tbody>
                {affectedFiles.map((file) => (
                  <tr
                    key={file.name}
                    className="border-b border-[#EEE9E5] last:border-0 hover:bg-[#FFFCF9]"
                  >
                    <td className="px-7 py-4">
                      <div className="flex items-center gap-2">
                        <div className="rounded-md bg-[#FFF1E6] p-2 text-[#F28C45]">
                          <FileText size={19} />
                        </div>

                        <div>
                          <p className="font-medium text-black">
                            {file.name}
                          </p>
                          <p className="font-serif text-xs text-[#896953]">
                            {file.description} • {file.lines} lines
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-5 py-4">
                      <span className="rounded bg-[#F0EBE8] px-2 py-1 font-serif text-xs text-[#896953]">
                        {file.path}
                      </span>
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <span className="rounded-lg bg-[#FFF1E6] px-3 py-2 font-mono text-sm text-[#F28C45]">
                          {file.score}%
                        </span>

                        <div className="h-1.5 w-24 overflow-hidden rounded-full bg-[#EDE5DF]">
                          <div
                            className="h-full rounded-full bg-[#F28C45]"
                            style={{ width: `${file.score}%` }}
                          />
                        </div>
                      </div>
                    </td>

                    <td className="px-7 py-4 text-center">
                      <Link
                        href={`/code-inspector?file=${encodeURIComponent(file.name)}`}
                        className="inline-flex items-center gap-1.5 rounded-md bg-[#F28C45] px-3 py-2 text-sm text-white transition hover:bg-[#E77C32]"
                      >
                        <Code2 size={15} />
                        View Code
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="grid gap-3 md:hidden">
            {affectedFiles.map((file) => (
              <div
                key={file.name}
                className="rounded-xl bg-white p-4"
              >
                <div className="flex items-center gap-3">
                  <div className="rounded-md bg-[#FFF1E6] p-2 text-[#F28C45]">
                    <FileCode2 size={20} />
                  </div>

                  <div className="min-w-0">
                    <p className="font-medium text-black">{file.name}</p>
                    <p className="break-all font-serif text-xs text-[#896953]">
                      {file.path}
                    </p>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <span className="font-mono text-sm text-[#F28C45]">
                    Relevance: {file.score}%
                  </span>

                  <Link
                    href={`/code-inspector?file=${encodeURIComponent(file.name)}`}
                    className="rounded-md bg-[#F28C45] px-3 py-2 text-sm text-white"
                  >
                    View Code
                  </Link>
                </div>

                <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-[#EDE5DF]">
                  <div
                    className="h-full rounded-full bg-[#F28C45]"
                    style={{ width: `${file.score}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Back Button */}
        <Link
          href="/upload"
          className="mt-10 inline-flex items-center gap-3 font-mono text-base text-black transition hover:text-[#F28C45]"
        >
          <ArrowLeft size={20} />
          Back to Upload
        </Link>
      </div>
    </main>
  );
}

function SummaryItem({
  icon,
  label,
  value,
  suffix,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  suffix?: string;
}) {
  return (
    <div className="flex min-w-0 items-center gap-3">
      <div className="shrink-0 rounded-lg bg-[#FFF1E6] p-3 text-[#F28C45]">
        {icon}
      </div>

      <div className="min-w-0">
        <p className="font-mono text-[11px] text-[#333333]">{label}</p>

        <p className="truncate text-lg font-semibold text-black">
          {value}
          {suffix && (
            <span className="ml-1 text-sm font-normal">{suffix}</span>
          )}
        </p>
      </div>
    </div>
  );
}