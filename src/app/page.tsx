
import Link from "next/link";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import { ArrowRight, Upload } from "lucide-react";

export default function HomePage() {
  return (
    <div className="flex gap-3">
      <Button variant="primary">
        Start Analysis
        <ArrowRight size={18} />
      </Button>

      <Button variant="secondary">
        Cancel
      </Button>

      <Button variant="outline">
        <Upload size={18} />
        Upload File
      </Button>

      <Card padding="large">
        <h2 className="text-xl font-bold">
          E-Commerce Management System
        </h2>

        <p className="text-textgrey mt-2">
          A web application for managing orders and inventory.
        </p>

        <div className="flex gap-2">
          <Badge>TypeScript</Badge>
          <Badge>Next.js</Badge>
          <Badge variant="primary">Semantic Retrieval</Badge>
          <Badge variant="success">Added</Badge>
        </div>
      </Card>
    </div>
  );
}