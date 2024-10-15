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
        border-top: 1px solid #ffffff;
    }
    .albumNum {
        position: relative;
        top: 0.5rem;
        left: 0.5rem;
        color: #ffffff;
        font-family: "Carnaby Street";
        text-transform: uppercase;
        padding: 0;
        margin: 0;
        text-shadow: 1px 1px 4px black;
    }

    @media(max-width: 400px) {
       .album {
            font-size: 12px;
       }
    }
</style>