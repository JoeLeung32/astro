<script>
	import Icon from "@iconify/svelte"
	import { onMount } from 'svelte'

	let menuSelected = "";

	function onClick() {
		const type = this.dataset.type || null
		menuSelected = type
	}

	function onMouseLeave() {
		menuSelected = ""
	}

	function onResize () {
		menuSelected = ""
	}

	onMount(() => {
		window.addEventListener('resize', onResize);

		return () => {
			window.removeEventListener('resize', onResize);
		}
	});
</script>
<header on:mouseleave={onMouseLeave}>
	<nav>
		<div>
			<div class="p-2">
				<Icon icon="mdi:sprout" class="text-3xl" />
			</div>
		</div>
		<div class="block md:hidden">
			<div on:click|stopPropagation={onClick} data-type="mobileMenu" class="p-2">
				<Icon icon="mdi:menu" class="text-2xl" />
			</div>
		</div>
		<div class="hidden md:block">
			<div class="navMenu">
				<a href="/" class="navMenu-item">
					Home
				</a>
				<span on:click|stopPropagation={onClick} class="navMenu-item">
					Topic
					<Icon icon="mdi:chevron-down" class="text-lg" />
				</span>
			</div>
		</div>
		<div class="hidden md:block">3</div>
	</nav>
	<div class="text-center">
		{menuSelected}
	</div>
</header>
<style>
	header {
		@apply font-baloo bg-white shadow select-none;
		@apply relative z-50;
		grid-area: hd-bf;

        nav {
            @apply container mx-auto;
            @apply flex flex-wrap justify-between items-center;
            @apply px-2;
        }

        .navMenu {
            @apply flex flex-wrap justify-start items-center gap-x-4 bg-white relative z-10;
            @apply hidden md:flex;
            @apply absolute right-0 md:relative;
            @apply flex-col md:flex-row;
            @apply w-2/3 md:w-auto;
            @apply shadow-md md:shadow-none;

            &-item {
                @apply flex flex-wrap justify-between items-center;
                @apply w-full md:w-auto;
                @apply p-4 md:p-2;
            }
        }
	}
</style>
