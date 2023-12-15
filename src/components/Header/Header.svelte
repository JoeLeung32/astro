<script>
	import Icon from "@iconify/svelte"
	import { onMount } from 'svelte'
	import HeaderNavbar from "./HeaderNavbar.svelte"
	import HeaderNavbarItem from "./HeaderNavbarItem.svelte"

	import MenuStore from "./store.ts"

	const { activeMenu } = MenuStore
	let menuMobileOn = 0;

	function triggerMobileMenu() {
		menuMobileOn = menuMobileOn ? 0 : 1
	}

	function onMouseLeave () {
		menuMobileOn = 0
		$activeMenu = []
	}

	function onResize () {
		menuMobileOn = 0
		$activeMenu = []
	}

	onMount(() => {
		window.addEventListener('resize', onResize);

		return () => {
			window.removeEventListener('resize', onResize);
		}
	})
</script>
<header>
	<nav>
		<div>
			<div class="p-2">
				<a href="/">
					<Icon icon="mdi:sprout" class="text-3xl" />
				</a>
			</div>
		</div>
		<div class="block md:hidden">
			<div on:click|stopPropagation={triggerMobileMenu} class="p-2 cursor-pointer">
				<Icon icon="mdi:menu" class="text-2xl" />
			</div>
			<div class="mobileMenu" class:active="{menuMobileOn}" on:mouseleave={onMouseLeave}>
				<HeaderNavbarItem title="Home" href="/" />
				<HeaderNavbarItem title="Topic" tree="{['topic']}" lvl="{0}">
					<HeaderNavbarItem title="Travel" href="/topic/travel" tree="{['topic','aus']}" lvl="{1}">
						<HeaderNavbarItem title="Australia" href="/topic/travel/australia" />
					</HeaderNavbarItem>
				</HeaderNavbarItem>
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
		<div class="hidden md:block">
			<HeaderNavbar />
		</div>
		<div class="hidden md:block">3</div>
	</nav>
</header>
<style>
	header {
		@apply font-baloo bg-white shadow select-none;
		@apply relative z-50;

        nav {
            @apply container mx-auto px-2;
            @apply flex flex-wrap justify-between items-center;
        }

		.mobileMenu {
			@apply hidden w-2/3 max-w-full p-2;
			@apply bg-white border rounded-xl shadow-md;
			@apply absolute right-1;

			&.active {
				@apply grid grid-cols-1;
			}
		}
	}
</style>
