<script lang="ts">
	
    import c3sys from '$lib/data/c3sys.json';

	
</script>

<div class="artists">
	

    {#each c3sys.artists as { artistName }, index}
        <article aria-posinset={index + 1} aria-setsize={c3sys.artists.length} class="person">
            <h2>{artistName}</h2>
        </article>
    {/each}

	
</div>

<style>
	
</style>
