import strapi from "../../../sources/strapi.tsx"
import type { RES_Place_Region } from "../../../sources/strapiType.tsx"

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
		]
	}) as RES_Place_Region
	const travelLog: NavItem = {
		title: "Travel Log",
		child: []
	}
	const australiaRegionsNavItem: NavItem[] | [] = australiaRegionsData.map(d => {
		const { attributes } = d
		return {
			title: attributes?.name,
			href: `/travelLog/${encodeURIComponent(attributes?.name || baseURL)}`
		} as NavItem
	})
	travelLog.child?.push({
		title: "Australia",
		child: australiaRegionsNavItem
	})
	data.push(travelLog)
	data.push({ title: "Test", href: "/test" })
	resolve(data)
})
