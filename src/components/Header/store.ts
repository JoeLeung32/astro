import type { Writable } from "svelte/store"
import { writable } from "svelte/store"

class MenuStore {
	constructor(
		public activeMenu: Writable<string[] | []> = writable([])
	) {
	}
}

export default new MenuStore()
