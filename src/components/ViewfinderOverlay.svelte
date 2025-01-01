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
        <button on:click={prevClick}><ChevronLeft color={"#01010f"} strokeWidth={3} fill={"none"} /></button>
        <div class="wheel">
            <img class="wheel-nums" style="transform: rotate({wheelRotation}deg)" src="assets/images/viewfinder-wheel.png" />
            <img src="assets/images/viewfinder-cover.png" />
        </div>
        <button on:click={nextClick}><ChevronRight color={"#01010f"} strokeWidth={1} /></button>
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
        transform: translateY(100%);
        transition: transform 500ms linear;
        font-family: var(--serif);
        color: var(--fang-light);
        overflow-x: hidden;
        pointer-events: none;
        padding-top: 8rem;
    }

    section.viewfinderVisible {
        transform: translateY(0);
        pointer-events: auto;
    }

    .controls {
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: center;
        margin: 0 0 1rem 0;
    }

    .controls button {
        margin-top: 1rem;
        height: 2.5rem;
        width: 2.5rem;
        background: var(--fang-light);
        border: none;
        z-index: 1000;
    }

    .controls button:first-of-type {
        margin-right: -5rem;
    }

    .controls button:last-of-type {
        margin-left: -5rem;
    }

    .controls button:hover {
        opacity: 0.8;
    }

    :global(.controls button svg path) {
        stroke-width: 2px;
        stroke: var(--fang-dark);
        fill: none;
    }

    .wheel {
        width: 300px;
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
        padding: 0 1rem;
        max-width: 1000px;
        margin: 0 auto;
        align-items: center;
        gap: 2rem;
    }

    .left, .right {
        width: 50%;
        aspect-ratio: 1/1.55;
        border-radius: 10px;
        overflow: hidden;
        position: relative;
        background: var(--fang-dark);
    }

    .vignette {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        box-shadow: 0 0 12px 12px var(--fang-dark) inset;
    }

    .left img, .right img {
        position: absolute;
        transition: top 0.75s ease, transform 0.75s ease, filter 0.75s ease;
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
        filter: blur(0.75px);
    }

    .right img.active {
        top: 0;
        right: 0;
        transform: rotate(0deg);
        filter: blur(0.75px);
    }

    .left img:not(.active) {
        top: -120%;
        left: 0;
        transform: rotate(-45deg);
        filter: blur(10px);
    }

    .right img:not(.active) {
        top: 120%;
        right: 0;
        transform: rotate(45deg);
        filter: blur(10px);

    }

    .grain {
        mix-blend-mode: multiply;
        opacity: 0.5;
    }

    @media(max-width: 750px) {
        .view {
            gap: 1rem;
        }
        .wheel {
            width: 250px;
        }

        .controls button {
            width: 2.5rem;
            height: 2.5rem;
        }
    }
</style>