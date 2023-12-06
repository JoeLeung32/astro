<script>
	import Icon from "@iconify/svelte"

	export let lightBoxShow
	export let lightBoxImageList
	export let lightBoxCurrentTargetIdx

	let dialog
	let imageObj

	$: if (dialog && lightBoxShow) {
		dialog.showModal()
		imageObj = lightBoxImageList[lightBoxCurrentTargetIdx]
	}

	function getDefaultImage(size = "large") {
		if (typeof imageObj === "undefined" || imageObj === null) return null
		const defaultImage = imageObj?.attributes.formats[size]
		if (typeof defaultImage === "undefined") return imageObj?.attributes
		console.log("~>", defaultImage)
		return defaultImage
	}

	function closeDialog() {
		dialog.close()
	}

	function onClosing() {
		lightBoxShow = false
		imageObj = null
	}

	function prevItem() {
		imageObj = undefined
		setTimeout(() => {
			lightBoxCurrentTargetIdx -= 1
			imageObj = lightBoxImageList[lightBoxCurrentTargetIdx]
		}, 1)
	}

	function nextItem() {
		imageObj = undefined
		setTimeout(() => {
			lightBoxCurrentTargetIdx += 1
			imageObj = lightBoxImageList[lightBoxCurrentTargetIdx]
		}, 1)
	}
</script>

<dialog
	class="container bg-transparent border-0 p-0 md:p-4"
	bind:this={dialog}
	on:close={onClosing}
	on:click|self={closeDialog}
>
	<div class="relative mx-auto w-fit h-fit" on:click|stopPropagation>
		<button class="z-30 absolute right-4 top-4 outline-none" autofocus on:click={closeDialog}>
			<Icon icon="mdi:close" class="text-3xl text-white" />
		</button>
		<div class="z-20 absolute left-0 top-1/4 h-1/2 flex felx-wrap items-center cursor-pointer"
			 class:hidden={lightBoxCurrentTargetIdx===0}
			 on:click|stopPropagation
			 on:click={prevItem}
		>
			<Icon icon="mdi:chevron-left" class="text-5xl text-white" />
		</div>
		<div class="z-20 absolute right-0 top-1/4 h-1/2 flex felx-wrap items-center cursor-pointer"
			 class:hidden={lightBoxCurrentTargetIdx===lightBoxImageList.length-1}
			 on:click|stopPropagation
			 on:click={nextItem}
		>
			<Icon icon="mdi:chevron-right" class="text-5xl text-white" />
		</div>
		<div class="z-0 bg-gray-900 shadow">
			{#if typeof imageObj !== "undefined" && imageObj !== null}
				<picture class="absolute z-0 left-0 top-0">
					<source media="not all and (min-width: 768px)"
							srcset="{getDefaultImage('medium').url}" />
					<source media="not all and (min-width: 1024px)"
							srcset="{getDefaultImage('large').url}" />
					<img src="{getDefaultImage('xlarge').url}" class="hidden" />
				</picture>
				<svg xmlns="http://www.w3.org/2000/svg"
					 class="w-full h-full"
					 width="{getDefaultImage('xlarge').width}px"
					 height="{getDefaultImage('xlarge').height}px"
				/>
			{/if}
		</div>
	</div>
</dialog>

<style>
    dialog {
    }

    dialog > div {
        min-width: 10px;
        min-height: 10px;
    }

    dialog > div > div > svg,
    dialog > div > div > picture > img {
        display: block;
        max-width: 100%;
        max-height: 90dvh;
        object-fit: contain;
    }

    dialog::backdrop {
        background: rgba(0, 0, 0, 0.9);
    }

    dialog[open] {
        animation: zoom 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
    }

    @keyframes zoom {
        from {
            transform: scale(0.95);
        }
        to {
            transform: scale(1);
        }
    }

    dialog[open]::backdrop {
        animation: fade 0.2s ease-out;
    }

    @keyframes fade {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
</style>
