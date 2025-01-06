<script>
    import { getContext, onMount } from "svelte";
    import { currAboutSection } from "$stores/misc.js";
    const copy = getContext("copy");

    let clickedIndex = null; // Track the clicked index
    let pages = []; // Store the DOM elements of each page
    let originalPositions = [];
    let isExpanded = false;
    let width;

    export let isOpen;

    // Function to get a random rotation for each page
    function getRandomRotate() {
        const increments = width >= 720 ? [-1, -0.75, -0.5, -0.25, 0, 0.25, 0.5, 0.75, 1] : [-0.125, 0, 0.125];
        const randomIndex = Math.floor(Math.random() * increments.length);
        return increments[randomIndex];
    }

    function getRandomLeft() {
        const increments = [-52, -51, -50, -49, -48];
        const randomIndex = Math.floor(Math.random() * increments.length);
        return increments[randomIndex];
    }

    function setPages(isOpen) {
        let delay = isOpen ? 500 : 0;
        setTimeout(() => {
            pages.forEach((page, i) => {
                const topPosition = isOpen ? 5 * i * 16 : 0; // Calculate rem to px (1rem = 16px)
                originalPositions[i] = topPosition; // Store original positions in pixels
                page.style.top = `${topPosition}px`; // Set the initial top position
                page.style.height = isOpen ? "auto" : "100%";
                page.style.overflowY = isOpen ? "visible" : "hidden";
            });
        }, delay)
    }

    onMount(() => {
        // Initialize positions for each page on mount
        pages.forEach((page, i) => {
            const topPosition = isOpen ? 5 * i * 16 : 0; // Calculate rem to px (1rem = 16px)
            originalPositions[i] = topPosition; // Store original positions in pixels
            page.style.top = `${topPosition}px`; // Set the initial top position
            page.style.height = isOpen ? "auto" : "100%";
            page.style.overflowY = isOpen ? "visible" : "hidden";
        });
    });

    $: setPages(isOpen);
</script>

<svelte:window bind:innerWidth={width}/>

<div class="page-wrapper" class:isOpen={isOpen}>
    {#each copy.lyrics as song, i}
        <div 
            bind:this={pages[i]}
            class="page" 
            id="lyrics-page-{i}"
            style="transform: translate({getRandomLeft()}%, 0) rotate({getRandomRotate()}deg);
            filter: {clickedIndex === null || clickedIndex === i ? 'none' : 'brightness(95%)'};"
        >
            {#if i == 17}
            <div class="page-inset">
                <h5>{song.num} {song.songTitle}</h5>
                {#each song.text as graf, i}
                    <p>{@html graf.value}</p>
                {/each}
            </div>
            <div class="padder"></div>
            {:else}
                <h5>{song.num} {song.songTitle}</h5>
                {#each song.text as graf, i}
                    <p>{@html graf.value}</p>
                {/each}
            {/if}
        </div>
    {/each}
</div>

<style>
    .padder {
        height: 20rem;
        width: 100%;
    }
    .page-wrapper {
        width: 100%;
        height: 100%;
        max-width: 680px;
        display: flex;
        flex-direction: column;
        align-items: center;
        position: relative;
        overflow-y: hidden;
    }
    .page-wrapper.isOpen {
        overflow-y: scroll;
    }
    .page {
        width: 100%;
        max-width: 660px;
        background-color: var(--fang-light);
        color: #151515;
        padding: 1rem 2rem 3rem 2rem;
        margin: 1rem auto;
        background-image: url("/assets/images/bg_texture.png");
        background-size: 200px;
        background-repeat: repeat;
        border: 1px solid #dfd9d5;
        box-shadow: 0 -1px 1px rgba(0,0,0,0.15);
        z-index: 1000;
        left: 50%;
        position: absolute;
        transform: translate(-50%, 0);
        transition: top 0.5s ease-in-out, transform 0.5s ease-in-out, filter 0.3s ease;
        cursor: pointer;
    }

    #lyrics-page-17 {
        background-color: transparent;
        border: none;
        padding: 0;
    }

    .page-inset {
        width: 100%;
        padding: 1rem 2rem 3rem 2rem;
        background-color: var(--fang-light);
        background-image: url("/assets/images/bg_texture.png");
        background-size: 200px;
        background-repeat: repeat;
        border: 1px solid #dfd9d5;
        box-shadow: 0 -1px 1px rgba(0,0,0,0.15);
    }

    h5 {
        font-family: var(--serif);
        font-weight: 700;
    }

    p {
        display: flex;
        margin: 0;
        font-family: var(--serif) !important;
    }

    :global(.right-align) {
        text-align: right;
        margin-left: auto;
    }
    @media(max-width: 600px) {
        .page, .page-inset {
            padding: 1rem 1rem 3rem 1rem;
        }
        h5 {
            font-size: var(--16px);
        }
        p {
            font-size: var(--14px);
        }
    }
</style>

