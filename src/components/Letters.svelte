<script>
    import { getContext, onMount } from "svelte";
    import { currAboutSection } from "$stores/misc.js";
    const copy = getContext("copy");

    let clickedIndex = null; // Track the clicked index
    let pages = []; // Store the DOM elements of each page
    let originalPositions = [];
    let isExpanded = false;

    export let isOpen;
    export let folderIndex;

    let letterCopy = copy.letters[folderIndex];

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

    function setPages(isOpen) {
            let cumulativeHeight = 0; // Initialize cumulative height
            let delay = isOpen ? 250 : 0;
            setTimeout(() => {
                pages.forEach((page, i) => {
                    const fullHeight = page.scrollHeight; // Includes content not visible due to clipping
                    const pageHeight = fullHeight; // Full height of the page

                    if (isOpen) {
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

                page.style.top = `0px`; // Set the initial top position
            });
    });

    $: setPages(isOpen);
</script>

<div class="page-wrapper" class:isOpen={isOpen}>
    {#each letterCopy.pages as page, i}
        <div 
            bind:this={pages[i]}
            class="page" 
            id="letter-page-{i}"
            style="transform: translate({getRandomLeft()}%, 0) rotate({getRandomRotate()}deg);
            filter: {clickedIndex === null || clickedIndex === i ? 'none' : 'brightness(95%)'};"
        >
            <div class="page-inset">
                {#if folderIndex == 2}
                    <div class="topper">
                            <p>The Forest Park Wildlife Cooridor</p>
                            <p>Multimodal Visual Debrief <strong>PG{i+1}</strong></p>
                    </div>
                {:else}
                    <div class="topper right-align">
                        <p><strong>PG{i+1}</strong></p>
                    </div>
                {/if}
                {#if folderIndex !== 2 && i == 0 && letterCopy.intro !== undefined}
                    <div class="intro">
                        {#each letterCopy.intro as graf, i}
                            <p>{@html graf.value}</p>
                        {/each}
                    </div>
                    <p class="date">{letterCopy.date}</p>
                {/if}
                {#each page.text as graf, i}
                    <p class:letter={folderIndex !== 2}>{@html graf.value}</p>
                {/each}
            </div>
            {#if i == letterCopy.pages.length - 1}
                <div class="padder"></div>
            {/if}
        </div>
    {/each}
</div>



<style>
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
        transition: all 0.5s ease-in-out;
        pointer-events: auto;
    }

    .page.isOpen {
        position: absolute;
        height: auto;
    }

    .topper {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }

    .topper.right-align {
        justify-content: flex-end;
    }

    .topper p {
        font-size: 10px;
        margin: 1rem 0 0 0;
    }

    .intro {
        border: 1px solid black;
        margin-top: 1rem;
        padding: 0 1rem;
    }

    .date {
        font-family: var(--serif);
        font-weight: 700;
        font-size: 18px;
        letter-spacing: 5px;
    }

    :global(span.class-hed) {
        width: 100%;
        display: inline-block;
        text-align: center;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 5px;
    }

    :global(span.right-align) {
        width: 100%;
        display: inline-block;
        text-align: right;
    }

    .page-inset {
        width: 100%;
        padding: 0 2rem 1rem 2rem;
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
        margin: 1rem 0;
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

