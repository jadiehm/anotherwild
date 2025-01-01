<script>
    import { getContext, onMount } from "svelte";
    import { currAboutSection } from "$stores/misc.js";
    const copy = getContext("copy");

    let clickedIndex = null; // Track the clicked index
    let pages = []; // Store the DOM elements of each page
    let originalPositions = [];
    let isExpanded = false;

    export let isOpen;

    // Function to get a random rotation for each page
    function getRandomRotate() {
        const increments = [-1, -0.75, -0.5, -0.25, 0, 0.25, 0.5, 0.75, 1];
        const randomIndex = Math.floor(Math.random() * increments.length);
        return increments[randomIndex];
    }


    function setPages(isOpen) {
        let delay = isOpen ? 500 : 0;
        setTimeout(() => {
            let accumulatedHeight = 0; // Initial height to start stacking

            pages.forEach((page, i) => {
                if (i === 0) {
                    // The first page stays at the top (0)
                    originalPositions[i] = 0;
                } else {
                    // Calculate the top position based on the previous page's height
                    accumulatedHeight += pages[i - 1].clientHeight + 16; // Add the height of the previous page
                    originalPositions[i] = accumulatedHeight; // Store the accumulated height as the top position
                }

                // Set the top position for the current page
                page.style.top = isOpen ? `${originalPositions[i]}px` : 0;

                // Set the height and overflow based on isOpen state
                page.style.height = isOpen ? "auto" : "100%";
                page.style.overflowY = isOpen ? "visible" : "hidden";
            });
        }, delay);
    }

    onMount(() => {
        // Initialize positions for each page on mount
        pages.forEach((page, i) => {
            if (i === 0) {
                // The first page stays at the top (0)
                originalPositions[i] = 0;
            } else {
                // Calculate the top position based on the previous page's height
                accumulatedHeight += pages[i - 1].clientHeight + 16; // Add the height of the previous page
                originalPositions[i] = accumulatedHeight; // Store the accumulated height as the top position
            }

            // Set the top position for the current page
            page.style.top = isOpen ? `${originalPositions[i]}px` : 0;
            

            // Set the height and overflow based on isOpen state
            page.style.height = isOpen ? "auto" : "100%";
            page.style.overflowY = isOpen ? "visible" : "hidden";
        });
    });

    $: setPages(isOpen);
</script>

<div class="page-wrapper" class:isOpen={isOpen}>
    <div bind:this={pages[0]} class="page" class:isOpen={isOpen} style="transform: rotate({getRandomRotate()}deg);">
        {#each copy.note0 as graf, i}
            <p>{@html graf.value}</p>
        {/each}
    </div>
    <div bind:this={pages[1]} class="page" class:isOpen={isOpen} style="transform: rotate({getRandomRotate()}deg);">
        {#each copy.note1 as graf, i}
            <p>{@html graf.value}</p>
        {/each}
    </div>
    <div bind:this={pages[2]} class="page" class:isOpen={isOpen} style="transform: rotate({getRandomRotate()}deg);">
        {#each copy.note2 as graf, i}
            <p>{@html graf.value}</p>
        {/each}
    </div>
    <div bind:this={pages[3]} class="page" class:isOpen={isOpen} style="transform: rotate({getRandomRotate()}deg);">
        {#each copy.note3 as graf, i}
            <p>{@html graf.value}</p>
        {/each}
    </div>
    <div bind:this={pages[4]} id="last-page" class="page" class:isOpen={isOpen} style="transform: rotate({getRandomRotate()}deg);">
        <div class="page-inset">
            {#each copy.note4 as graf, i}
                <p>{@html graf.value}</p>
            {/each}
        </div>
        <div class="padder"></div>
    </div>
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
        overflow-y: hidden;
    }
    .page-wrapper.isOpen {
        overflow-y: visible;
    }
    .page {
        width: 100%;
        max-width: 660px;
        background-color: var(--fang-light);
        color: #151515;
        padding: 1rem 2rem 3rem 2rem;
        margin: 1rem auto;
        background-image: url("assets/images/bg_texture.png");
        background-size: 200px;
        background-repeat: repeat;
        border: 1px solid #dfd9d5;
        box-shadow: 0 -1px 1px rgba(0,0,0,0.15);
        z-index: 1000;
        left: 0;
        top: 0;
        position: absolute;
        transform: translate(0, 0);
        transition: top 0.5s ease-in-out, transform 0.5s ease-in-out, filter 0.3s ease;
        pointer-events: auto;
        cursor: auto;
    }

    #last-page {
        background-color: transparent;
        border: none;
        padding: 0;
    }
    .page-inset {
        width: 100%;
        padding: 1rem 2rem 3rem 2rem;
        background-color: var(--fang-light);
        background-image: url("assets/images/bg_texture.png");
        background-size: 200px;
        background-repeat: repeat;
        border: 1px solid #dfd9d5;
        box-shadow: 0 -1px 1px rgba(0,0,0,0.15);
    }

    /* .page.isOpen  {
        position: relative;
    } */

    h5 {
        font-family: var(--serif);
        font-weight: 700;
    }

    p {
        margin: 1rem 0;
        font-size: var(--14px);
    }

    :global(.right-align) {
        text-align: right;
        margin-left: auto;
    }
    @media(max-width: 600px) {
        .page, .page-inset {
            padding: 1rem 1rem 2rem 1rem;
        }
        #last-page {
            padding: 0;
        }
        h5 {
            font-size: var(--16px);
        }
        p {
            font-size: var(--12px);
        }
    }
</style>

