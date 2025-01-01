<script>
    import { getContext, onMount } from "svelte";
    import Folder from "$components/Folder.svelte";
    import Tap from "$components/helpers/Tap.svelte";

    import { folderVisible } from "$stores/misc.js";

    const copy = getContext("copy");

    const lettersLen = copy.letters.length;

    let activeFolder = 0;
    let horizTransform = 0;

    function handleTap(dir) {
        if (dir.detail === "left" && activeFolder > 0) {
            activeFolder--;
        } else if (dir.detail === "right" && activeFolder < lettersLen - 1) {
            activeFolder++;
        }
        horizTransform = `${-activeFolder*90}vw`
    }
</script>

{#if $folderVisible}
    <Tap showArrows={true} on:tap={handleTap} activeFolder={activeFolder} lettersLen={lettersLen}/>
{/if}
<section class="dispatches" class:folderVisible={$folderVisible} style="width: {100*lettersLen}%; transform: translate({horizTransform},{$folderVisible ? "0px" : "100%"})">
    {#each copy.letters as letter, i}
        <div id="contents-{i}" class="contents">
            <Folder folderType={"letter"} folderIndex={i} activeFolder={activeFolder} />
        </div>
    {/each}
</section>

<style>
    section {
        position: fixed;
        top: 0;
        left: 0;
        z-index: 999;
        height: 100svh;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-start;
        transition: transform 500ms linear;
        font-family: var(--serif);
        color: var(--fang-light);
        overflow-x: hidden;
        pointer-events: none;
    }

    section.folderVisible {
        pointer-events: auto;
    }

    .contents {
        height: 100%;
        width: 90vw; /* Ensure each content block has a consistent width */
        display: flex;
        align-items: center;
        flex-shrink: 0;
        justify-content: center;
        flex-direction: column;
        pointer-events: none;
        transition: filter 0.25s linear;
        padding: 0 0 0 1rem;
    }
</style>