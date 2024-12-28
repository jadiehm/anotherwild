<script>
    import InfoOverlay from "$components/InfoOverlay.svelte";
    import FolderOverlay from "$components/FolderOverlay.svelte";
    import photoClickSVG from "$svg/photoclick.svg";
    import Icon from "$components/helpers/Icon.svelte";
    import * as d3 from "d3";

    import { aboutVisible, folderVisible } from "$stores/misc.js";

    function handleClick(event) {
        // Check if the clicked element is a `<g>` or a child of it
        let target = event.target.closest('g');
        if (target && target.id) {
            let id = target.id;
            if (id == "light") {
                aboutVisible.set(true);
            } else if (id == "folder") {
                folderVisible.set(true); 
            }
        } else {
            console.log("No valid ID found for clicked element");
        }
    }

    function handleMouseOver(event) {
        const target = event.target.closest('g');
        if (target && target.id) {
            let id = target.id;
            d3.select(`#${id}-overlay`).style("opacity", 0.75);
        } else {
            console.log("No valid ID found for hovered element");
        }
    }

    function handleMouseOut(event) {
        d3.selectAll('.overlays img').style("opacity", 0);
    }

    function backClick() {aboutVisible.set(false);}
</script>

<div id="photo-click" class:aboutVisible={$aboutVisible}>
    <div class="vignette" class:aboutVisible={$aboutVisible}></div>
    <div class="vignette dark" class:aboutVisible={$aboutVisible}></div>
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
    >
        {@html photoClickSVG}
    </div>
    <img src="/assets/images/photoclick.jpg" />
</div>
<button class="back" class:aboutVisible={$aboutVisible} on:click={backClick}>
    <Icon name="arrow-left" width="1rem"/>
    Back home to desk
</button>
<InfoOverlay />
<FolderOverlay />

<style>
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
    }

    #photo-click img {
        width: 100%;
        aspect-ratio: 1.75/1;
    }

    #photo-click.aboutVisible {
        pointer-events: none;
    }

    .back {
        position: absolute;
        top: 1rem;
        right: 1rem;
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

    .back.aboutVisible {
        opacity: 1;
        pointer-events: auto;
    }

    :global(.back svg) {
        margin: -2px 6px 0 0;
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

    :global(.svg-wrapper svg path, .svg-wrapper svg polygon) {
        cursor: pointer;
    }

    .vignette {
        width: 100%;
        height: 100svh;
        position: absolute;
        background: radial-gradient(circle, rgba(1,1,14,0) 0%, rgba(1,1,14,0.5) 100%);
        transition: opacity 0.5 ease;
        opacity: 1;
        pointer-events: none;
    }

    .vignette.aboutVisible {
        opacity: 0;
    }

    .vignette.dark {
        pointer-events: none;
        background: radial-gradient(circle, rgba(1,1,14,0.90) 0%, rgba(1,1,14,0.90) 100%);
        transition: opacity 0.5 ease;  
        opacity: 0;
    }

    .vignette.dark.aboutVisible {
        opacity: 1;
    }
</style>