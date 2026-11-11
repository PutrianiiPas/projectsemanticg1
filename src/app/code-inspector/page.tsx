
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  ArrowLeft,
  CheckCircle2,
  Copy,
  FileCode2,
  Info,
  UserRound,
  Code2,
} from "lucide-react";

const fileDetails: Record<
  string,
  {
    path: string;
    language: string;
    lines: number;
    context: string;
    code: { number: number; content: string; highlighted?: boolean }[];
  }
> = {
  "orderService.ts": {
    path: "src/services/orderService.ts",
    language: "TypeScript",
    lines: 244,
    context: "Order approval threshold validation",
    code: [
      { number: 45, content: "import { ApprovalResult, ApprovalStatus } from '../types/workflow';" },
      { number: 46, content: "import { OrderRepository } from '../repositories/orderRepo';" },
      { number: 47, content: "" },
      { number: 48, content: "// Order validation against workflow thresholds" },
      { number: 49, content: "public async evaluateOrderApproval(orderId: string, amount: number): Promise<ApprovalResult> {" },
      { number: 50, content: "  const order = await this.repo.findById(orderId);" },
      { number: 51, content: "  // [AFFECTED SECTION] Semantic match to 'Approve Order'", highlighted: true },
      { number: 52, content: "  if (order.totalAmount >= 10000.00) {", highlighted: true },
      { number: 53, content: "    return { status: ApprovalStatus.PENDING_SENIOR_REVIEW, threshold: 10000 };", highlighted: true },
      { number: 54, content: "  }", highlighted: true },
      { number: 55, content: "  return this.proceedToFulfillment(order);", highlighted: true },
      { number: 56, content: "}", highlighted: true },
      { number: 57, content: "" },
      { number: 58, content: "private async proceedToFulfillment(order: OrderRecord): Promise<void> {" },
      { number: 59, content: "  await this.dispatchEngine.triggerWorkflowEvent(order.id, 'ORDER_APPROVED');" },
      { number: 60, content: "  return { status: ApprovalStatus.APPROVED, timestamp: Date.now() };" },
    ],
  },

  "orderController.ts": {
    path: "src/controllers/orderController.ts",
    language: "TypeScript",
    lines: 182,
    context: "Order approval request handling",
    code: [
      { number: 30, content: "import { Request, Response } from 'express';" },
      { number: 31, content: "import { OrderService } from '../services/orderService';" },
      { number: 32, content: "" },
      { number: 33, content: "// Handles incoming order approval requests" },
      { number: 34, content: "export class OrderController {" },
      { number: 35, content: "  constructor(private orderService: OrderService) {}" },
      { number: 36, content: "" },
      { number: 37, content: "  async approveOrder(req: Request, res: Response) {", highlighted: true },
      { number: 38, content: "    const { orderId } = req.params;", highlighted: true },
      { number: 39, content: "    const result = await this.orderService.evaluateOrderApproval(orderId, req.body.amount);", highlighted: true },
      { number: 40, content: "    return res.status(200).json(result);", highlighted: true },
      { number: 41, content: "  }", highlighted: true },
      { number: 42, content: "}" },
    ],
  },

  "orderRepository.ts": {
    path: "src/repositories/orderRepository.ts",
    language: "TypeScript",
    lines: 310,
    context: "Retrieving order data for approval",
    code: [
      { number: 70, content: "import { Database } from '../config/database';" },
      { number: 71, content: "import { OrderRecord } from '../types/order';" },
      { number: 72, content: "" },
      { number: 73, content: "export class OrderRepository {" },
      { number: 74, content: "  constructor(private db: Database) {}" },
      { number: 75, content: "" },
      { number: 76, content: "  async findById(orderId: string): Promise<OrderRecord> {", highlighted: true },
      { number: 77, content: "    const query = 'SELECT * FROM orders WHERE id = ?';", highlighted: true },
      { number: 78, content: "    const result = await this.db.execute(query, [orderId]);", highlighted: true },
      { number: 79, content: "    return result.rows[0] as OrderRecord;", highlighted: true },
      { number: 80, content: "  }", highlighted: true },
      { number: 81, content: "}" },
    ],
  },
};

export default function CodeInspectorPage() {
  const [fileName, setFileName] = useState("orderService.ts");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const selectedFile = params.get("file");

    if (selectedFile && fileDetails[selectedFile]) {
      setFileName(selectedFile);
    }
  }, []);

  const currentFile = fileDetails[fileName] ?? fileDetails["orderService.ts"];

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(
        currentFile.code.map((line) => line.content).join("\n")
      );
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      alert("Unable to copy code.");
    }
  };

  const copyPath = async () => {
    try {
      await navigator.clipboard.writeText(currentFile.path);
      alert("File path copied!");
    } catch {
      alert("Unable to copy file path.");
    }
  };

  return (
    <main className="min-h-screen bg-[#FFF1E6] px-5 py-8 md:px-10">
      <div className="mx-auto max-w-[1400px]">

        {/* Page Header */}
        <div className="mb-9 flex flex-col justify-between gap-5 xl:flex-row xl:items-center">
          <div className="flex flex-wrap items-center gap-4">
            <h1 className="font-mono text-3xl font-bold text-black md:text-[42px]">
              Code Impact Detail
            </h1>

            <span className="rounded-md bg-[#EEDDD0] px-3 py-1.5 font-serif text-xs text-[#5F493B]">
              Project: E-commerce Management System
            </span>
          </div>

          <button
            onClick={copyPath}
            className="flex items-center gap-3 self-start rounded-xl bg-white px-3 py-2.5 text-left transition hover:shadow-sm"
          >
            <div className="rounded-md bg-[#F0EBE8] p-2 text-[#F28C45]">
              <Code2 size={23} />
            </div>

            <div>
              <p className="text-sm font-semibold text-black">
                {fileName}
                <span className="ml-2 text-xs font-normal text-[#F28C45]">
                  ● {currentFile.language}
                </span>
              </p>
              <p className="font-mono text-[10px] text-[#896953]">
                {currentFile.path}
              </p>
            </div>

            <Copy size={20} className="ml-2 text-black" />
          </button>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 items-start gap-7 lg:grid-cols-[minmax(0,1.9fr)_minmax(340px,1fr)]">

          {/* Code Viewer */}
          <section className="min-w-0 overflow-hidden rounded-xl bg-white shadow-sm">

            {/* Editor Header */}
            <div className="flex flex-wrap items-center justify-between gap-2 bg-[#EEE9E5] px-4 py-3">
              <div className="flex items-center gap-3">
                <div className="flex gap-1">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#896953]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#896953]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#896953]" />
                </div>

                <span className="font-mono text-[11px] text-black">
                  Lines {currentFile.code[0].number}–{currentFile.code[currentFile.code.length - 1].number}
                  {" "}• Context: {currentFile.context}
                </span>
              </div>

              <span className="rounded bg-[#896953] px-2 py-1 font-mono text-[10px] text-white">
                ● Highlighted
              </span>
            </div>

            {/* Code Lines */}
            <div className="min-h-[480px] overflow-x-auto px-4 py-2 md:px-5">
              <div className="min-w-[650px]">
                {currentFile.code.map((line) => (
                  <div
                    key={line.number}
                    className={`flex min-h-[29px] items-start ${
                      line.highlighted
                        ? "rounded-sm bg-[#FFF0E5]"
                        : ""
                    }`}
                  >
                    <span
                      className={`w-10 shrink-0 select-none pr-3 text-right font-serif text-sm ${
                        line.highlighted ? "text-[#F28C45]" : "text-[#999999]"
                      }`}
                    >
                      {line.number}
                    </span>

                    <pre
                      className={`whitespace-pre font-serif text-[13px] leading-[29px] md:text-sm ${
                        line.highlighted
                          ? "text-[#A65A29]"
                          : "text-[#555555]"
                      }`}
                    >
                      {line.content}
                    </pre>
                  </div>
                ))}
              </div>
            </div>

            {/* Editor Footer */}
            <div className="flex flex-wrap items-center justify-between gap-3 bg-[#EEE9E5] px-4 py-4 font-mono text-[11px] text-black">
              <span>UTF-8&nbsp;&nbsp; {currentFile.language} (ES2022)&nbsp;&nbsp; Target: Node v20</span>

              <span className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[#F28C45]" />
                Syntactic Map Synced
              </span>
            </div>
          </section>

          {/* Impact Context */}
          <aside className="rounded-xl bg-white p-4 shadow-sm md:p-5">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
              <h2 className="text-2xl font-semibold text-[#222222]">
                Impact Context
              </h2>

              <span className="rounded-full bg-[#F5DFCE] px-3 py-1 font-mono text-xs text-[#896953]">
                94% Relevance
              </span>
            </div>

            {/* BPMN Activity */}
            <div className="mb-4 rounded-lg bg-[#F5F2F0] p-3">
              <p className="mb-2 font-mono text-xs text-[#5F493B]">
                BPMN Activity Node
              </p>

              <p className="flex items-center gap-2 text-sm font-semibold text-black">
                <CheckCircle2 size={16} className="text-[#B45B17]" />
                Approve Order
              </p>

              <div className="mt-5 flex justify-between gap-3 font-mono text-xs">
                <div>
                  <p className="mb-1 text-[#5F493B]">Change Type</p>
                  <span className="rounded bg-[#FFDCC9] px-2 py-1 text-[#994A18]">
                    Modified
                  </span>
                </div>

                <div className="text-right">
                  <p className="mb-1 text-[#5F493B]">Threshold State</p>
                  <p className="font-semibold text-[#A65A29]">
                    ≥ $10,000.00
                  </p>
                </div>
              </div>
            </div>

            {/* Retrieval Explanation */}
            <div className="mb-4">
              <h3 className="mb-2 font-mono text-sm font-semibold text-black">
                Retrieval Explanation
              </h3>

              <p className="font-mono text-[13px] leading-6 text-[#5F493B]">
                This code section handles order validation and approval,
                which is semantically related to the modified BPMN activity.
              </p>
            </div>

            {/* Semantic Alignment */}
            <div className="mb-4 rounded-lg bg-[#F5F2F0] p-3">
              <div className="mb-2 flex items-center justify-between gap-2">
                <p className="font-mono text-xs text-[#5F493B]">
                  Semantic Vector Alignment
                </p>

                <span className="font-mono text-xs text-[#C46B25]">
                  0.942 / 1.00
                </span>
              </div>

              <div className="h-2 overflow-hidden rounded-full bg-[#E8D9CE]">
                <div className="h-full w-[94.2%] rounded-full bg-[#F28C45]" />
              </div>

              <div className="mt-3 flex flex-wrap justify-between gap-2 font-mono text-[10px] text-[#896953]">
                <span>Token: "Approve"</span>
                <span>Symbol: evaluateOrderApproval</span>
              </div>
            </div>

            {/* Recommended Action */}
            <div className="rounded-lg bg-[#F0EEEE] p-3">
              <div className="flex items-start gap-3">
                <Info size={18} className="mt-0.5 shrink-0 text-[#B45B17]" />

                <div>
                  <h3 className="mb-2 font-mono text-sm font-semibold text-black">
                    Recommended Action
                  </h3>

                  <p className="font-mono text-xs leading-[1.6] text-[#5F493B]">
                    Verify if the newly altered BPMN conditional logic
                    affects the senior escalation threshold from $10,000
                    to the updated standard.
                  </p>
                </div>
              </div>
            </div>

            {/* Copy Code */}
            <button
              onClick={copyCode}
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg border border-[#E5D6CA] px-4 py-2.5 font-mono text-xs text-[#896953] transition hover:bg-[#FFF1E6]"
            >
              <Copy size={15} />
              {copied ? "Code Copied!" : "Copy Code Section"}
            </button>
          </aside>
        </div>

        {/* Back Button */}
        <Link
          href="/analysis"
          className="mt-10 inline-flex items-center gap-3 font-mono text-base text-black transition hover:text-[#F28C45]"
        >
          <ArrowLeft size={20} />
          Back to Analysis Results
        </Link>
      </div>
    </main>
  );
}