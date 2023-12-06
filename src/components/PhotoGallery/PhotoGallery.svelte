<script>
	import LoadMoreButton from "@components/LoadMoreButton/LoadMoreButton.svelte"
	import LightBox from "@components/PhotoGallery/LightBox.svelte"
	import Icon from "@iconify/svelte"

	export let images

	let lightBoxShow = false
	let lightBoxImageList = []
	let lightBoxCurrentTargetIdx = 0

	function lightbox(currentTargetIdx) {
		lightBoxShow = true
		lightBoxImageList = images
		lightBoxCurrentTargetIdx = currentTargetIdx
	}
</script>

<LightBox bind:lightBoxShow bind:lightBoxImageList bind:lightBoxCurrentTargetIdx client:load />
<div class="album pb-6">
	<div class="album--grid">
		{#each images.entries() as [idx, { attributes }]}
			<div class="album--item bg-gray-200 {idx < 6 ? "block" : "hidden"}">
			<picture class="cursor-pointer shadow" on:click={() => lightbox(idx)}>
				<source media="not all and (min-width: 768px)" srcset="{attributes.formats?.medium?.url || attributes.url}" />
				<img
					src="{attributes.formats?.large?.url || attributes.url}"
					decoding="async"
					loading="lazy"
				/>
			</picture>
			</div>
		{/each}
	</div>
</div>
<div class="flex flex-wrap justify-center items-center">
	{#if images.length > 6}
		<LoadMoreButton wrapper=".album" item=".album--item.hidden" offset="12" client:visible />
	{/if}
</div>

<style>
    .album--grid {
        display: grid;
        gap: 16px;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    }

    .album--item {
        aspect-ratio: 1/1;
        overflow: hidden;
        position: relative;
    }

    .album--item > picture > img {
        display: block;
        width: 100%;
        height: 100%;
        max-width: 100%;
        object-fit: cover;
    }

    @media not all and (min-width: 1280px) {
        .album--grid {
            grid-template-columns: repeat(auto-fill, minmax(25dvw, 1fr));
        }
    }

    @media not all and (min-width: 768px) {
        .album--grid {
            grid-template-columns: repeat(auto-fill, minmax(50dvw, 1fr));
        }

        .album--item {
            aspect-ratio: 3/2;
        }
    }
</style>
