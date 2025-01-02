<script>
    import Track from "$components/Track.svelte";
    export let data;

    const albumLength = data[1].length;
</script>

<div class="album" id="album-{data[0]}">
    <p class="albumNum">Album {data[0]}</p>
    {#each data[1] as track}
        <Track trackData={track}/>
    {/each}
</div>

<style>
    .album {
        border-top: 1px solid var(--fang-light);
    }
    .albumNum {
        position: relative;
        top: 0.5rem;
        left: 0.5rem;
        color: var(--fang-light);
        font-family:  var(--mono);
        font-weight: 700;
        font-size: 14px;
        text-transform: uppercase;
        padding: 0;
        margin: 0;
        text-shadow: 1px 1px 4px var(--fang-dark);
    }

    @media(max-width: 600px) {
        .albumNum {
            font-size: 12px;
        } 
    }
</style>