<script>
	import Icon from "@iconify/svelte"
	import { onMount } from 'svelte'
	import menuItem from "./data"

	let menuSelected;

	function triggerUrl(url) {
		if (window) window.location.href = url.replace("//", "/")
	}

	function onClick(type, value) {
		switch (type) {
			case "href": {
				triggerUrl(value)
				break;
			}
			default: {
				menuSelected = type
				break;
			}
		}
	}

	function onResize () {
		menuSelected = undefined
	}

	onMount(() => {
		window.addEventListener('resize', onResize);

		return () => {
			window.removeEventListener('resize', onResize);
		}
	});
</script>
<header class="bg-white shadow select-none ff-baloo">
	<nav class="container mx-auto flex flex-wrap justify-between items-center px-2">
		<div>
			<div class="p-2">
				<Icon icon="mdi:sprout" class="text-3xl" />
				{menuSelected}
			</div>
		</div>
		<div class="block md:hidden">
			<div on:click={() => onClick("mobileMenu")} class="p-2">
				<Icon icon="mdi:menu" class="text-2xl" />
			</div>
		</div>
		<div class="hidden md:block">
			<div class="navMenu">
				{#each menuItem.entries() as [idx, menu]}
					{#if menu.child && menu.child.length}
						<span on:click={() => onClick("tabletMenu")}>
							{menu.title}
							<Icon icon="mdi:chevron-down" class="text-lg" />
						</span>
					{:else}
						<span on:click={() => onClick("href", menu.href)}>
							{menu.title}
						</span>
					{/if}
				{/each}
			</div>
		</div>
		<div class="hidden md:block">3</div>
	</nav>
</header>
<style>
	header {
		grid-area: hd-bf;

        .navMenu {
            @apply flex flex-wrap justify-start items-center gap-x-4 bg-white relative z-10;
            @apply hidden md:flex;
            @apply absolute right-0 md:relative;
            @apply flex-col md:flex-row;
            @apply w-2/3 md:w-auto;
            @apply shadow-md md:shadow-none;

			> span {
                @apply flex flex-wrap justify-between items-center;
                @apply w-full md:w-auto;
                @apply p-4 md:p-2;
			}
        }
	}
</style>