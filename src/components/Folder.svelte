<script>
    import Lyrics from "$components/Lyrics.svelte";
    import AboutNote from "$components/AboutNote.svelte";
    import stamp from "$svg/stamp.svg";
    import { currAboutSection } from "$stores/misc.js";
    import Icon from "$components/helpers/Icon.svelte";

    let isOpen = false;
    export let folderType;

    function folderClick() {
        isOpen = !isOpen;
    }
    function sectionSwitch() {
        isOpen = false;
    }
    $: sectionSwitch($currAboutSection)
</script>

<div id="folder" class:isOpen={isOpen} class:isClickable={$currAboutSection == folderType}>
    <div class="folder-inner">
        <div 
            class="folder-left"
            class:isOpen={isOpen}
            on:click={folderClick}
        >
            <div class="sticky-note">
                <div class="note-paper">
                    {#if $currAboutSection == "aboutthisproject"}
                        <p>From the desk of T F P W C</p>
                        <p>Subject(s) relate a series of memory in and out of sequence:</p>
                    {:else}
                        <p>A N O T H E R W I L D</p>
                        <p>A  F A N G  I N  T H E  R O U G H lyrics:</p>
                    {/if}
                </div>
                <img class="paperclip" src="assets/images/paperclip.png" />
            </div>
            <div class="instructions">
                <Icon name={"folder-plus"} width={"1rem"}/>
                <p>Tap to open</p>
            </div>
            <div class="stamp">{@html stamp}</div>
            <div class="folder-block"></div>
            <div class="folder-tab">
                <img src="assets/images/left-edge.png" />
            </div>
        </div>
        <div class="folder-right">
            {#if folderType == "lyrics"}
                <div class="lyrics-wrapper">
                    <Lyrics {isOpen} />
                </div>
            {:else}
                <div class="notes-wrapper">
                    <AboutNote {isOpen} />
                </div>
            {/if}
            <div class="folder-back" on:click={folderClick}>
                <div class="folder-block"></div>
                <div class="folder-tab">
                    <img src="assets/images/right-edge.png" />
                </div>
            </div>
        </div>
    </div>
</div>

<style>
    #folder {
        width: calc(50% - 2rem);
        max-width: 660px;
        aspect-ratio: 1 / 1.3;
        position: relative;
        transform: translate3d(0%, 0px, 0px);
        transition: all 0.5s linear;
        transform-style: preserve-3d;
        pointer-events: none;
    }

    #folder.isOpen {
        transform: translate3d(50%, 0px, 0px);
    }

    #folder.isClickable {
        pointer-events: auto;
    }

    .folder-inner {
        width: 100%;
        height: 100%;
        position: relative;
        transform-style: preserve-3d;
    }

    .sticky-note {
        position: absolute;
        left: 10%;
        width: 30%;
        aspect-ratio: 1;
    }

    .note-paper {
        height: 100%;
        width: 100%;
        z-index: 900;
        position: absolute;
        background: #f1eeec;
        transform: rotate(-2deg);
        color: black;
        font-family: var(--serif);
        font-size: 10px;
        padding: 1rem;
        transition: opacity 0.5s;
    }

    .note-paper p:first-of-type {
        font-weight: 700;
    }

    .isOpen .note-paper, .isOpen .stamp, .isOpen .instructions {
        opacity: 0;
        transition: opacity 0.5s;
    }

    .paperclip {
        position: absolute; 
        width: 18%;
        top: -11%;
        left: 1rem;
        z-index: 901;
        transform: rotate(0);
    }

    .stamp {
        position: absolute;
        bottom: 1.5rem;
        right: 20%;
        width: 20%;
        aspect-ratio: 1;
        z-index: 901;
        transform: rotate(5deg);
        transition: opacity 0.5s;
    }

    :global(#folder .stamp svg path) {
        fill: black;
    } 

    .instructions {
        position: absolute;
        bottom: 1.5rem;
        left: 1rem;
        z-index: 901;
        text-transform: uppercase;
        color: black;
        font-weight: 700;
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 0.25rem;
        justify-content: center;
        transition: opacity 0.5s;
    }

    .instructions p {
        margin: 0;
        padding: 0;
        font-size: var(--14px);   
        font-family: "Carnaby Street"; 
    }

    :global(.instructions svg) {
        margin-bottom: 0.125rem;
    }

    .folder-left {
        z-index: 10;
        position: absolute;
        width: 100%;
        height: 100%;
        transform: translate3d(0px, 0px, 25px) rotate3d(0, 1, 0, 0deg);
        transition: all 0.5s linear;
        transform-style: preserve-3d;
        transform-origin: 0% 50%;
        display: flex;
        flex-direction: row;
        cursor: pointer;
    }
    .folder-block {
        width: 75%;
        height: 100%;
        background-color: #f1d592;
        position: relative;
    }
    .folder-tab {
        height: 100%;
        width: 15%;
        margin-left: -0.5rem;
    }

    .folder-tab img {
        height: 100%;
    }

    .folder-left.isOpen {
        transform: translate3d(0px, 0px, 25px) rotate3d(0, 1, 0, -180deg);
    }
    .folder-right {
        z-index: 9;
        position: absolute;
        width:100%;
        height: 100%;
        padding: 2rem;
        transform-style: preserve-3d;
        cursor: auto;
    }

    .folder-back {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        display: flex;
        flex-direction: row;
        cursor: pointer;
    }

    .folder-right .folder-block {
        width: 85%;
        background-color: #e2c88b;
    }

    .lyrics-wrapper, .notes-wrapper {
        width: 90%;
        height: 100%;
    }

    @media(max-width: 900px) {
        #folder {
            width: 85%;
        }
        #folder.isOpen {
            transform: translate3d(0, 0px, 0px);
        }
    }
    @media(max-width: 600px) {
        .folder-right {
            padding: 1rem;
        }
        .sticky-note {
            width: 38%;
        }
        .note-paper {
            padding: 0.5rem 0.5rem 0.5rem 0.5rem;
            line-height: 1.25;
        }
        .note-paper p {
            margin:0.5rem 0
        }
    }
</style>