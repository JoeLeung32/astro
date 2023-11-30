import type {StrApiData, StrApiResponse} from "@sources/strapi/Type/Type"

type Place_Location_Postcode = {
    name: string
    postcode?: string
}

type ATTR_Place_Location_Postcode = StrApiData & {
    id: number,
    attributes?: Place_Location_Postcode
}

export type RES_Place_Location_Postcode = StrApiResponse & {
    data: ATTR_Place_Location_Postcode[]
}