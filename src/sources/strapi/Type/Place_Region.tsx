import type {StrApiData, StrApiResponse} from "@sources/strapi/Type/Type"
import type {RES_Place_Location_Postcode} from "@sources/strapi/Type/Place_Location_Postcode.tsx";

type Place_Region = {
    name?: string
    abbreviation?: string
    type?: string
    place_location_postcodes: RES_Place_Location_Postcode[] | []
}

type ATTR_Place_Region = StrApiData & {
    id: number,
    attributes?: Place_Region
}

export type RES_Place_Region = StrApiResponse & {
    data: ATTR_Place_Region[]
}