export enum ESupabaseErrorResponceCodes { 
    not_found = 404,
    already_exists = 409,
    unauthorized = 403,
    too_many_requests = 429,
    db_timeout = 544,
    internal_server_error = 500
}
export enum EsupabseSuccesResponceCodes { 
    ok = 200,
    created = 201,
    no_content = 204
}