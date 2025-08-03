export interface Category {
    name: string,
    userId: number
}
export interface NewCategory {
    name: string,
    userId: number
}
export interface UpdateCategory {
    name: string,
    userId?: number
}