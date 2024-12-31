<script>
    import { getContext, onMount } from "svelte";
    import InfoOverlay from "$components/InfoOverlay.svelte";
    import FolderOverlay from "$components/FolderOverlay.svelte";
    import ViewfinderOverlay from "$components/ViewfinderOverlay.svelte";
    import NotesOverlay from "$components/NotesOverlay.svelte";
    import RadioVisualizer from "$components/RadioVisualizer.svelte";
    import photoClickSVG from "$svg/photoclick.svg";
    import Icon from "$components/helpers/Icon.svelte";
    import { fade } from "svelte/transition";
    import * as d3 from "d3";

    import { aboutVisible, folderVisible, radioVisible, notesVisible, viewfinderVisible, bckBtnVisible } from "$stores/misc.js";

    let activeSection = "afangintherough";
    let showHintText = false;
    let hintText;
    let hintTextX;
    let hintTextY;

    function handleClick(event) {
        // Check if the clicked element is a `<g>` or a child of it
        let target = event.target.closest('g');

        setTimeout(() => {
            if (target && target.id) {
                let id = target.id;
                bckBtnVisible.set(true)
                if (id == "light") {
                    aboutVisible.set(true);
                    activeSection = "about";
                } else if (id == "folder") {
                    folderVisible.set(true); 
                    activeSection = "documents";
                } else if (id == "radio") {
                    radioVisible.set(true); 
                    activeSection = "audio visualizer";
                } else if (id == "paper") {
                    notesVisible.set(true)
                    activeSection = "lyrics";
                } else if (id == "viewfinder") {
                    viewfinderVisible.set(true);
                    activeSection = "viewfinder";
                }
            } 
        }, 500)
    }

    function handleMouseOver(event) {
        const target = event.target.closest('g');
        if (target && target.id) {
            let id = target.id;
            let overlay = d3.select(`#${id}-overlay`)
            overlay.style("opacity", 0.75);
            showHintText = true;
            if (id == "light") {
                hintText = "about";
            } else if (id == "folder") {
                hintText = "documents";
            } else if (id == "radio") {
                hintText = "audio visualizer";
            } else if (id == "paper") {
                hintText = "lyrics";
            } else if (id == "viewfinder") {
                hintText = "viewfinder";
            } else if (id == "typewriter") {
                hintText = "story";
            } else if (id == "tape") {
                hintText = "audio logs"
            }
        }
    }

    function handleMouseMove(event) {
        hintTextX = event.pageX; // Offset slightly to the right
        hintTextY = event.pageY; // Offset slightly below
    }

    function handleMouseOut(event) {
        d3.selectAll('.overlays img').style("opacity", 0);
        showHintText = false;
        hintText = "";
    }

    function backClick() {
        aboutVisible.set(false);
        folderVisible.set(false);
        radioVisible.set(false);
        notesVisible.set(false);
        viewfinderVisible.set(false);
        bckBtnVisible.set(false);
        activeSection = "afangintherough";
    }
    let visibleText = '';
    let showCursor = false; // Controls cursor visibility


    // Animate the text display
    let index = 0;
    const delay = 100; // Time delay between each character (in ms)

    const typeText = async (text) => {
        visibleText = ''; // Clear existing text
        index = 0; // Reset index
        while (index < text.length) {
            visibleText += text[index]; // Add one character at a time
            index++;
            await new Promise((resolve) => setTimeout(resolve, delay));
        }

        showCursor = true;
    };

    // Start the typewriter animation when the component is initialized
    $: if (activeSection) {
        showCursor = false;
        typeText(activeSection); // Retrigger animation on `activeSection` change
    }
</script>

<nav>
    <div class="sec-name">
        <h3>
            {#each visibleText.split("") as char, i}
                <span in:fade={{duration:200, delay: 200}}>{char}</span>
            {/each}
            {#if showCursor}
                <span class="cursor"></span>
            {/if}
        </h3>
    </div>
    <button class="back" class:bckBtnVisible={$bckBtnVisible} on:click={backClick}>
        <Icon name="arrow-left" width="1rem"/>
        Back home to desk
    </button>
</nav>

<p
    id="hover-hint"
    style="opacity: {showHintText ? 1 : 0}; top: {hintTextY}px; left: {hintTextX}px;"
>
    {hintText}
</p>

<div id="photo-click" class:bckBtnVisible={$bckBtnVisible}>
    <div class="vignette" class:bckBtnVisible={$bckBtnVisible}></div>
    <div class="vignette dark" class:bckBtnVisible={$bckBtnVisible}></div>
    <div class="overlays">
        <img id="tape-overlay" src="/assets/images/tape-overlay.png" />
        <img id="typewriter-overlay" src="/assets/images/typewriter-overlay.png" />
        <img id="radio-overlay" src="/assets/images/radio-overlay.png" />
        <img id="paper-overlay" src="/assets/images/paper-overlay.png" />
        <img id="folder-overlay" src="/assets/images/folder-overlay.png" />
        <img id="viewfinder-overlay" src="/assets/images/viewfinder-overlay.png" />
        <img id="light-overlay" src="/assets/images/light-overlay.png" />
    </div>
    <div class="svg-wrapper" 
        on:click={handleClick}
        on:mouseover={handleMouseOver}
        on:mouseout={handleMouseOut}
        on:mousemove={handleMouseMove}
    >
        {@html photoClickSVG}
    </div>
    <img src="/assets/images/photoclick.jpg" />
</div>
<InfoOverlay />
<NotesOverlay />
<RadioVisualizer />
<FolderOverlay />
<ViewfinderOverlay />

<style>
    nav {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        padding: 0 1rem;
        z-index: 1000;
    }

    .sec-name h3 {
        font-family:'Courier New', Courier, monospace;
        color: #f1eeec;
        position: relative;
    }

    .cursor {
        display: inline-block;
        width: 2px;
        height: 2rem;
        background-color: currentColor;
        animation: blink 1s step-start infinite;
        position: absolute;
        top: 0px;
        right: -4px;
    }

    @keyframes blink {
        50% {
            opacity: 0;
        }
    }

    #hover-hint {
        position: absolute;
        font-family:'Courier New', Courier, monospace;
        text-transform: uppercase;
        font-weight: 700;
        color: #f1eeec;
        z-index: 1000;
        pointer-events: none;
        transition: opacity 0.25s ease;
    }

    h1 {
        position: absolute;
        left: 4rem;
        top: 2rem;
        text-transform: uppercase;
        letter-spacing: 20px;
        color: #f1eeec;
        z-index: 1000;
    }
    #photo-click {
        width: 100%;
        height: 100svh;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #01010e;
        transform: scale(1);
        transition: transform 0.5s ease;
        position: fixed;
        overflow: hidden;
    }

    #photo-click img {
        width: 100%;
        aspect-ratio: 1.75/1;
    }

    #photo-click.bckBtnVisible {
        pointer-events: none;
        overflow-x: hidden;
        overflow-y: auto;
    }

    .back {
        font-family:'Courier New', Courier, monospace;
        font-weight: 700;
        font-size: 12px;
        border: 1px solid #f1eeec;
        background: transparent;
        color: #f1eeec;
        opacity: 0;
        transition: opacity 0.5s ease;
        z-index: 1000;
        pointer-events: none;
        display: flex;
        align-items: center;
    }

    .back:hover {
        background: #2e2e2e;
    }

    :global(.back:hover svg g) {
        transform: translateX(-3px);
    }

    .back.bckBtnVisible {
        opacity: 1;
        pointer-events: auto;
    }

    :global(.back svg) {
        margin: -2px 6px 0 0;
        transition: transform 0.25s ease;
    }

    :global(.back svg path, .back svg polygon) {
        fill: none;
    }

    .overlays {
        width: 100%; 
        aspect-ratio: 1.75/1;
        position: absolute;
        margin-top: 1rem; 
        filter: blur(20px);
        pointer-events: none;
    }

    .overlays img {
        opacity: 0;
        transition: opacity 0.5s ease;
        position: absolute;
        width: 100%;
        height: 100%;
    }

    .highlight {
        opacity: 0.75;
        transition: opacity 0.5s ease;
    }

    .svg-wrapper {
        width: 100%; 
        aspect-ratio: 1.75/1;
        position: absolute;
        margin-top: 1rem;
    }

    :global(.svg-wrapper svg path, .svg-wrapper svg polygon, .svg-wrapper svg polyline) {
        cursor: pointer;
    }

    .vignette {
        width: 100%;
        height: 100svh;
        position: absolute;
        background: radial-gradient(circle, rgba(1,1,14,0) 0%, rgba(1,1,14,0.5) 100%);
        transition: opacity 1s ease;
        opacity: 1;
        pointer-events: none;
    }

    .vignette.bckBtnVisible {
        opacity: 0;
    }

    .vignette.dark {
        pointer-events: none;
        background: radial-gradient(circle, rgba(1,1,14,0.90) 0%, rgba(1,1,14,0.90) 100%);
        transition: opacity 1s ease;  
        opacity: 0;
    }

    .vignette.dark.bckBtnVisible {
        opacity: 1;
    }
</style>