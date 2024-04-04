import { ESupabaseErrorResponceCodes, EsupabseSuccesResponceCodes } from "./supabase-responce.enum";

export interface ISupabaseResponce<T> { 
    error: string,
    data: T[],
    status: ESupabaseErrorResponceCodes | EsupabseSuccesResponceCodes,
    statusText: string,
    count: number
}