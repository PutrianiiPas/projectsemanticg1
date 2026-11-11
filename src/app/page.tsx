
import Link from "next/link";
import {
  FolderCode,
  ArrowRight,
} from "lucide-react";

import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";

export default function HomePage() {
  return (
    <main className="min-h-[calc(100vh-72px)] bg-bg1 px-5 py-16 md:flex md:items-center md:justify-center md:px-8 md:py-12">
      <div className="mx-auto w-full max-w-[900px]">
        {/* Hero Section */}
        <section className="mb-16 text-center">
          <span className="inline-flex rounded-md border border-primary px-6 py-1 text-sm font-medium">
            BPMN Semantic Engine
          </span>

          <h1 className="mt-4 font-mono text-3xl font-bold leading-tight text-black md:text-[40px]">
            Analyze BPMN Changes
          </h1>

          <p className="mt-4 font-mono text-sm text-text1 md:text-base">
            Identify potentially affected source code through Semantic Retrieval
          </p>
        </section>

        {/* Repository Section */}
        <section className="mx-auto max-w-[688px]">
          <p className="mb-2 ml-3 font-mono text-sm text-text2">
            SELECT TARGET REPOSITORY
          </p>

          <Card padding="large" className="md:px-[57px] md:py-[47px]">
            {/* Repository Information */}
            <div className="flex flex-col items-center gap-5 rounded-[20px] bg-button p-5 sm:flex-row sm:px-5 sm:py-7">
              <div className="flex h-[68px] w-[68px] shrink-0 items-center justify-center rounded-lg bg-white text-primary">
                <FolderCode size={34} strokeWidth={1.8} />
              </div>

              <div className="text-center sm:text-left">
                <h2 className="text-xl font-semibold text-black md:text-[25px]">
                  E-Commerce Management System
                </h2>

                <p className="mt-1 font-mono text-xs text-text1">
                  A web application for managing orders and inventory
                </p>
              </div>
            </div>

            {/* Technologies */}
            <div className="mt-4 flex flex-wrap gap-2">
              <Badge>TypeScript</Badge>
              <Badge>Next.js</Badge>
              <Badge>Node.js</Badge>
            </div>

            {/* Action */}
            <div className="mt-6 flex justify-center sm:justify-end">
              <Link href="/upload">
                <Button className="font-mono">
                  Start New Analysis
                  <ArrowRight size={19} />
                </Button>
              </Link>
            </div>
          </Card>
        </section>
      </div>
    </main>
  );
}