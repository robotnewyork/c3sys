<script lang="ts">
	
    import c3sys from '$lib/data/c3sys.json';

	
</script>

<div class="gear">
	
    <h2>Gear</h2>
    {#each c3sys.gear as { manufacturer, model }, index}
        <div>
            <div>{manufacturer}</div>
            <div>{model}</div>
            
        </div>
    {/each}

	
</div>

<style>
	
</style>
