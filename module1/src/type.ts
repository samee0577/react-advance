export interface Engineer{
    id: number,
    name: string,
    role: string,
    status: "available" | "busy" | "offline",
    skills: string[]
}