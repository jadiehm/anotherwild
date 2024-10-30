<script>
    import { getContext, onMount } from "svelte";
    const copy = getContext("copy");
</script>

<div class="page-wrapper">
    {#each copy.lyrics as song, i}
        <div class="page" style="top: {5 * i}rem">
            <h5>{song.num} {song.songTitle}</h5>
            {#each song.text as graf, i}
                <p>{graf.value}</p>
            {/each}
        </div>
    {/each}
</div>

<style>
    .page-wrapper {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        position: relative;
    }
    .page {
        width: 100%;
        max-width: 660px;
        background-color: #f1eeec;
        color: #151515;
        padding: 2rem;
        margin: 1rem auto;
        background-image: url("assets/images/bg_texture.png");
        background-size: 200px;
        background-repeat: repeat;
        border: 1px solid #dfd9d5;
        box-shadow: 0 -1px 1px rgba(0,0,0,0.15);
        z-index: 1000;
        position: absolute;
        left: 50%;
        transform: translate(-50%, 0);
        transition: transform 0.5s;
        cursor: pointer;
    }

    .page:hover {
        transform: translate(-50%, -10px)
    }

    h5 {
        font-family: var(--serif);
        font-weight: 700;
    }
</style>

