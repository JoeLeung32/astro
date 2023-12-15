<script>
	import Icon from "@iconify/svelte"
	import { onMount } from 'svelte'

	let menuMobileOn = 0;
	let menuTabletOn = 0;

	function triggerMobileMenu() {
		menuMobileOn = menuMobileOn ? 0 : 1
	}

	function triggerTabletMenu(pin = 0) {
		menuTabletOn = pin
	}

	function onMouseLeave() {
		menuMobileOn = 0
		menuTabletOn = 0
	}

	function onResize () {
		menuMobileOn = 0
		menuTabletOn = 0
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
			<div on:click|stopPropagation={triggerMobileMenu} class="p-2">
				<Icon icon="mdi:menu" class="text-2xl" />
			</div>
		</div>
		<div class="hidden md:block">
			<div class="navMenu">
				<div>
					<a class="navMenu-item" href="/">
						Home
					</a>
				</div>
				<div>
					<span class="navMenu-item" on:click|stopPropagation={() => triggerTabletMenu(1)}>
						Topic
						<span class="navMenu-item-icon">
							<Icon icon="mdi:chevron-down" />
						</span>
					</span>
					<div class="navMenu-item-childMenu" class:active="{[1, 4].includes(menuTabletOn)}">
						<div class="navMenu-item-childMenu-box">
							<div class="navMenu-item-childMenu-rootList">
								<span class="navMenu-item" on:click|stopPropagation={() => triggerTabletMenu(4)}>
									<a href="/topic/travel">
										Travel
									</a>
									<span class="navMenu-item-icon">
										<Icon icon="mdi:chevron-down" />
									</span>
								</span>
								<div class="navMenu-item-childMenu" class:active="{[4].includes(menuTabletOn)}">
									<div class="navMenu-item-childMenu-subList">
										<span class="navMenu-item">
											<a href="/topic/travel/Australia">
												Australia
											</a>
										</span>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div>
					<span class="navMenu-item" on:click|stopPropagation={() => triggerTabletMenu(2)}>
						Dummy
						<span class="navMenu-item-icon">
							<Icon icon="mdi:chevron-down" />
						</span>
					</span>
					<div class="navMenu-item-childMenu" class:active="{[2, 5].includes(menuTabletOn)}">
						<div class="navMenu-item-childMenu-box">
							<div class="navMenu-item-childMenu-rootList">
								<span class="navMenu-item">
									Dummy 1
								</span>
								<span class="navMenu-item">
									Dummy 2
								</span>
								<span class="navMenu-item" on:click|stopPropagation={() => triggerTabletMenu(5)}>
									Dummy 3
									<span class="navMenu-item-icon">
										<Icon icon="mdi:chevron-down" />
									</span>
								</span>
								<div class="navMenu-item-childMenu" class:active="{[5].includes(menuTabletOn)}">
									<div class="navMenu-item-childMenu-subList">
										<span class="navMenu-item">
											Dummy 3-1
										</span>
										<span class="navMenu-item">
											Dummy 3-2
										</span>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div>
					<span class="navMenu-item" on:click|stopPropagation={() => triggerTabletMenu(3)}>
						Dummy
						<span class="navMenu-item-icon">
							<Icon icon="mdi:chevron-down" />
						</span>
					</span>
					<div class="navMenu-item-childMenu" class:active="{[3].includes(menuTabletOn)}">
						<div class="navMenu-item-childMenu-box">
							<div class="navMenu-item-childMenu-rootList">
								<span class="navMenu-item">
									Dummy 1
								</span>
								<span class="navMenu-item">
									Dummy 2
								</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="hidden md:block">3</div>
	</nav>
	<div class="text-center">
		{menuMobileOn}, {menuTabletOn}
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
            @apply flex flex-wrap justify-start items-center gap-x-4 bg-white z-10;
            @apply hidden md:flex;
            @apply absolute right-0 md:relative;
            @apply flex-col md:flex-row;
            @apply w-2/3 md:w-auto;
            @apply shadow-md md:shadow-none;

            &-item {
                @apply flex flex-wrap justify-between items-center cursor-pointer;
                @apply rounded-lg w-full md:w-auto;
                @apply p-4 md:p-2;

                &:hover {
                    @apply bg-gray-50 shadow-md;
                }

				> a {
					@apply grow;
				}

				&-icon {
                    @apply text-xl;
				}

				&-childMenu {
					@apply hidden relative;

                    &.active {
                        @apply block;
                    }

					&-box {
                        @apply bg-white border rounded-xl shadow-lg p-2;
                        @apply absolute;
                        left: 50%;
                        transform: translateX(-50%);

                        @apply grid grid-cols-1 gap-1;
                        grid-template-columns: minmax(230px, 1fr);
					}

					&-rootList {

					}

                    &-subList {

                    }
				}
            }
        }
	}
</style>
