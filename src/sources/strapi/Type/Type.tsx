export type StrApiPagination = {
    page: number
    pageSize: number
    pageCount: number
    total: number
}

export type StrApiData = {
    id?: number
    attributes?: {} | null
}

export type StrApiResponse = {
    data: StrApiData | null
    meta?: {
        pagination?: StrApiPagination
    }
}