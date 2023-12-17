<script>
	import Icon from "@iconify/svelte"

	import MenuStore from "./store.ts"

	const { activeMenu } = MenuStore

	export let title
	export let href
	export let tree
	export let lvl = 0

	function triggerTabletMenu() {
		const treeId = this.dataset.treeId
		switch (true) {
			case (
				$activeMenu[lvl] === tree[lvl] &&
				$activeMenu.length > tree.length
			): {
				$activeMenu.splice(lvl, $activeMenu.length - 1)
				break
			}
			case $activeMenu.length > tree.length: {
				$activeMenu = tree
				break
			}
			case $activeMenu[lvl] === tree[lvl]: {
				delete $activeMenu[lvl]
				break
			}
			default: {
				$activeMenu[lvl] = treeId
				break
			}
		}
		$activeMenu = $activeMenu.filter(a => a === a)
	}
</script>
{#if title && tree}
	<span class="item item-dropdown"
		  data-tree-id="{tree[lvl]}"
		  on:click|stopPropagation={triggerTabletMenu}
		  class:bg-gray-100="{$activeMenu[lvl] === tree[lvl]}"
	>
		{#if href}
			<a href="{href}">
				{title}
			</a>
		{:else}
			<span>
				{title}
			</span>
		{/if}
		<span class="item-dropdown-icon" class:active="{$activeMenu[lvl] === tree[lvl]}">
			<Icon icon="mdi:chevron-down" />
		</span>
	</span>
	<div class="sublist" class:active="{$activeMenu[lvl] === tree[lvl]}">
		<div class:sublist-box={tree && tree.length === 1}>
			<slot />
		</div>
	</div>
{:else if title && href}
	<span class="item item-single">
		<a href="{href}">
			{title}
		</a>
	</span>
{:else}
	<span class="item item-single">
		<span>
			{title}
		</span>
	</span>
{/if}
<style>
	.item {
        @apply grid grid-cols-2 items-center cursor-pointer;
        @apply overflow-hidden w-auto;
        @apply font-medium leading-none;
        grid-template-columns: 1fr auto;

        > a,
        > span {
            @apply text-base px-4 py-2 grow;
        }

		&-single {
            > a,
            > span {
            }
		}

		&-dropdown {
            > a,
            > span {
                @apply pr-0;
				+ span {
                    @apply text-base px-2 py-3 transition-all;

                    &.active {
                        @apply animate-bounce ;
                    }
				}
            }
		}

        &:hover {
            @apply overflow-hidden bg-gray-50;
        }
	}

	.sublist {
        @apply hidden transition-all ease-in-out;
		@apply relative top-0;

		> div {
            @apply hidden grid-cols-1 gap-y-2;
            grid-template-columns: minmax(230px, 1fr);
		}

        &-box {
            @apply bg-white border rounded-xl shadow-lg p-2;
            @apply absolute;
            left: 50%;
            transform: translateX(-50%);
        }

        &.active {
            @apply block;

            > div {
                @apply grid;
            }
        }
    }
</style>
