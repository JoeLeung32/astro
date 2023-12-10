import type Place_Country from "@interface/place_country.ts"
import type Place_Location_PostCode from "@interface/place_location_postcode.ts"

export default interface Place_Region {
	id: number
	attributes: {
		name: string
		abbreviation: string
		type: string
		createdAt: string
		updatedAt: string
		publishedAt: string
		place_location_postcodes: {
			data: Place_Location_PostCode[]
		}
		place_country: {
			data: Place_Country
		}
	}
}
