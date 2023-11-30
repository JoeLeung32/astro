import API from "@utils/API.ts"
import type {RES_Place_Region} from "@sources/strapi/Type/Place_Region.tsx";

const apiURL = (api: string = "", q?: Params) => {
    const url = new URL(`${import.meta.env.SECRET_API_PATH}${api}`, import.meta.env.SECRET_API_BASE_URL)
    if (q?.populate && q?.populate.length) {
        q?.populate.forEach((d: { name: string, value: string }) => {
            url.searchParams.append(d.name, d.value)
        })
    }
    if (q?.fields && q?.fields.length) {
        q?.fields.forEach((d: { name: string, value: string }) => {
            url.searchParams.append(d.name, d.value)
        })
    }
    if (q?.filter && q?.filter.length) {
        q?.filter.forEach((d: { name: string, value: string }) => {
            url.searchParams.append(d.name, d.value)
        })
    }
    if (q?.sort && q?.sort.length) {
        q?.sort.forEach((d: { name: string, value: string }) => {
            url.searchParams.append(d.name, d.value)
        })
    }
    return url
}

export default {
    countries: async () => {
        const url = apiURL("/place-countries")
        const path = decodeURIComponent(url.toString())
        return await API.get(path)
    },
    regions: async (q?: Params) => {
        const url = apiURL("/place-regions", q)
        const path = decodeURIComponent(url.toString())
        return await API.get(path)
    },
    locations: async (q?: Params) => {
        const url = apiURL("/place-locations", q)
        const path = decodeURIComponent(url.toString())
        return await API.get(path)
    },
    australia: {
        country: async () => {
            const url = apiURL("/place-countries")
            url.searchParams.append("filters[name][$eqi]", "Australia")
            url.searchParams.append("populate[place_regions][fields][0]", "name")
            const path = decodeURIComponent(url.toString())
            return await API.get(path)
        },
        regions: async (q?: Params): Promise<RES_Place_Region> => {
            const url = apiURL("/place-regions", q)
            url.searchParams.append("fields[0]", "name")
            url.searchParams.append("fields[1]", "abbreviation")
            url.searchParams.append("fields[2]", "type")
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