<script>
	import Icon from "@iconify/svelte"
	import { onMount } from 'svelte'
	import HeaderNavbarItem from "./HeaderNavbarItem.svelte"

	import MenuStore from "./store.ts"

	const { activeMenu } = MenuStore
	$activeMenu = []

	function onMouseLeave() {
		// $activeMenu = []
	}

	function onResize () {
		$activeMenu = []
	}

	onMount(() => {
		window.addEventListener('resize', onResize);

		return () => {
			window.removeEventListener('resize', onResize);
		}
	})
</script>
<div class="navbar" on:mouseleave={onMouseLeave}>
	<div>
		<HeaderNavbarItem title="Home" href="/" />
	</div>
	<div>
		<HeaderNavbarItem title="Topic" tree="{['topic']}" lvl="{0}">
			<HeaderNavbarItem title="Travel" href="/topic/travel" tree="{['topic','aus']}" lvl="{1}">
				<HeaderNavbarItem title="Australia" href="/topic/travel/australia" />
			</HeaderNavbarItem>
		</HeaderNavbarItem>
	</div>
	<div>
		<HeaderNavbarItem title="Level 1" tree="{['1']}" lvl="{0}">
			<HeaderNavbarItem title="Level 1-1" />
			<HeaderNavbarItem title="Level 1-2" />
			<HeaderNavbarItem title="Level 1-3" />
			<HeaderNavbarItem title="Level 1-4" tree="{['1','2']}" lvl="{1}">
				<HeaderNavbarItem title="Level 1-4-1" />
				<HeaderNavbarItem title="Level 1-4-2" />
				<HeaderNavbarItem title="Level 1-4-3" />
			</HeaderNavbarItem>
			<HeaderNavbarItem title="Level 1-5" tree="{['1','3']}" lvl="{1}">
				<HeaderNavbarItem title="Level 1-5-1" />
				<HeaderNavbarItem title="Level 1-5-2" />
				<HeaderNavbarItem title="Level 1-5-3" />
				<HeaderNavbarItem title="Level 1-5-4" tree="{['1','3','44']}" lvl="{2}">
					<HeaderNavbarItem title="Level 1-5-4-1" />
					<HeaderNavbarItem title="Level 1-5-4-2" />
					<HeaderNavbarItem title="Level 1-5-4-3" />
				</HeaderNavbarItem>
			</HeaderNavbarItem>
		</HeaderNavbarItem>
	</div>
</div>
<style>
	.navbar{
        @apply flex flex-wrap flex-row justify-start items-center gap-x-2;
        @apply relative z-10 bg-white w-auto;
	}
</style>
