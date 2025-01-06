<script>
    import { getContext, onMount } from "svelte";
    import { notesVisible } from "$stores/misc.js";

    const copy = getContext("copy");
    let clickedIndex = null;
    let pages = [];
    let originalPositions = [];
    let width;

    function getRandomRotate() {
        const increments = width >= 720 
            ? [-1, -0.75, -0.5, -0.25, 0, 0.25, 0.5, 0.75, 1] 
            : [-0.125, 0, 0.125];
        return increments[Math.floor(Math.random() * increments.length)];
    }

    function getRandomLeft() {
        const increments = [-52, -51, -50, -49, -48];
        return increments[Math.floor(Math.random() * increments.length)];
    }

    function setPages($notesVisible) {
        const delay = $notesVisible ? 750 : 0;
        let cumulativeHeight = 0;

        setTimeout(() => {
            pages.forEach((page, i) => {
                const fullHeight = page.scrollHeight;

                if ($notesVisible) {
                    page.style.top = `${cumulativeHeight}px`;
                    page.style.height = "auto";
                    page.style.overflowY = "visible";
                    originalPositions[i] = cumulativeHeight;
                    cumulativeHeight += fullHeight + 32;
                } else {
                    page.style.top = "0px";
                    page.style.height = "";
                    page.style.overflowY = "hidden";
                    originalPositions[i] = 0;
                }
            });
        }, delay);
    }

    onMount(() => {
        pages.forEach((page, i) => {
            page.style.top = `${i * 32}px`;
        });
    });

    $: setPages($notesVisible);
</script>

<svelte:window bind:innerWidth={width}/>

<section class="lyrics" class:notesVisible={$notesVisible}>
    <div class="page-wrapper" class:notesVisible={$notesVisible}>
        {#each copy.lyrics as page, i}
            <div
                bind:this={pages[i]}
                class="page"
                id="lyrics-page-{i}"
                style="
                    transform: translate({getRandomLeft()}%, {i * 32}px) rotate({getRandomRotate()}deg);
                    transition-delay: {(copy.lyrics.length - i) * 0.025}s;
                    filter: {clickedIndex === null || clickedIndex === i ? 'none' : 'brightness(95%)'};
                "
            >
                <div class="page-inset">
                    <h5>{page.num} {page.songTitle}</h5>
                    {#each page.text as graf}
                        <p>{@html graf.value}</p>
                    {/each}
                </div>
                {#if i === copy.lyrics.length - 1}
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
        color: var(--fang-light);
        overflow: hidden;
        padding: 6rem 1rem 1rem 1rem;
    }

    section.notesVisible {
        transform: translateY(0);
        overflow: auto;
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

    .page {
        width: 100%;
        max-width: 660px;
        height: auto;
        color: #151515;
        margin: 1rem auto;
        z-index: 1000;
        left: 50%;
        position: absolute;
        transform: translate(-50%, 0);
        transition: all 0.75s ease-in-out;
        pointer-events: auto;
    }

    .page-inset {
        width: 100%;
        padding: 1rem 2rem 2rem 2rem;
        background-color: var(--fang-paper);
        background-image: url("/assets/images/bg_texture.png");
        background-size: 200px;
        background-repeat: repeat;
        border: 1px solid #dfd9d5;
        box-shadow: 0 -1px 1px rgba(0, 0, 0, 0.15);
    }

    h5 {
        font-family: var(--serif);
        font-weight: 700;
    }

    p {
        margin: 0;
        font-size: 14px;
    }

    @media (max-width: 600px) {
        .page-inset {
            padding: 0rem 1rem 2rem 1rem;
        }
        h5 {
            font-size: 16px;
        }
    }
</style>