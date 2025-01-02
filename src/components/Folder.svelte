<script>
    import Letters from "$components/Letters.svelte";
    import stamp from "$svg/stamp.svg";

    let isOpen = false;

    export let folderType;
    export let folderIndex;
    export let activeFolder;

    function folderClick() {
        isOpen = !isOpen;
    }

    function folderChange(activeFolder) {
        isOpen = false;
    }


    $: folderChange(activeFolder);
</script>

<div id="folder-{folderIndex}" class="folder" class:isOpen={isOpen} class:isActive={activeFolder == folderIndex}>
    <div class="folder-inner">
        <div 
            class="folder-left"
            class:isOpen={isOpen}
            on:click={folderClick}
        >
            {#if folderIndex !== 2}
                <div class="sticky-note">
                    <div class="note-paper">
                        <p>Dispatch // Ephemera {folderIndex == 1 ? "two" : "one"}</p>
                        <p>{folderIndex == 1 ? "12.18.24" : "10.18.24"}</p>
                        <p>The Forest Park Wildlife Corridor</p>
                    </div>
                    <img class="paperclip" src="assets/images/paperclip.png" />
                </div>
            {:else}
                <p class="classified" class:isOpen={isOpen}>Classified</p>
            {/if}
            <div class="stamp">{@html stamp}</div>
            <div class="folder-block"></div>
            <div class="folder-tab">
                <img src="assets/images/left-edge.png" />
            </div>
        </div>
        <div class="folder-right" class:isOpen={isOpen}>
            <div class="letter-wrapper">
                <Letters {isOpen} folderIndex={folderIndex} />
            </div>
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
    .folder {
        width: 100%;
        max-width: 600px;
        aspect-ratio: 1 / 1.3;
        position: relative;
        transform: translate3d(0%, 0px, 0px);
        transition: all 0.5s linear;
        transform-style: preserve-3d;
        pointer-events: none;
    }

    .folder.isOpen {
        transform: translate3d(50%, 0px, 0px);
    }

    .folder-inner {
        width: 100%;
        height: 100%;
        position: relative;
        transform-style: preserve-3d;
        pointer-events: none;
    }

    .folder.isActive .folder-inner {
        pointer-events: auto;
    }

    .classified {
        position: absolute;
        left: 45%;
        transform: translate(-50%, 0);
        color:var(--fang-dark);
        font-family: var(--mono);
        font-weight: 700;
        font-size: 36px;
        letter-spacing: 5px;
        text-transform: uppercase;
        top: 20%; 
        z-index: 1000;
        opacity: 1;
    }

    .classified.isOpen {
        opacity: 0;
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
        background: var(--fang-light);
        transform: rotate(-2deg);
        color: var(--fang-dark);
        font-family: var(--serif);
        font-size: 10px;
        padding: 1rem;
        transition: opacity 0.5s;
        font-family:  var(--mono);
        text-transform: uppercase;
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

    :global(.folder .stamp svg path) {
        fill: var(--fang-dark);
    } 

    .instructions {
        position: absolute;
        bottom: 1.5rem;
        left: 1rem;
        z-index: 901;
        text-transform: uppercase;
        color: var(--fang-dark);
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
        font-family:  var(--mono); 
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
        pointer-events: none;
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
        overflow-y: hidden;
    }

    .folder-right.isOpen {
        overflow-y: visible;
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

    .letter-wrapper {
        width: 90%;
        height: 100%;
    }

    @media(max-width: 1000px) {
        .folder {
            width: 90%;
        }
        .folder.isOpen {
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
        .classified {
            font-size: 18px;
        }
    }
</style>