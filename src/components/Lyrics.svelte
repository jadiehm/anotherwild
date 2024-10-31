<script>
    import { getContext, onMount } from "svelte";
    import { currAboutSection } from "$stores/misc.js";
    const copy = getContext("copy");

    let clickedIndex = null; // Track the clicked index
    let pages = []; // Store the DOM elements of each page
    let originalPositions = [];
    let isExpanded = false;

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

    function pageClick(index) {
        if (clickedIndex === index && isExpanded) {
            // Revert back to the original positions (collapse)
            revertPositions();
            clickedIndex = null; // Clear the clicked index
            isExpanded = false;
        } else {
            // Expand and adjust positions for the clicked page
            clickedIndex = index;
            adjustPositions();
            isExpanded = true;
        }
    }

    function adjustPositions() {
        const clickedHeight = pages[clickedIndex].clientHeight;
        pages.forEach((page, i) => {
            if (i > clickedIndex) {
                // Calculate the new top value based on the original top position
                const originalTop = originalPositions[i];
                const newTop = originalTop + clickedHeight;
                page.style.top = `${newTop}px`; // Move the page down
            } else {
                // Reset the pages before the clicked one to their original positions
                page.style.top = `${originalPositions[i]}px`;
            }
        });
    }

    function revertPositions() {
        // Revert all pages to their original top positions
        pages.forEach((page, i) => {
            page.style.top = `${originalPositions[i]}px`;
        });
    }

    onMount(() => {
        // Initialize positions for each page on mount
        pages.forEach((page, i) => {
            const topPosition = 5 * i * 16; // Calculate rem to px (1rem = 16px)
            originalPositions[i] = topPosition; // Store original positions in pixels
            page.style.top = `${topPosition}px`; // Set the initial top position
        });
    });
</script>

<div class="page-wrapper">
    {#each copy.lyrics as song, i}
        <div 
            bind:this={pages[i]}
            class="page" 
            id="lyrics-page-{i}"
            class:isClickable={$currAboutSection == "lyrics"}
            style="transform: translate({getRandomLeft()}%, 0) rotate({getRandomRotate()}deg);
            filter: {clickedIndex === null || clickedIndex === i ? 'none' : 'brightness(70%)'};"
            on:click={() => pageClick(i)}
        >
            <h5>{song.num} {song.songTitle}</h5>
            {#each song.text as graf, i}
                <p>{@html graf.value}</p>
            {/each}
        </div>
    {/each}
</div>

<style>
    .page-wrapper {
        width: 100%;
        max-width: 680px;
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
        padding: 1rem 2rem 3rem 2rem;
        margin: 1rem auto;
        background-image: url("assets/images/bg_texture.png");
        background-size: 200px;
        background-repeat: repeat;
        border: 1px solid #dfd9d5;
        box-shadow: 0 -1px 1px rgba(0,0,0,0.15);
        z-index: 1000;
        left: 50%;
        position: absolute;
        transform: translate(-50%, 0);
        transition: top 0.5s ease-in-out, transform 0.5s ease-in-out, filter 0.3s ease;;
        cursor: pointer;
        pointer-events: none;
    }

    .isClickable {
        pointer-events: auto;
    }

    .isClickable:hover {
        transform: translate(-50%, -10px)
    }

    h5 {
        font-family: var(--serif);
        font-weight: 700;
    }

    p {
        display: flex;
        margin: 0;
    }

    :global(.right-align) {
        text-align: right;
        margin-left: auto;
    }
    @media(max-width: 600px) {
        .page {
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

