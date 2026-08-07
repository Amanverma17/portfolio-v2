import { Terminal } from "lucide-react"

const skillCategories = [
  {
    title: "PROGRAMMING LANGUAGES",
    skills: [
      "Java",
      "Python",
      "SQL"
    ],
  },
  {
    title: "BACKEND",
    skills: [
      "Spring Boot",
      "Spring Security",
      "Hibernate",
      "REST APIs",
      "Maven"
    ],
  },
  {
    title: "DATABASES",
    skills: [
      "PostgreSQL",
      "MySQL",
      "MongoDB"
    ],
  },
  {
    title: "TOOLS",
    skills: [
      "Git",
      "GitHub",
      "Postman",
      "IntelliJ IDEA",
      "VS Code",
      "Docker"
    ],
  },
  {
    title: "CORE CS",
    skills: [
      "Data Structures & Algorithms",
      "Object-Oriented Programming",
      "DBMS",
      "Operating Systems",
      "Computer Networks"
    ],
  },
]
export function SkillsSection() {
  return (
    <section id="skills" className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="flex items-center gap-3 mb-12">
          <Terminal className="h-6 w-6 text-foreground" />
          <h2 className="text-4xl font-mono font-bold text-foreground">/SKILLS</h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category) => (
            <div
              key={category.title}
              className="border border-foreground bg-background p-6 hover:bg-foreground hover:text-background transition-colors group"
            >
              <div className="flex items-center gap-2 mb-4">
                <span className="text-muted-foreground group-hover:text-background/60 font-mono text-xs">
                  {"//"}
                </span>
                <h3 className="font-mono text-sm font-bold uppercase tracking-wider">
                  {category.title}
                </h3>
              </div>

              <ul className="space-y-2">
                {category.skills.map((skill) => (
                  <li key={skill} className="flex items-center gap-2 font-mono text-sm">
                    <span className="text-muted-foreground group-hover:text-background/60">{">"}</span>
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>


      </div>
    </section>
  )
}
