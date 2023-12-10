import type Place_Region from "@interface/place_region.ts"
import type Place_Location from "@interface/place_location.ts"

export default interface Place_Location_PostCode {
	id: number,
	attributes: {
		name: string
		postcode: string
		createdAt: string
		updatedAt: string
		publishedAt: string
		place_locations: {
			data: Place_Location[]
		}
		place_region: {
			data: Place_Region
		}
	}
}
