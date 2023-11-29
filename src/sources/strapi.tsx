import API from "../utils/API.ts"
import type { RES_Place_Region } from "./strapiType.tsx"

const apiUrl = (api: string) => new URL(`${import.meta.env.SECRET_API_PATH}${api}`, import.meta.env.SECRET_API_BASE_URL)

export default {
	australia: {
		/*
		country: async () => {
			const url = apiUrl("/place-countries")
			url.searchParams.append("filters[name][$eqi]", "Australia")
			url.searchParams.append("populate[place_regions][fields][0]", "name")
			const path = decodeURIComponent(url.toString())
			return await API.get(path)
		},
		*/
		regions: async ({ populate, fields, filter, sort }: Params): Promise<RES_Place_Region> => {
			const url = apiUrl("/place-regions")
			url.searchParams.append("fields[0]", "name")
			url.searchParams.append("fields[1]", "abbreviation")
			url.searchParams.append("fields[2]", "type")
			if (populate && populate.length) {
				populate.forEach((d: { name: string, value: string }) => {
					url.searchParams.append(d.name, d.value)
				})
			}
			if (fields && fields.length) {
				fields.forEach((d: { name: string, value: string }) => {
					url.searchParams.append(d.name, d.value)
				})
			}
			if (filter && filter.length) {
				filter.forEach((d: { name: string, value: string }) => {
					url.searchParams.append(d.name, d.value)
				})
			}
			if (sort && sort.length) {
				sort.forEach((d: { name: string, value: string }) => {
					url.searchParams.append(d.name, d.value)
				})
			}
			url.searchParams.append("sort[1]", "name")
			const path = decodeURIComponent(url.toString())
			return await API.get(path)
		}
	}
}

type Params = {
	populate?: { name: string; value: string }[],
	fields?: { name: string; value: string }[],
	filter?: { name: string; value: string }[],
	// locale?: { name: string; value: string }[],
	// publicationState?: { name: string; value: string }[],
	sort?: { name: string; value: string }[],
	// pagination?: { name: string; value: string }[]
}