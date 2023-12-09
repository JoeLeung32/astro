import type Place_Region from "@interface/place_region.ts"

export default interface Place_Country {
	id: number;
	attributes: {
		name: string;
		alpha2code: string;
		alpha3code: string;
		createdAt: string;
		updatedAt: string;
		publishedAt: string;
		place_regions: Place_Region[];
		capital: Place_Region
	}
}
