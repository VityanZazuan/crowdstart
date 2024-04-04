export interface IProject {
    title:string
    description:string
    author: string
    totalFunded:number
    daysRemaining:number
    tags:string
    id: number
    link: string
    image: string
    goal: number
}
export interface IProject2 {
    title:string
    description:string
    author: string
    totalFunded:number
    daysRemaining:number
    // tags:string
    id: number
    link: string
    // image: string
    goal: number
    created_at: Date
    
}