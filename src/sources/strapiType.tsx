type Pagination = {
	page: number
	pageSize: number
	pageCount: number
	total: number
}

type StrApiData = {
	id?: number
	attributes?: {} | null
}

type StrApiResponse = {
	data: StrApiData | null
	meta?: {
		pagination?: Pagination
	}
}

// Place_Region START
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

// Place_Location_Postcode START
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
