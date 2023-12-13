<script>
	export let wrapper
	export let item
	export let offset

	function loadMore() {
		function getItems() {
			return Array.from(document.querySelector(wrapper)?.querySelectorAll(item) || [])
		}

		const elements = getItems()
		const jobs = elements?.slice(0, offset)
		if (jobs.length) {
			jobs?.forEach((d, idx) => {
				d.classList.remove("hidden")
				console.log(getItems().length, idx)
				if (getItems().length < idx) {
					this.classList.add("hidden")
				}
			})
		} else {
			this.classList.add("hidden")
		}
	}
</script>

<p data-loadMore data-wrapper={wrapper} data-item={item}
   on:click={loadMore}
   class="flex flex-wrap justify-start items-end rounded-3xl shadow-md px-4 py-2 font-medium leading-none cursor-pointer select-none">
	Load more photos
</p>
