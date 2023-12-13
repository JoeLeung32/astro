<script>
	import Icon from "@iconify/svelte"

	export let element
	export let images

	import LoadMoreButton from "@components/LoadMoreButton/LoadMoreButton.svelte"
	import { onMount } from "svelte"
	import PhotoSwipeLightbox from "photoswipe/lightbox"
	import "photoswipe/style.css"

	const preloadItems = 6;

	onMount(() => {
		let lightbox = new PhotoSwipeLightbox({
			gallery: "." + element,
			children: "a",
			showHideAnimationType: "zoom",
			pswpModule: () => import("photoswipe")
		})
		lightbox.init()
	})
</script>

<div class={`pswp-gallery ${element}`}>
	{#each images.entries() as [idx, { attributes: data }]}
		<a
			href={data.formats?.xlarge?.url || data.url}
			data-pswp-width={data.formats?.xlarge?.width || data.width}
			data-pswp-height={data.formats?.xlarge?.height || data.height}
			target="_blank"
			rel="noreferrer"
			class={`${element}-item ${idx < preloadItems ? "block" : "hidden"}`}
		>
			<div class="pswp-gallery-loading">
				<Icon icon="mdi:loading" class="text-3xl text-gray-500 animate-spin" />
			</div>
			<picture>
				{#if data.formats?.medium}
					<source
						media="not all and (min-width: 768px)"
						srcset={data.formats?.medium?.url}
					/>
				{/if}
				{#if data.formats?.large}
					<source
						media="not all and (min-width: 1280px)"
						srcset={data.formats?.large?.url}
					/>
				{/if}
				{#if data.formats?.xlarge}
					<source
						media="not all and (min-width: 1536px)"
						srcset={data.formats?.xlarge?.url}
					/>
				{/if}
				<img src={data.formats?.large?.url || data.url}
					 decoding="async"
					 loading="lazy"
				/>
			</picture>
		</a>
	{/each}
</div>
<div class="flex flex-wrap justify-center items-center my-4 ff-baloo">
	{#if images.length > preloadItems}
		<LoadMoreButton wrapper={`.${element}`} item={`.${element}-item.hidden`} offset={preloadItems * 2} client:visible />
	{/if}
</div>

<style>
	.pswp-gallery {
		@apply grid gap-4;
        grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));

        @media screen(md) {
            grid-template-columns: repeat(auto-fill, minmax(225px, 1fr));
        }

        @media screen(lg) {
            grid-template-columns: repeat(auto-fill, minmax(225px, 1fr));
        }

        @media screen(xl) {
            grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
        }

        @media screen(2xl) {
            grid-template-columns: repeat(auto-fill, minmax(225px, 1fr));
        }

        &-loading {
            @apply flex flex-nowrap justify-center items-center;
            @apply absolute top-0 left-0 z-0;
            @apply w-full h-full;

            + svg {
                @apply block w-full h-full max-w-full max-h-full;
                @apply object-cover;
            }
        }

		> a {
			@apply relative overflow-hidden;
            @apply rounded-lg shadow-md;
			@apply bg-gray-100;
            aspect-ratio: 1/1;

			> picture {
				@apply relative z-10;

                > img {
                    @apply block w-full h-full max-w-full;
                    @apply object-cover;
                }
			}
		}
	}
</style>
