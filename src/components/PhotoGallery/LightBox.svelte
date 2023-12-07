<script>
	import Icon from "@iconify/svelte"

	export let lightBoxShow
	export let lightBoxImageList
	export let lightBoxCurrentTargetIdx

	let dialog
	let imageObj

	$: if (dialog && lightBoxShow) {
		window.document.body.classList.add("overflow-hidden")
		dialog.classList.add("flex")
		dialog.classList.remove("hidden")
		imageObj = lightBoxImageList[lightBoxCurrentTargetIdx]
	}

	function getDefaultImage(size = "large") {
		if (typeof imageObj === "undefined" || imageObj === null) return null
		const defaultImage = imageObj?.attributes.formats[size]
		if (typeof defaultImage === "undefined") return imageObj?.attributes
		return defaultImage
	}

	function closeDialog() {
		window.document.body.classList.remove("overflow-hidden")
		dialog.classList.add("hidden")
		dialog.classList.remove("show")
		resizeLightbox()
	}

	function resizeLightbox() {
		lightBoxShow = false
		imageObj = null
	}

	function goToItem(index) {
		imageObj = undefined
		setTimeout(() => {
			lightBoxCurrentTargetIdx += index
			imageObj = lightBoxImageList[lightBoxCurrentTargetIdx]
		}, 1)
	}
</script>

<div
	class="lightbox hidden flexMiddleCenter fixed left-0 top-0 z-10 bg-black/90 w-screen h-screen overflow-hidden"
	bind:this={dialog}
	on:click|self={closeDialog}
>
	<div class="container flex flexMiddleCenter m-4 relative w-fit h-fit" on:click|stopPropagation>
		<button class="z-30 absolute right-1 top-1 md:right-4 md:top-4 outline-none" autofocus on:click={closeDialog}>
			<Icon icon="mdi:close" class="text-3xl text-white" />
		</button>
		<div class="flex flexMiddleCenter h-2/3 cursor-pointer absolute left-0 top-1/5 z-20"
			 class:hidden={lightBoxCurrentTargetIdx===0}
			 on:click|stopPropagation
			 on:click={() => goToItem(-1)}
		>
			<Icon icon="mdi:chevron-left" class="text-5xl text-white" />
		</div>
		<div class="flex flexMiddleCenter h-2/3 cursor-pointer absolute right-0 top-1/5 z-20"
			 class:hidden={lightBoxCurrentTargetIdx+1===lightBoxImageList.length}
			 on:click|stopPropagation
			 on:click={() => goToItem(+1)}
		>
			<Icon icon="mdi:chevron-right" class="text-5xl text-white" />
		</div>
		<div class="z-0 bg-gray-900 shadow">
			<div class="flex flexMiddleCenter absolute left-0 top-0 z-0 w-full h-full">
				<Icon icon="mdi:loading" class="text-3xl text-white animate-spin" />
			</div>
			{#if typeof imageObj !== "undefined" && imageObj !== null}
				<figure class="flex flexMiddleCenter absolute left-0 top-0 z-10 w-full h-full">
					<picture>
						<source media="not all and (min-width: 768px)"
								srcset="{getDefaultImage('medium').url}" />
						<source media="not all and (min-width: 1024px)"
								srcset="{getDefaultImage('large').url}" />
						<img src="{getDefaultImage('xlarge').url}" class="w-full h-full" />
					</picture>
					<figcaption
						class="bg-black/50 text-white font-mono flex flex-wrap justify-between items-center absolute bottom-0 left-0 w-full text-center text-xs px-2 py-1 line-clamp-1">
						<span>{imageObj?.attributes.name}</span>
						<span>{lightBoxCurrentTargetIdx + 1}/{lightBoxImageList.length}</span>
					</figcaption>
				</figure>
				<svg xmlns="http://www.w3.org/2000/svg"
					 class="w-full h-full"
					 width="{getDefaultImage('xlarge').width}px"
					 height="{getDefaultImage('xlarge').height}px"
				/>
			{/if}
		</div>
	</div>
</div>

<style>
    .lightbox.flexMiddleCenter,
    .lightbox .flexMiddleCenter {
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
    }

    .lightbox > div {
        min-width: 10px;
        min-height: 10px;
    }

    .lightbox > div > div > svg,
    .lightbox > div > div > picture > img {
        display: block;
        max-width: 100%;
        max-height: 90dvh;
        object-fit: contain;
    }

    @keyframes zoom {
        from {
            transform: scale(0.95);
        }
        to {
            transform: scale(1);
        }
    }
</style>
