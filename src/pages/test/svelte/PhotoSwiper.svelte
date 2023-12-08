<script>
	import { onMount } from "svelte"
	import PhotoSwipeLightbox from "photoswipe/lightbox"
	import "photoswipe/style.css"

	export let objName
	export let images

	onMount(() => {
		let lightbox = new PhotoSwipeLightbox({
			gallery: "." + objName,
			children: "a",
			showHideAnimationType: "zoom",
			pswpModule: () => import("photoswipe")
		})
		lightbox.init()
	})
</script>

<div class={`pswp-gallery ${objName}`}>
	{#each images as image}
		<a
			href={image.src}
			data-pswp-width={image.width}
			data-pswp-height={image.height}
			target="_blank"
			rel="noreferrer"
		>
			<picture>
				{#if image.srcset}
					{#each image.srcset as srcset}
						<source
							media={srcset.media}
							srcset={srcset.src}
						/>
					{/each}
				{/if}
				<img src={image.src} />
			</picture>
		</a>
	{/each}
</div>
