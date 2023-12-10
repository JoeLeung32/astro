interface ImageObject {
	ext: string
	url: string
	hash: string
	mime: string
	name: string
	path: string
	size: number
	width: number
	height: number
}

export default interface StrapiMediaImage {
	id: number,
	attributes: {
		name: string
		alternativeText: string
		caption: string
		width: number
		height: number
		formats: {
			large: ImageObject
			small: ImageObject
			medium: ImageObject
			xlarge: ImageObject
			xsmall: ImageObject
			thumbnail: ImageObject
		}
		hash: string
		ext: string
		mime: string
		size: number
		url: string
		previewUrl: string
		provider: string
		provider_metadata: string
		createdAt: string
		updatedAt: string
	}
}
