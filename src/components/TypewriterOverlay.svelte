<script>
    import { getContext, onMount } from "svelte";
    import Folder from "$components/Folder.svelte";
    import Tap from "$components/helpers/Tap.svelte";
    import { typewriterVisible } from "$stores/misc.js";
    import { fade } from "svelte/transition";
    import * as d3 from "d3";

    const copy = getContext("copy");
    const story = getContext("story");
    const chaptersLen = story.chapters.length;
    let mounted = false;

    let activeChapter = 0;
    let horizTransform = 0;
    let width;
    let scrollContainer;

    let chapPages = []; // Store the DOM elements of each page
    let originalPositions = [];

    $: allParagraphs = [
        // Original paragraphs 0-4
        ...copy.placeholder.slice(0, 5).map(p => ({ ...p, isGroup: false })), 
        
        // The injected group (margin 0)
        ...copy.placeholderGroup.map(p => ({ ...p, isGroup: true })),
        
        // The rest of the original paragraphs
        ...copy.placeholder.slice(5).map(p => ({ ...p, isGroup: false })),

        {value: "adeerbetweendeath:2026"}
    ];

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

    function setPages(activeChapter, visible) {
        const activePages = d3.selectAll(`#page-wrapper-${activeChapter} .story-page`);
        const nonActivePages = d3.selectAll(`.story-page:not(#page-wrapper-${activeChapter} .story-page)`);

        if (visible) {
            resetPages(nonActivePages)
            calcHeight(activePages)  
        } else {
            resetPages(nonActivePages)
            resetPages(activePages)
            activeChapter = 0;
        }
    }

    function calcHeight(pages) {
        let cumulativeHeight = 0;

        pages.each(function(d,i) {
            const page = d3.select(this);
            page
                    .style("height", "auto")
                    .style("overflow-y", "visible")
        })

        setTimeout(() => {
            pages.each(function(d, i) {
                const page = d3.select(this);
                const fullHeight = this.scrollHeight;
                const currTransform = page.style("transform");
                const newTransform = currTransform + ` translateY(${cumulativeHeight}px)`;

                page
                    .style("transform", `${newTransform}`)
                    .style("transition-delay", `${(page.length-i)*0.025}s`)

                cumulativeHeight += fullHeight + 32;
            });
        }, 750);
    }

    function resetPages(pages) {
        pages.each(function(d, i) {
            const page = d3.select(this);

            const currTransform = page.style("transform").replace(/translateY\([^)]+\)\s*/, '').trim();

            page
                .style("height", "100%")
                .style("overflow-y", "hidden")
                .style("transform", `${currTransform}`)
        })
    }

    function handleTap(dir) {
        if (dir.detail === "left" && activeChapter > 0) {
            activeChapter--;
        } else if (dir.detail === "right" && activeChapter < chaptersLen - 1) {
            activeChapter++;
        }

        scrollContainer.scrollTop = 0;
        horizTransform = `${-activeChapter*85}vw`
    }

    function getDelay(index, allPs) {
        let totalDelay = 0;
        for (let i = 0; i < index; i++) {
            // Delay is based on character count of previous paragraphs
            totalDelay += (allPs[i].value.length * 25); 
        }
        return totalDelay;
    }

    function typewriter(node, { speed = 1, delay = 0 }) {
        const text = node.textContent.trim();
        const duration = text.length / (speed * 0.02);
        
        // Hide text immediately
        node.textContent = ""; 

        return {
            delay,
            duration,
            tick: (t) => {
                // This is where the magic happens
                const i = Math.trunc(text.length * t);
                node.textContent = text.slice(0, i);
            }
        };
    }

    onMount(() => {
        mounted = true;
    });

    // $: if ($typewriterVisible && mounted) {
    //     setPages(activeChapter, $typewriterVisible);
    // }
</script>

<svelte:window bind:innerWidth={width}/>

<section class="placeholder" class:typewriterVisible={$typewriterVisible}>
    <div class="contents">
        <div class="story-page-wrapper" class:typewriterVisible={$typewriterVisible}>
            <div 
                class="story-page" 
                style="transform: rotate({getRandomRotate()}deg)"
            >
                <div class="page-inset">
                    {#if $typewriterVisible}
                        {#each allParagraphs as graf, i}
                            <p 
                                class="story-p" 
                                class:group={graf.isGroup}
                                in:typewriter|global={{ speed: 2, delay: getDelay(i, allParagraphs) }}
                            >
                                {graf.value}
                            </p>
                        {/each}
                    {/if}
                </div>
            </div>
        </div>
    </div>
</section>
<!-- {#if $typewriterVisible}
    <Tap tapType={"story"} showArrows={true} on:tap={handleTap} activeChapter={activeChapter} chaptersLen={chaptersLen}/>
{/if}
<section bind:this={scrollContainer} class="story" class:typewriterVisible={$typewriterVisible} style="width: {100*chaptersLen}%; transform: translate({horizTransform},{$typewriterVisible ? "0px" : "100%"})">
    {#each story.chapters as chapter, i}
        <div id="contents-{i}" class="contents">
            <div id="page-wrapper-{i}" class="story-page-wrapper" class:typewriterVisible={$typewriterVisible}>
                {#each chapter.pages as page, i}
                    <div 
                        bind:this={chapPages[i]}
                        class="story-page" 
                        id="story-page-{i}"
                        style="transform: rotate({getRandomRotate()}deg)"
                    >
                        <div class="page-inset">
                            <div class="page-topper">
                                <p class="kicker">CH{chapter.chapID} - {chapter.title}</p>
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
</section> -->

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
        width: 85vw; /* Ensure each content block has a consistent width */
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
        /* position: absolute; */
        padding: 0 1rem;
    }

    .page-inset {
        width: 100%;
        aspect-ratio: 1 / 1.3;
        padding: 2rem;
        background-color: var(--fang-paper);
        background-image: url("/assets/images/bg_texture.png");
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
        position: relative;
    }

    .kicker, .page-num {
        font-family: var(--mono);
        font-size: 12px;
        font-weight: 700;
        margin: 0;
    }

    .kicker {
        letter-spacing: 3px;
    }

    p {
        margin: 1rem 0;
        font-size: 14px;
        text-align: center;
        font-family: var(--mono);
    }

    p.group {
        margin: 0;
        min-height: 1.2em; /* Prevents layout jumping while typing */
        white-space: pre-wrap; /* Preserves formatting */
    }

    p.letter {
        font-family: var(--serif);
    }

    .story-p:last-of-type {
        font-weight: 700;
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
            padding: 2rem 1rem;
        }
        h5 {
            font-size: var(--16px);
        }
    }
</style>