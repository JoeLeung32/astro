<script>
	import Icon from "@iconify/svelte"

	export let internalUrl

	function linkableUrlOnclick() {
		const url = this.dataset.url.replace("//", "/")
		if (window) window.location.href = url
	}
</script>

<div
	class="linkableCard"
	data-url={internalUrl}
	on:click={linkableUrlOnclick}
>
	{#if $$slots.thumbnail}
		<div class="linkableCard-thumbnail">
			<div class="linkableCard-thumbnail-loading">
				<Icon icon="mdi:loading" class="text-3xl animate-spin" />
			</div>
			<svg />
			<div class="linkableCard-thumbnail-picture">
				<slot name="thumbnail" />
			</div>
		</div>
	{/if}
	{#if $$slots.title}
		<div class="linkableCard-title">
			<slot name="title" />
		</div>
	{/if}
</div>

<style>
    .linkableCard {
        @apply flex flex-wrap justify-center items-start;
        @apply rounded-xl shadow-md;
        @apply leading-normal cursor-pointer;
        @apply relative;

        &-title {
            @apply font-bold text-xl text-center p-2;
        }

        &-thumbnail {
            @apply rounded-xl rounded-b-none;
            @apply relative overflow-hidden;
            @apply bg-gray-100 min-w-full shadow-inner;
            aspect-ratio: 16/9;

            &-loading {
                @apply flex flex-nowrap justify-center items-center;
                @apply absolute top-0 left-0 z-0;
                @apply w-full h-full;

                + svg {
                    @apply block w-full h-full max-w-full max-h-full;
                    @apply object-cover;
                }
            }

            &-picture {
                @apply absolute left-0 top-0 w-full h-full;

                & :global(img),
                & :global(picture),
                & :global(picture > img) {
                    @apply block w-full h-full max-w-full max-h-full;
                    @apply object-cover;
				}
            }
        }
    }
</style>
