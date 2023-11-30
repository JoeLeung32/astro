import strapi from "../../../sources/strapi/strapi.tsx"
import type { RES_Place_Region} from "../../../sources/strapi/Type/Place_Region.tsx";

const queryRegion = async (region: string) => {
	const { data: australiaRegionsData } = await strapi.australia.regions({
		filter: [
			{ name: "filters[place_country][name][$eqi]", value: "Australia" },
			{ name: "filters[name][$eqi]", value: region }
		],
		populate: [
			{ name: "populate[place_location_postcodes][fields][0]", value: "name" },
			{ name: "populate[place_location_postcodes][fields][1]", value: "postcode" }
		]
	}) as RES_Place_Region
	return australiaRegionsData
}

export default queryRegion