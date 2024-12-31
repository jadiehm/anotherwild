<script>
    import { getContext, onMount } from "svelte";
    import ChevronLeft from "lucide-svelte/icons/chevron-left";
	import ChevronRight from "lucide-svelte/icons/chevron-right";

    import { viewfinderVisible } from "$stores/misc.js";

    const copy = getContext("copy");

    const postcards = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 17];

    let activePostcard = 0;
    let wheelRotation = 0;

    function prevClick() {
        activePostcard--;
        wheelRotation = wheelRotation + 20;
    }

    function nextClick() {
        activePostcard++;
        wheelRotation = wheelRotation - 20;
    }
</script>


<section class="viewfinder" class:viewfinderVisible={$viewfinderVisible}>
    <div class="controls">
        <button on:click={prevClick}><ChevronLeft color={"black"} strokeWidth={3} fill={"none"} /></button>
        <div class="wheel">
            <img class="wheel-nums" style="transform: rotate({wheelRotation}deg)" src="assets/images/viewfinder-wheel.png" />
            <img src="assets/images/viewfinder-cover.png" />
        </div>
        <button on:click={nextClick}><ChevronRight color={"black"} strokeWidth={1} /></button>
    </div>
    <div class="view">
        <div class="left">
            {#each postcards as postcard, i}
                <img class:active={activePostcard == i} src="assets/images/postcards/postcard{postcard+1}.png" />
            {/each}
            <div class="vignette"></div>
        </div>
        <div class="right">
            {#each postcards as postcard, i}
                <img class:active={activePostcard == i} src="assets/images/postcards/postcard{postcard+1}.png" />
            {/each}
            <div class="vignette"></div>
        </div>
    </div>
</section>

<style>
    section {
        position: fixed;
        width: 100%;
        top: 0;
        left: 0;
        z-index: 999;
        height: 100svh;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        transform: translateY(100%);
        transition: transform 500ms linear;
        font-family: var(--serif);
        color: #f1eeec;
        overflow-x: hidden;
        cursor: pointer;
        pointer-events: none;
    }

    section.viewfinderVisible {
        transform: translateY(0);
        pointer-events: auto;
    }

    .controls {
        position: absolute;
        top: 2rem;
        left: 50%;
        transform: translate(-50%, 0);
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        margin-top: 2rem;
    }

    .controls button {
        margin-top: 2.5rem;
    }

    :global(.controls button svg path) {
        stroke-width: 3px;
        stroke: black;
        fill: none;
    }

    .wheel {
        width: 200px;
        position: relative;
    }

    .wheel-nums {
        transition: transform 1s ease;
    }

    .wheel img {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
    }

    .view {
        display: flex;
        flex-direction: row;
        width: 100%;
        padding: 0 4rem;
        max-width: 1000px;
        margin: 0 auto;
        height: 100svh;
        align-items: center;
        gap: 2rem;
    }

    .left, .right {
        width: 50%;
        aspect-ratio: 1/1.55;
        border-radius: 10px;
        overflow: hidden;
        position: relative;
        filter: blur(0.75px);
        background: black;
    }

    .vignette {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        box-shadow: 0 0 8px 8px black inset;
    }

    .left img, .right img {
        position: absolute;
        transition: top 0.5s ease, transform 0.5s ease;
        height: 100%;
        width: auto;
        object-fit: cover;
    }

    .left img {
        object-position: top left;
    }

    .right img {
        object-position: top right;
    }

    .left img.active {
        top: 0;
        left: 0;
        transform: rotate(0deg);
    }

    .right img.active {
        top: 0;
        right: 0;
        transform: rotate(0deg);
    }

    .left img:not(.active) {
        top: -120%;
        left: 0;
        transform: rotate(-45deg);
    }

    .right img:not(.active) {
        top: 120%;
        right: 0;
        transform: rotate(45deg);
    }

    .grain {
        mix-blend-mode: multiply;
        opacity: 0.5;
    }
</style>