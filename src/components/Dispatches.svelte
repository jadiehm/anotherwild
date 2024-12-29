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

    function pageMouseOver() {
        let currTransform = this.style.transform;
        let newTransform = currTransform.replace("0px)", "-10px)");
        this.style.transform = newTransform;
    }

    function pageMouseLeave() {
        let currTransform = this.style.transform;
        let newTransform = currTransform.replace("-10px)", "0px)");
        this.style.transform = newTransform;
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

<div class="page-wrapper" class:isOpen={isOpen}>
    {#each copy.dispatches as dispatch, i}
        <div 
            bind:this={pages[i]}
            class="page" 
            id="dispatch-page-{i}"
            style="transform: translate({getRandomLeft()}%, 0) rotate({getRandomRotate()}deg);
            filter: {clickedIndex === null || clickedIndex === i ? 'none' : 'brightness(95%)'};"
            on:click={() => pageClick(i)}
            on:mouseenter={pageMouseOver}
            on:mouseleave={pageMouseLeave}
        >
            <!-- {#if i == copy.dispatches.length-1} -->
            <div class="page-inset">
                <p class="bolded">Dispatch // Ephermera {dispatch.id}</p>
                <div class="intro">
                    {#each dispatch.intro as graf, i}
                        <p>{@html graf.value}</p>
                    {/each}
                </div>
                <div class="text">
                    {#each dispatch.text as graf, i}
                        <p>{@html graf.value}</p>
                    {/each}
                </div>
            </div>
            <!-- <div class="padder"></div>
            {:else}
                {#each dispatch.intro as graf, i}
                    <p>{@html graf.value}</p>
                {/each}
                {#each dispatch.text as graf, i}
                    <p>{@html graf.value}</p>
                {/each}
            {/if} -->
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
    }
    .page {
        width: 100%;
        max-width: 660px;
        background-color: #f1eeec;
        color: #151515;
        padding: 1rem;
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
        transition: top 0.5s ease-in-out, transform 0.5s ease-in-out, filter 0.3s ease;
        cursor: pointer;
    }

    #dispatch-page-17 {
        background-color: transparent;
        border: none;
        padding: 0;
    }

    .page-inset {
        width: 100%;
        padding: 1rem 2rem 3rem 2rem;
        background-color: #f1eeec;
        background-image: url("assets/images/bg_texture.png");
        background-size: 200px;
        background-repeat: repeat;
    }

    h5 {
        font-family: var(--serif);
        font-weight: 700;
    }

    p {
        display: flex;
        margin: 0;
        font-size: 14px;
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
    }

    .intro {
        margin-bottom: 4rem;
    }

    .text p {
        margin: 1rem 0;
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

