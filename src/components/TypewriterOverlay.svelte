<script>
    import { getContext, onMount } from "svelte";
    import Folder from "$components/Folder.svelte";
    import Tap from "$components/helpers/Tap.svelte";

    import { typewriterVisible } from "$stores/misc.js";

    const story = getContext("story");

    const chaptersLen = story.chapters.length;

    let activeChapter = 0;
    let horizTransform = 0;

    let chapPages = []; // Store the DOM elements of each page
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

    // function setPages($typewriterVisible, activeChapter) {
    // let cumulativeHeight = 0;
    // let delay = $typewriterVisible ? 250 : 0;

    // setTimeout(() => {
        // Select the specific wrapper for the active chapter
        // const activeWrapper = document.querySelector(`#page-wrapper-${activeChapter}`);
        // if (!activeWrapper) {
        //     return;
        // }

        // Only select pages within the active wrapper
        // const pagesInWrapper = Array.from(activeWrapper.querySelectorAll('.story-page'));


        // pagesInWrapper.forEach((page, i) => {
            // if ($typewriterVisible) {
                // Handle active chapter pages
        //         page.style.height = "auto";
        //         const fullHeight = page.scrollHeight;
        //         const pageHeight = fullHeight;

        //         const topPosition = cumulativeHeight;
        //         page.style.top = `${topPosition}px`;
        //         page.style.overflowY = "visible";

        //         cumulativeHeight += pageHeight + 32; // Add padding
        //     } else {
        //         // Reset to default positions
        //         page.style.top = `${i * 32}px`;
        //         page.style.height = "";
        //         page.style.overflowY = "hidden";
        //     }
        // });

        // Reset pages in non-active chapters
//         const nonActiveWrappers = Array.from(document.querySelectorAll(`.story-page-wrapper:not(#page-wrapper-${activeChapter})`));
//         nonActiveWrappers.forEach(wrapper => {
//             const nonActivePages = Array.from(wrapper.querySelectorAll('.story-page'));
//             nonActivePages.forEach((page, i) => {
//                 page.style.top = `${i * 32}px`; // Reset to default stacked position
//                 page.style.height = "";
//                 page.style.overflowY = "hidden";
//             });
//         });
//     }, delay);
// }



    // Initialize the function after mount
    // onMount(() => {
    //     // Initialize positions for each page on mount
    //     chapPages.forEach((page, i) => {
    //         page.style.top = `0px`; // Set the initial top position
    //     });
    // });

    // Reactive block to re-run when dependencies change
    // $: {
    //     if (typeof window !== "undefined") {
    //         setPages($typewriterVisible, activeChapter);
    //     }
    // }

    function handleTap(dir) {
        if (dir.detail === "left" && activeChapter > 0) {
            activeChapter--;
        } else if (dir.detail === "right" && activeChapter < chaptersLen - 1) {
            activeChapter++;
        }
        horizTransform = `${-activeChapter*90}vw`
    }
</script>

{#if $typewriterVisible}
    <Tap showArrows={true} on:tap={handleTap} activeChapter={activeChapter} chaptersLen={chaptersLen}/>
{/if}
<section class="story" class:typewriterVisible={$typewriterVisible} style="width: {100*chaptersLen}%; transform: translate({horizTransform},{$typewriterVisible ? "0px" : "100%"})">
    {#each story.chapters as chapter, i}
        <div id="contents-{i}" class="contents">
            <div id="page-wrapper-{i}" class="story-page-wrapper" class:typewriterVisible={$typewriterVisible}>
                {#each chapter.pages as page, i}
                    <div 
                        bind:this={chapPages[i]}
                        class="story-page" 
                        id="story-page-{i}"
                        style="transform: rotate({getRandomRotate()}deg); transition-delay: {(chaptersLen-i)*0.025}s;"
                    >
                        <div class="page-inset">
                            <div class="page-topper">
                                <p class="kicker">{chapter.title}</p>
                                <p class="page-num">{i+1}</p>
                            </div>
                            {#each page.text as graf, i}
                                <p>{@html graf.value}</p>
                            {/each}
                        </div>
                        {#if i == chapter.pages.length - 1}
                            <div class="padder"></div>
                        {/if}
                    </div>
                {/each}
            </div>
        </div>
    {/each}
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
        flex-direction: row;
        transform: translateY(100%);
        transition: transform 500ms linear;
        font-family: var(--serif);
        color: var(--fang-light);
        overflow: hidden;
        padding: 6rem 1rem 1rem 1rem;
    }

    section.typewriterVisible {
        transform: translateY(0);
        overflow:auto;
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

    .padder {
        height: 10rem;
        width: 100%;
    }
    .story-page-wrapper {
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
    :global(.span-intro) {
        font-size: 22px;
    }

    :global(.drop-cap) {
        float: left;
        font-size: 64px;
        line-height: 50px;
        padding-top: 8px;
        padding-right: 8px;
        padding-left: 3px;
    }

    .story-page {
        width: 100%;
        max-width: 660px;
        height: auto;
        color: #151515;
        margin: 1rem auto;
        z-index: 1000;
        left: 50%;
        transform: translate(0, 0);
        transition: all 0.75s ease-in-out;
        pointer-events: auto;
    }

    .page-inset {
        width: 100%;
        padding: 2rem;
        background-color: var(--fang-light);
        background-image: url("assets/images/bg_texture.png");
        background-size: 200px;
        background-repeat: repeat;
        border: 1px solid #dfd9d5;
        box-shadow: 0 -1px 1px rgba(0,0,0,0.15);
    }

    .page-topper {
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 2rem;
    }

    .kicker, .page-num {
        font-family: var(--mono);
        font-size: 12px;
        font-weight: 700;
        margin: 0;
        text-transform: uppercase;
    }

    .kicker {
        letter-spacing: 3px;
    }

    p {
        margin: 1rem 0;
        font-size: 14px;
    }

    p.letter {
        font-family: var(--serif);
    }

    .bolded {
        line-height: 1;  
        font-weight: 700;
        text-transform: uppercase;
    }

    .intro p {
        font-family: var(--mono);
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