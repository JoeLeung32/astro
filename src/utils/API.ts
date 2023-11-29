const options = {
	headers: {
		Authorization: `Bearer ${import.meta.env.SECRET_API_KEY}`
	}
}

export default {
	get: async (url: string) => {
		const response = await fetch(url, {
			...options,
			method: "GET"
		})
		return response.json()
	},
	post: async (url:string) => {
		const response = await fetch(url, {
			...options,
			method: "POST"
		})
		return response.json()
	}
}
