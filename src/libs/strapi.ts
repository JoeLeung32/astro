interface Props {
	endpoint: string;
	wrappedByKey?: string;
	wrappedByList?: boolean;
	query?: Record<string, string>;
}

export default async function fetchApi<T>({ endpoint, query, wrappedByKey, wrappedByList }: Props): Promise<T> {
	if (endpoint.startsWith("/")) {
		endpoint = endpoint.slice(1)
	}

	const url = new URL([
		import.meta.env.SECRET_API_BASE_URL,
		"api",
		endpoint
	].join("/"))

	if (query) {
		Object.entries(query).forEach(([key, value]) => {
			url.searchParams.append(key, value)
		})
	}

	const response = await fetch(url.toString(), {
		headers: {
			Authorization: `Bearer ${import.meta.env.SECRET_API_KEY}`
		}
	})
	let data = await response.json()

	if (wrappedByKey) data = data[wrappedByKey]
	if (wrappedByList) data = data[0]

	return data as T
}
