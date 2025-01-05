<script>
    import { getContext, onMount } from "svelte";
    import InfoOverlay from "$components/InfoOverlay.svelte";
    import FolderOverlay from "$components/FolderOverlay.svelte";
    import ViewfinderOverlay from "$components/ViewfinderOverlay.svelte";
    import NotesOverlay from "$components/NotesOverlay.svelte";
    import RadioVisualizer from "$components/RadioVisualizer.svelte";
    import LogsOverlay from "$components/LogsOverlay.svelte";
    import TypewriterOverlay from "$components/TypewriterOverlay.svelte";
    import photoClickSVG from "$svg/photoclick.svg";
    import touchSVG from "$svg/touch.svg";
    import Icon from "$components/helpers/Icon.svelte";
    import { fade } from "svelte/transition";
    import * as d3 from "d3";

    import { aboutVisible, folderVisible, radioVisible, notesVisible, viewfinderVisible, logsVisible, typewriterVisible, bckBtnVisible } from "$stores/misc.js";

    let width;
    let height;
    let activeSection = "afangintherough";
    let showHintText = false;
    let hintText;
    let hintTextX = 0;
    let hintTextY = 0;
    let hintWidth = 0; // Width of the hint element
    let isMounted;
    let audioLogElement;
    let audioSongElement;
    let touchVisible = true;

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
                } else if (id == "tape") {
                    logsVisible.set(true);
                    activeSection = "log excerpts";
                } else if (id == "typewriter") {
                    typewriterVisible.set(true);
                    activeSection = "a deer between death";
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
            touchVisible = false;
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
                hintText = "log excerpts"
            }
        }
    }

    function handleMouseMove(event) {
        const hintElement = document.getElementById('hover-hint');
        if (hintElement) {
            hintWidth = hintElement.offsetWidth; // Dynamically get the hint width
        }

        const isRightSide = event.pageX > width / 2;
        hintTextX = isRightSide
            ? event.pageX - hintWidth// Offset to the left if on the right side
            : event.pageX; // Offset to the right if on the left side
        hintTextY = event.pageY; // Slight offset below the cursor
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
        logsVisible.set(false);
        typewriterVisible.set(false);
        bckBtnVisible.set(false);
        activeSection = "afangintherough";
    }
    let visibleText = '';
    let showCursor = false; // Controls cursor visibility
    let index = 0;
    const delay = 100; // Time delay between each character (in ms)
    let typingTask; // Holds the current typing task for cancellation

    const typeText = async (text, cancelToken) => {
        visibleText = ''; // Clear existing text
        index = 0; // Reset index
        showCursor = false;

        while (index < text.length) {
            if (cancelToken.cancelled) {
                return; // Exit the function if cancelled
            }

            visibleText += text[index]; // Add one character at a time
            index++;
            await new Promise((resolve) => setTimeout(resolve, delay));
        }

        showCursor = true;
    };

    // Start the typewriter animation whenever `activeSection` changes
    $: if (activeSection) {
        // Cancel the previous typing animation if one is ongoing
        if (typingTask) {
            typingTask.cancelled = true;
        }

        typingTask = { cancelled: false }; // Create a new cancel token
        typeText(activeSection, typingTask);
    }

    $: if (isMounted && !$bckBtnVisible) {
        const audioLogElement = d3.select('#log-audio');
        const audioSongElement = d3.select('#bg-audio');

        if (audioLogElement) {
            audioLogElement.node().pause();
            audioLogElement.node().currentTime = 0;
            audioLogElement.node().load();
        }

        if (audioSongElement) {
            audioSongElement.node().pause();
            audioLogElement.node().currentTime = 0;
            audioLogElement.node().load();
        } 
    }

    onMount(() => {
        isMounted = true;
        audioLogElement = d3.select('#log-audio');
        audioSongElement = d3.select('#bg-audio');

        const handleKeyUp = () => {
            // Hide the hint text on key release
            showHintText = false;
        };

        // Add keyup listener
        window.addEventListener("keyup", handleKeyUp);

        // Cleanup on component destroy
        return () => {
            window.removeEventListener("keyup", handleKeyUp);
        };
    });
</script>

<svelte:window bind:innerWidth={width} bind:innerHeight={height} />

<nav>
    <div class="sec-name">
        <h1>
            {#each visibleText.split("") as char, i}
                <span in:fade={{duration:200, delay: 200}}>{char}</span>
            {/each}
            {#if showCursor}
                <span class="cursor"></span>
            {/if}
        </h1>
    </div>
    <button class="back" class:bckBtnVisible={$bckBtnVisible} on:click={backClick}>
        <Icon name="arrow-left" width="1rem"/>
        {#if width >= 500}
            Back to desk
        {/if}
    </button>
</nav>

<p id="hover-hint" class:bckBtnVisible={bckBtnVisible} style="opacity: {showHintText ? 1 : 0}; top: {hintTextY}px; left: {hintTextX}px;">
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
    <div class="touch-hint" class:touchVisible={touchVisible}>
        {@html touchSVG}
        <p>Explore the desk</p>
    </div>
    <div class="svg-wrapper" 
        on:click={handleClick}
        on:mouseover={handleMouseOver}
        on:mouseout={handleMouseOut}
        on:mousemove={handleMouseMove}
    >
        {@html photoClickSVG}
    </div>
    <div class="photo-wrapper">
        <img src="/assets/images/photoclick.jpg" />
    </div>
</div>
<InfoOverlay />
<NotesOverlay />
<RadioVisualizer />
<FolderOverlay />
<ViewfinderOverlay />
<LogsOverlay />
<TypewriterOverlay />

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
        background-color: rgba(0, 0, 0, 0.7);
        backdrop-filter: blur(10px);
    }

    .sec-name h1 {
        font-family: var(--mono);
        color: var(--fang-paper);
        position: relative;
        line-height: 1;
        font-size: 40px;
    }

    .cursor {
        display: inline-block;
        width: 2px;
        height: 2.5rem;
        background-color: currentColor;
        animation: blink 1s step-start infinite;
        position: absolute;
        top: 0px;
        right: -6px;
    }

    footer {
        position: absolute;
        font-family: var(--mono);
        color: var(--fang-paper);
        left: 1rem;
        bottom: 0;
        width: 100%;
        font-size: 12px;
        opacity: 1;
        transition: opacity 0.5s ease;
    }

    footer.bckBtnVisible {
        opacity: 0;
    }

    @keyframes blink {
        50% {
            opacity: 0;
        }
    }

    .touch-hint {
        position: absolute;
        left: 50%;
        top: 30svh;
        transform: translate(-50%, 0);
        color: var(--fang-paper);
        font-family: var(--mono);
        text-transform: uppercase;
        z-index: 1000;
        font-weight: 700;
        font-size: 14px;
        align-items: center;
        display: flex;
        flex-direction: row;
        align-items: center;
        opacity: 0;
        pointer-events: none;
        transition: opacity 0.5s ease;
    }

    .touch-hint.touchVisible {
        opacity: 1;
    }

    :global(.touch-hint svg) {
        width: 1.5rem;
        height: 1.5rem;
        margin-right: 0.25rem;
        animation: shake 0.75s ease-in-out infinite;
    }

    @keyframes shake {
        0% { transform: translateX(-1px); }
        50% { transform: translateX(1px); }
        100% { transform: translateX(-1px); }
    }

    #hover-hint {
        position: absolute;
        font-family: var(--mono);
        text-transform: uppercase;
        font-weight: 700;
        color: var(--fang-paper);
        z-index: 1000;
        pointer-events: none;
        transition: opacity 0.25s ease;
        text-shadow: 2px 2px 10px var(--fang-dark);
    }

    #hover-hint.bckBtnVisible {
        opacity: 0;
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
        padding-bottom: 15svh;
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
        font-family: var(--mono);
        font-weight: 700;
        font-size: 12px;
        border: none;
        background: #a6bfc2;
        color: var(--fang-dark);
        opacity: 0;
        transition: all 0.5s ease;
        z-index: 1000;
        pointer-events: none;
        display: flex;
        align-items: center;
        text-transform: uppercase;
        border-radius: 3px;
        border: 2px solid var(--fang-dark);
    }

    .back:hover {
        opacity: 0.8 !important;
        transform: translate(-4px, 0);
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
        z-index:1000;
    }

    .overlays img {
        opacity: 0;
        transition: opacity 0.5s ease;
        position: absolute;
        width: 100%;
        height: 100%;
        z-index:1000;
    }

    .highlight {
        opacity: 0.75;
        transition: opacity 0.5s ease;
    }

    .svg-wrapper, .photo-wrapper {
        width: 100%; 
        aspect-ratio: 1.75/1;
        position: absolute;
        margin-top: 1rem;
    }

    .svg-wrapper {
        z-index: 1000;
    }

    .photo-wrapper {
        pointer-events: none;
        z-index: 0;
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
        z-index: 1000
    }

    .vignette.bckBtnVisible {
        opacity: 0;
    }

    .vignette.dark {
        pointer-events: none;
        background: radial-gradient(circle, rgba(1,1,14,0.90) 0%, rgba(1,1,14,0.90) 100%);
        transition: opacity 1s ease;  
        opacity: 0;
        z-index: 1000
    }

    .vignette.dark.bckBtnVisible {
        opacity: 1;
    }

    :global(span.break) {
        display: inline-block;
        width: 100%;
        position: relative;
        left: 50%;
        transform: translate(-2%, 0);
    }

    @media(max-width: 700px) {
        .sec-name h1 {
            font-size: 30px;
        }
    }

    @media(max-width: 600px) {
        .sec-name h1 {
            font-size: 30px;
        }

        .cursor {
            height: 2rem;
        }

        nav {
            padding: 0 0.5rem;
        }

        .svg-wrapper, .photo-wrapper, .overlays {
            width: 150%;
        }
    }

    @media(max-width: 500px) {
        .sec-name h1 {
            font-size: 24px;
        }
        :global(.back svg) {
            margin: 0;
        }
    }

    @media(max-width: 400px) {
        .sec-name h1 {
            font-size: 24px;
        }

        .cursor {
            height: 1.75rem;
        }
    }
</style>