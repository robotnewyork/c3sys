<script lang="ts">
	
    import c3sys from '$lib/data/c3sys.json';

	
</script>

<div class="releases">
	
    <h2>Releases</h2>
    {#each c3sys.releases as { catalogNumber, artistName, releaseName, releaseDate }, index}
        <div>
            <div>{catalogNumber}</div>
            <div>{artistName}</div>
            <div>{releaseName}</div>
            <div>{releaseDate}</div>
        </div>
    {/each}

	
</div>

<style>
	
</style>
