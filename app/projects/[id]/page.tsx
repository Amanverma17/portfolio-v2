"use client"

import { useEffect, useState, use } from "react"
import Link from "next/link"
import {
  ArrowLeft,
  Github,
  ExternalLink,
  Calendar,
  Terminal,
  Play,
} from "lucide-react"
import { Button } from "@/components/ui/button"

interface ProjectData {
  _id: string
  title: string
  description: string
  aboutProject?: string
  imageUrl?: string
  technologies: string[]
  link?: string
  githubUrl?: string
  githubRepoName?: string
  demoVideoUrl?: string
  isVisible: boolean
  displayOrder: number
  createdAt: string
}

export default function ProjectDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params)

  const [project, setProject] = useState<ProjectData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    async function fetchProject() {
      try {
        const response = await fetch(`/api/projects/${id}`)

        if (!response.ok) {
          throw new Error("Project not found")
        }

        const data = await response.json()
        setProject(data)
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to load project"
        )
      } finally {
        setLoading(false)
      }
    }

    fetchProject()
  }, [id])

  useEffect(() => {
    if (!loading) {
      const timer = setTimeout(() => setIsVisible(true), 50)
      return () => clearTimeout(timer)
    }
  }, [loading])

  if (loading) {
    return (
      <main className="min-h-screen bg-background">
        <div className="container mx-auto max-w-6xl px-6 py-16">
          <div className="animate-pulse space-y-6">
            <div className="h-4 w-40 bg-muted" />
            <div className="h-12 w-3/4 bg-muted" />
            <div className="h-20 w-full bg-muted" />

            <div className="flex gap-3">
              <div className="h-10 w-32 bg-muted border border-border" />
              <div className="h-10 w-32 bg-muted border border-border" />
            </div>

            <div className="h-96 w-full bg-muted border border-border" />

            <div className="h-32 w-full bg-muted border border-border" />
          </div>
        </div>
      </main>
    )
  }

  if (error || !project) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center px-6">
        <div className="text-center space-y-6">
          <div className="bg-foreground rounded-lg overflow-hidden inline-block">
            <div className="flex items-center gap-2 px-4 py-3 bg-muted/10 border-b border-border">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-destructive/50" />
                <div className="w-3 h-3 rounded-full bg-warning/50" />
                <div className="w-3 h-3 rounded-full bg-success/50" />
              </div>

              <span className="text-xs text-background/60 font-mono ml-2">
                error
              </span>
            </div>

            <div className="p-8 font-mono text-background">
              <p className="text-lg">$ cat project</p>

              <p className="text-background/60 mt-2">
                &gt; Error: {error || "Project not found"}
              </p>
            </div>
          </div>

          <Link
            href="/#projects"
            className="font-mono text-sm uppercase tracking-wider text-foreground border border-foreground px-6 py-3 hover:bg-foreground hover:text-background transition-colors inline-flex items-center"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Projects
          </Link>
        </div>
      </main>
    )
  }

  const formattedDate = new Date(project.createdAt).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  )

  return (
    <main className="min-h-screen bg-background">
      {/* Top Navigation */}
      <nav className="border-b border-border bg-background sticky top-0 z-50">
        <div className="container mx-auto max-w-6xl px-6 py-4 flex items-center justify-between">
          <Link
            href="/"
            className="font-mono text-sm font-bold text-foreground hover:text-muted-foreground transition-colors"
          >
            {project.title}
          </Link>

          <Link
            href="/#projects"
            className="font-mono text-xs uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
          >
            <ArrowLeft className="h-3 w-3" />
            Back to Projects
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <div
        className="container mx-auto max-w-6xl px-6 py-10 md:py-14"
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? "translateY(0)" : "translateY(20px)",
          transition: "opacity 0.6s ease-out, transform 0.6s ease-out",
        }}
      >
        {/* Breadcrumb */}
        <div className="font-mono text-xs text-muted-foreground mb-7 flex items-center gap-2">
          <Link
            href="/"
            className="hover:text-foreground transition-colors"
          >
            ~
          </Link>

          <span>/</span>

          <Link
            href="/#projects"
            className="hover:text-foreground transition-colors"
          >
            projects
          </Link>

          <span>/</span>

          <span className="text-foreground truncate max-w-[250px]">
            {project.githubRepoName || project.title}
          </span>
        </div>

        {/* Project Header */}
        <section className="mb-10">
          <h1 className="font-mono text-3xl sm:text-4xl md:text-5xl font-bold text-foreground leading-tight mb-4">
            <span className="text-muted-foreground">$ </span>
            {project.title}
          </h1>

          <p className="text-muted-foreground text-base md:text-lg leading-relaxed max-w-4xl">
            {project.description}
          </p>

          {/* Actions */}
          <div className="flex flex-wrap gap-3 mt-6">
            {project.githubUrl && (
              <Button
                variant="outline"
                className="font-mono text-xs uppercase tracking-wider border-foreground text-foreground hover:bg-foreground hover:text-background bg-transparent"
                asChild
              >
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="mr-2 h-4 w-4" />
                  View Source
                </a>
              </Button>
            )}

            {project.link && (
              <Button
                className="font-mono text-xs uppercase tracking-wider bg-foreground text-background hover:bg-foreground/90"
                asChild
              >
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Live Demo
                </a>
              </Button>
            )}
          </div>
        </section>

        {/* =====================================================
            DEMO VIDEO
            Only appears when demoVideoUrl exists
        ====================================================== */}
        {project.demoVideoUrl && (
          <section className="mb-10">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-mono text-xs uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                <Terminal className="h-4 w-4" />
                Project Demo
              </h2>

              <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                {project.demoVideoUrl.endsWith(".mp4")
                  ? "MP4"
                  : "VIDEO"}
              </span>
            </div>

            <div className="border border-foreground overflow-hidden bg-foreground">
              {/* Terminal Header */}
              <div className="flex items-center gap-2 px-4 py-3 border-b border-background/20">
                <div className="flex gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-background/30" />
                  <span className="w-3 h-3 rounded-full bg-background/20" />
                  <span className="w-3 h-3 rounded-full bg-background/10" />
                </div>

                <span className="font-mono text-xs text-background/50 ml-2 flex items-center gap-2">
                  <Play className="h-3 w-3" />

                  {project.githubRepoName
                    ? `${project.githubRepoName}_demo`
                    : "project_demo"}
                </span>
              </div>

              {/* Video */}
              <div className="bg-black">
                <video
                  controls
                  preload="metadata"
                  className="w-full aspect-video object-contain"
                  poster={project.imageUrl || undefined}
                >
                  <source
                    src={project.demoVideoUrl}
                    type={
                      project.demoVideoUrl.endsWith(".mp4")
                        ? "video/mp4"
                        : "video/webm"
                    }
                  />

                  Your browser does not support the video tag.
                </video>
              </div>

              {/* Video Footer */}
              <div className="px-4 py-2.5 border-t border-background/20">
                <span className="font-mono text-xs text-background/40">
                  &gt; Demo video showcasing {project.title} in action
                </span>
              </div>
            </div>
          </section>
        )}

        {/* Project Information Grid */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
          {/* About */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <Terminal className="h-4 w-4 text-muted-foreground" />

              <h2 className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                About This Project
              </h2>
            </div>

            <div className="border border-border p-6 h-full">
              <p className="text-sm md:text-base text-muted-foreground leading-7 whitespace-pre-line">
                {project.aboutProject || project.description}
              </p>
            </div>
          </div>

          {/* Details */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Terminal className="h-4 w-4 text-muted-foreground" />

              <h2 className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                Project Details
              </h2>
            </div>

            <div className="border border-border divide-y divide-border">
              <div className="p-5">
                <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-2">
                  Status
                </p>

                <p className="font-mono text-sm font-bold text-foreground">
                  Open Source
                </p>
              </div>

              <div className="p-5">
                <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-2">
                  Created
                </p>

                <p className="font-mono text-sm font-bold text-foreground flex items-center gap-2">
                  <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                  {formattedDate}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Tech Stack */}
        {project.technologies && project.technologies.length > 0 && (
          <section className="mb-10">
            <div className="flex items-center gap-2 mb-4">
              <Terminal className="h-4 w-4 text-muted-foreground" />

              <h2 className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                Tech Stack
              </h2>
            </div>

            <div className="border border-border p-5">
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="font-mono text-xs border border-foreground px-3 py-1.5 uppercase tracking-wider text-foreground hover:bg-foreground hover:text-background transition-colors"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Bottom Navigation */}
        <section className="pt-8 border-t border-border">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
            <div>
              <p className="font-mono text-xs text-muted-foreground uppercase tracking-wider">
                &gt; Explore more of my work
              </p>

              <p className="font-mono text-xs text-muted-foreground/60 mt-1">
                View other projects and experiments
              </p>
            </div>

            <Link
              href="/#projects"
              className="font-mono text-xs uppercase tracking-wider text-foreground border border-foreground px-6 py-3 hover:bg-foreground hover:text-background transition-colors inline-flex items-center gap-2"
            >
              <ArrowLeft className="h-3 w-3" />
              All Projects
            </Link>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="py-8 border-t border-border bg-background">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="font-mono text-sm text-muted-foreground">
              {">"} 2026 Aman Verma S. All rights reserved.
            </p>

            <p className="font-mono text-xs text-muted-foreground">
              Portfolio
            </p>
          </div>
        </div>
      </footer>
    </main>
  )
}