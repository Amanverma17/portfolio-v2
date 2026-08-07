"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Github, Download } from "lucide-react"

export function HeroSection() {
  const [terminalLines, setTerminalLines] = useState<string[]>([])
  const [settings, setSettings] = useState<any>(null)

  const fullTerminalContent = [
    "$ whoami",
    `> ${settings?.heroName || "Aman Verma"}`,
    "",
    "$ role",
    `> ${settings?.heroRole || "Aspiring Software Engineer"}`,
    "",
    "$ focus",
    `> ${settings?.heroFocus || "Java Backend | Spring Boot | DSA"}`,
    "",
    "$ status",
    `> ${settings?.heroStatus || "Learning, Building, Improving"}`,
    "",
    `Major: ${settings?.heroMajor || "B.Tech Information Technology"}`,
  ];

  useEffect(() => {
    async function loadSettings() {
      try {
        const res = await fetch("/api/settings")
        const data = await res.json()
        setSettings(data)
      } catch (err) {
        console.error(err)
      }
    }

    loadSettings()
  }, [])

  useEffect(() => {
    if (!settings) return;

    setTerminalLines([]);

    let current = 0;

    const interval = setInterval(() => {
      current++;

      setTerminalLines(fullTerminalContent.slice(0, current));

      if (current >= fullTerminalContent.length) {
        clearInterval(interval);
      }
    }, 150);

    return () => clearInterval(interval);
  }, [settings]);

  return (
    <section id="home" className="min-h-screen flex items-center bg-background py-20">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Terminal Intro */}
          <div className="space-y-6">
            <div className="font-mono">
              <h1 className="text-5xl md:text-6xl font-bold text-foreground leading-tight">
                <span className="text-muted-foreground">$</span>sudo<br />
                whoami
              </h1>
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mt-2">
                {settings?.heroName || "Aman Verma"}
              </h2>
            </div>

            <p className="text-muted-foreground text-lg max-w-md leading-relaxed">
              {settings?.heroDescription || "Building scalable backend applications with Java, Spring Boot, and modern web technologies while continuously improving problem-solving through Data Structures & Algorithms."}
            </p>

            <div className="flex gap-4 pt-4">
              <Button
                asChild
                className="bg-foreground text-background hover:bg-foreground/90 font-mono uppercase tracking-wider"
              >
                <a href={settings?.github || "https://github.com/Amanverma17"} target="_blank" rel="noopener noreferrer">
                  <Github className="mr-2 h-4 w-4" />
                  View Repository
                </a>
              </Button>
              <Button
                variant="outline"
                className="border-foreground text-foreground hover:bg-foreground hover:text-background font-mono uppercase tracking-wider bg-transparent cursor-pointer"
                onClick={() => window.open(`/api/resume?t=${Date.now()}`, '_blank')}
              >
                <Download className="mr-2 h-4 w-4" />
                Resume
              </Button>
            </div>
          </div>

          {/* Right Side - Terminal Window */}
          <div className="bg-foreground rounded-lg overflow-hidden shadow-2xl border border-border">
            {/* Terminal Header */}
            <div className="flex items-center gap-2 px-4 py-3 bg-muted/10 border-b border-border">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-destructive/50" />
                <div className="w-3 h-3 rounded-full bg-warning/50" />
                <div className="w-3 h-3 rounded-full bg-success/50" />
              </div>
              <span className="text-xs text-background/60 font-mono ml-2">aman ~ bash</span>
            </div>

            {/* Terminal Content */}
            {/* Terminal Content */}
            <div className="p-6 font-mono text-sm text-background min-h-[350px] overflow-auto max-h-[450px]">
              {terminalLines.map((line, index) => {
                let textClass = "text-background/60";

                if (line.startsWith("$")) {
                  textClass = "text-background";
                } else if (line.startsWith(">")) {
                  textClass = "text-background/70";
                } else if (line.startsWith("Major:")) {
                  textClass = "text-background font-semibold";
                }

                return (
                  <div
                    key={index}
                    className={`leading-relaxed mb-1 min-h-[1.25rem] ${textClass}`}
                  >
                    {line || <>&nbsp;</>}
                  </div>
                );
              })}

              <span className="inline-block w-2 h-4 bg-background animate-pulse ml-1" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
