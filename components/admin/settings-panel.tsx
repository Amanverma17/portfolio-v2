"use client"
import { Save } from "lucide-react"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function SettingsPanel() {
    const [loading, setLoading] = useState(false)

    const [form, setForm] = useState({
        heroName: "",
        heroRole: "",
        heroDescription: "",
        heroFocus: "",
        heroStatus: "",
        heroMajor: "",
        github: "",
        linkedin: "",
        email: "",
        phone: "",
        location: "",
    })

    useEffect(() => {
        loadSettings()
    }, [])

    async function loadSettings() {
        try {
            const res = await fetch("/api/settings")
            const data = await res.json()

            setForm({
                heroName: data.heroName || "",
                heroRole: data.heroRole || "",
                heroDescription: data.heroDescription || "",
                heroFocus: data.heroFocus || "",
                heroStatus: data.heroStatus || "",
                heroMajor: data.heroMajor || "",
                github: data.github || "",
                linkedin: data.linkedin || "",
                email: data.email || "",
                phone: data.phone || "",
                location: data.location || "",
            })
        } catch (err) {
            console.error(err)
        }
    }

    async function saveSettings() {
        setLoading(true)

        try {
            const res = await fetch("/api/settings", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(form),
            })

            if (!res.ok) throw new Error("Failed")

            alert("✅ Settings saved successfully.")
        } catch (err) {
            console.error(err)
            alert("❌ Failed to save settings.")
        }

        setLoading(false)
    }

    return (
        <div className="space-y-6">

            <div className="flex items-center justify-between">
                <h2 className="font-mono text-lg font-bold uppercase tracking-wider">
                    Portfolio Settings
                </h2>

                <Button
                    size="sm"
                    onClick={saveSettings}
                    disabled={loading}
                    className="font-mono text-xs uppercase bg-foreground text-background hover:bg-foreground/90"
                >
                    <Save className="h-4 w-4 mr-2" />
                    {loading ? "Saving..." : "Save Changes"}
                </Button>
            </div>

            {/* HERO */}
            <div className="border border-border rounded-md p-6 space-y-5">

                <h3 className="font-mono uppercase tracking-wider text-sm font-bold">
                    Hero Section
                </h3>

                <div>
                    <label className="block mb-2 text-xs font-mono uppercase tracking-wider text-muted-foreground">
                        Hero Name
                    </label>
                    <Input
                        value={form.heroName}
                        onChange={(e) =>
                            setForm({ ...form, heroName: e.target.value })
                        }
                    />
                </div>

                <div>
                    <label className="block mb-2 text-xs font-mono uppercase tracking-wider text-muted-foreground">
                        Hero Role
                    </label>
                    <Input
                        value={form.heroRole}
                        onChange={(e) =>
                            setForm({ ...form, heroRole: e.target.value })
                        }
                    />
                </div>

                <div>
                    <label className="block mb-2 text-xs font-mono uppercase tracking-wider text-muted-foreground">
                        Hero Description
                    </label>


                    <textarea
                        rows={5}
                        className="w-full border border-foreground rounded-md p-3"
                        value={form.heroDescription}
                        onChange={(e) =>
                            setForm({ ...form, heroDescription: e.target.value })
                        }
                    />
                </div>

                <div>
                    <label className="block mb-2 text-xs font-mono uppercase tracking-wider text-muted-foreground">
                        Hero Focus (Terminal)
                    </label>


                    <Input
                        value={form.heroFocus}
                        onChange={(e) =>
                            setForm({ ...form, heroFocus: e.target.value })
                        }
                    />
                </div>

                <div>
                    <label className="block mb-2 text-xs font-mono uppercase tracking-wider text-muted-foreground">
                        Hero Status (Terminal)
                    </label>

                    <Input
                        value={form.heroStatus}
                        onChange={(e) =>
                            setForm({ ...form, heroStatus: e.target.value })
                        }
                    />
                </div>

                <div>
                    <label className="block mb-2 text-xs font-mono uppercase tracking-wider text-muted-foreground">
                        Hero Major
                    </label>

                    <Input
                        value={form.heroMajor}
                        onChange={(e) =>
                            setForm({ ...form, heroMajor: e.target.value })
                        }
                    />
                </div>

            </div>

            {/* SOCIAL */}
            <div className="border border-border rounded-md p-6 space-y-5">

                <h3 className="text-xl font-mono font-bold border-b pb-2">
                    🌐 Social Links
                </h3>

                <div>
                    <label className="block mb-2 text-xs font-mono uppercase tracking-wider text-muted-foreground">
                        GitHub URL
                    </label>

                    <Input
                        value={form.github}
                        onChange={(e) =>
                            setForm({ ...form, github: e.target.value })
                        }
                    />
                </div>

                <div>
                    <label className="block mb-2 text-xs font-mono uppercase tracking-wider text-muted-foreground">
                        LinkedIn URL
                    </label>

                    <Input
                        value={form.linkedin}
                        onChange={(e) =>
                            setForm({ ...form, linkedin: e.target.value })
                        }
                    />
                </div>

            </div>

            {/* CONTACT */}
            <div className="border border-border rounded-md p-6 space-y-5">

                <h3 className="text-xl font-mono font-bold border-b pb-2">
                    📞 Contact Information
                </h3>

                <div>
                    <label className="block mb-2 text-xs font-mono uppercase tracking-wider text-muted-foreground">
                        Email
                    </label>

                    <Input
                        value={form.email}
                        onChange={(e) =>
                            setForm({ ...form, email: e.target.value })
                        }
                    />
                </div>

                <div>
                    <label className="block mb-2 text-xs font-mono uppercase tracking-wider text-muted-foreground">
                        Phone Number
                    </label>

                    <Input
                        value={form.phone}
                        onChange={(e) =>
                            setForm({ ...form, phone: e.target.value })
                        }
                    />
                </div>

                <div>
                    <label className="block mb-2 text-xs font-mono uppercase tracking-wider text-muted-foreground">
                        Location
                    </label>

                    <Input
                        value={form.location}
                        onChange={(e) =>
                            setForm({ ...form, location: e.target.value })
                        }
                    />
                </div>

            </div>



        </div>
    )
}