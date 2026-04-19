import type { Metadata } from "next"

import { AssessmentTool } from "@/components/openclaw/assessment-tool"

export const metadata: Metadata = {
  title: "Workflow Assessment - OpenClaw Services",
  description:
    "Analyze your current workflow, estimate time savings, and get an OpenClaw agent plan recommendation.",
}

export default function AssessmentPage() {
  return <AssessmentTool />
}
