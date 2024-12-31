<script>
    import { getContext, onMount } from "svelte";
    import Lyrics from "$components/Lyrics.svelte";
    import { notesVisible } from "$stores/misc.js";
    const copy = getContext("copy");

    let clickedIndex = null; // Track the clicked index
    let pages = []; // Store the DOM elements of each page
    let originalPositions = [];

    // Function to get a random rotation for each page
    function getRandomRotate() {
        const increments = [-1, -0.75, -0.5, -0.25, 0, 0.25, 0.5, 0.75, 1];
        const randomIndex = Math.floor(Math.random() * increments.length);
        return increments[randomIndex];
    }

    function getRandomLeft() {
        const increments = [-52, -51, -50, -49, -48];
        const randomIndex = Math.floor(Math.random() * increments.length);
        return increments[randomIndex];
    }

    function setPages($notesVisible) {
            let cumulativeHeight = 0; // Initialize cumulative height
            let delay = $notesVisible ? 750 : 0;
            setTimeout(() => {
                pages.forEach((page, i) => {
                    const fullHeight = page.scrollHeight; // Includes content not visible due to clipping
                    const pageHeight = fullHeight; // Full height of the page

                    if ($notesVisible) {
                        // Calculate the top position with padding
                        const topPosition = cumulativeHeight;
                        console.log({topPosition})
                        originalPositions[i] = topPosition; // Store original positions in pixels

                        // Apply styles for open state
                        page.style.top = `${topPosition}px`; // Set the top position
                        page.style.height = "auto";
                        page.style.overflowY = "visible";

                        // Update cumulative height with padding for all pages except the first
                        cumulativeHeight += pageHeight + 32;
                    } else {
                        // Reset all pages to their original closed position
                        originalPositions[i] = 0; // Reset stored position to 0
                        page.style.top = `0px`; // Set top position to 0
                    }
                });
            }, delay);
    }

    onMount(() => {
        // Initialize positions for each page on mount

            pages.forEach((page, i) => {

                page.style.top = `${i*32}px`; // Set the initial top position
            });
    });

    $: setPages($notesVisible);
</script>

<section class="lyrics" class:notesVisible={$notesVisible}>
    <div class="page-wrapper" class:notesVisible={$notesVisible}>
        {#each copy.lyrics as page, i}
            <div 
                bind:this={pages[i]}
                class="page" 
                id="lyrics-page-{i}"
                style="transform: translate({getRandomLeft()}%, {i*32}px) rotate({getRandomRotate()}deg); transition-delay: {(copy.lyrics.length-i)*0.025}s;
                filter: {clickedIndex === null || clickedIndex === i ? 'none' : 'brightness(95%)'};"
            >
                <div class="page-inset">
                    <h5>{page.num} {page.songTitle}</h5>
                    {#each page.text as graf, i}
                        <p>{@html graf.value}</p>
                    {/each}
                </div>
                {#if i == copy.lyrics.length - 1}
                    <div class="padder"></div>
                {/if}
            </div>
        {/each}
    </div>
</section>

<style>
    section {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        z-index: 999;
        height: 100svh;
        overflow-y: auto;
        display: flex;
        flex-direction: column;
        align-items: center;
        transform: translateY(100%);
        transition: transform 500ms linear;
        font-family: var(--serif);
        color: #f1eeec;
        overflow: hidden;
        margin-top: 2rem;
        padding: 1rem;
    }

    section.notesVisible {
        transform: translateY(32px);
        overflow:auto;
    }
    .padder {
        height: 10rem;
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
        pointer-events: auto;
    }
    :global(strong) {
        display: inline-block;
    }
    .page {
        width: 100%;
        max-width: 660px;
        height: 100%;
        color: #151515;
        margin: 1rem auto;
        z-index: 1000;
        left: 50%;
        position: absolute;
        transform: translate(-50%, 0);
        transition: all 0.75s ease-in-out;
        pointer-events: auto;
    }

    .page.isOpen {
        position: absolute;
        height: auto;
    }

    .page-inset {
        width: 100%;
        padding: 1rem 2rem 2rem 2rem;
        background-color: #f1eeec;
        background-image: url("assets/images/bg_texture.png");
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
        margin: 0;
        font-size: 14px;
        font-family:'Courier New', Courier, monospace;
    }

    p.letter {
        font-family: var(--serif);
    }

    .bolded {
        font-family:'Courier New', Courier, monospace;
        line-height: 1;  
        font-weight: 700;
        text-transform: uppercase;
    }

    .intro p {
        font-family:'Courier New', Courier, monospace;
        line-height: 1;
        margin: 1rem 0;
        font-style: normal;
    }

    .intro {
        margin-bottom: 4rem;
    }

    .text p {
        margin: 1rem 0;
        font-style: normal;
    }

    :global(.right-align) {
        text-align: right;
        margin-left: auto;
    }

    @media(max-width: 750px) {
        .topper {
            flex-direction: column;
            padding-top: 1rem;
        }
        .topper p {
            margin: 0;
        }
    }

    @media(max-width: 600px) {
        .page-inset {
            padding: 0rem 1rem 2rem 1rem;
        }
        h5 {
            font-size: var(--16px);
        }
        p {
            font-size: var(--12px);
        }
    }
</style>