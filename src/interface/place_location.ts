import type StrapiMediaImage from "@interface/strapi_media_image.ts"
import type Place_Location_Tag from "@interface/place_location_tag.ts"
import type Place_Location_Type from "@interface/place_location_type.ts"
import type Place_Location_PostCode from "@interface/place_location_postcode.ts"

export default interface Place_Location {
	id: number,
	attributes: {
		name: string
		address: string
		latitude: string
		longitude: string
		description: string
		createdAt: string
		updatedAt: string
		publishedAt: string
		images: {
			data: StrapiMediaImage[]
		}
		place_location_tags: {
			data: Place_Location_Tag[]
		}
		place_location_type: {
			data: Place_Location_Type
		}
		place_location_postcode: {
			data: Place_Location_PostCode
		}
	}
}
