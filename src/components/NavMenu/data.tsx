import strapi from "../../sources/strapi/strapi.tsx"
import type { RES_Place_Region} from "../../sources/strapi/Type/Place_Region.tsx";

export type NavItem = {
	title: string
	child?: NavItem[]
	href?: string | URL
	target?: "_blank" | "_self"
}

const baseURL = import.meta.env.BASE_URL
const data: NavItem[] = [
	{ title: "Home", href: baseURL }
]

export default await new Promise(async (resolve) => {
	const { data: australiaRegionsData } = await strapi.australia.regions({
		filter: [
			{name: "filters[place_country][name][$eqi]", value: "Australia"},
			{name: "filters[place_location_postcodes][id][$gte]", value: "1"}
		],
		/*
		populate: [
			{name: "populate[place_country][fields][0]", value: "name"}
		]
		*/
	}) as RES_Place_Region
	const travelLog: NavItem = {
		title: "Travel Log",
		href: `/Travel Log`,
		child: []
	}
	const australiaRegionsNavItem: NavItem[] | [] = australiaRegionsData.map((d: any) => {
		const { attributes } = d
		// const countryName = attributes.place_country.data.attributes.name;
		return {
			title: attributes?.name,
			href: `/Travel Log/Australia/${attributes.name}`
		} as NavItem
	})
	travelLog.child?.push({
		title: "Australia",
		href: `/Travel Log/Australia/`,
		child: australiaRegionsNavItem
	})
	data.push(travelLog)
	data.push({ title: "Test", href: "/test" })
	resolve(data)
})
