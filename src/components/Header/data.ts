export type NavItem = {
	title: string
	child?: NavItem[]
	href?: string | URL
	target?: "_blank" | "_self"
}

const baseURL = import.meta.env.BASE_URL
const data: NavItem[] = [
	{ title: "Home", href: baseURL },
	{
		title: "Topic", href: "/topic", child: [
			{ title: "Travel", href: "/topic/travel" },
		]
	}
]

export default await new Promise(async (resolve) => {
	resolve(data)
})
