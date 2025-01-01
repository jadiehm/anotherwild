<script>
    import { getContext, onMount } from "svelte";
    import { logsVisible } from "$stores/misc.js";
    import tapeSVG from "$svg/tape.svg";

    const copy = getContext("copy");
    let currentLogIndex = 1; // Tracks the current log index
    const totalLogs = 18; // Total number of logs
    let logParaCount = 0;
    let audioDuration = 0;
    let activeDelay = 0;
    let highlightedIndex = 0; // Tracks the currently highlighted paragraph
    let isPlaying;

    function handleClick(event) {
        const target = event.target.closest('g')?.id;
        console.log({ target });

        const audioElement = document.getElementById('log-audio');
        const audioSource = document.getElementById('logAudioSource');

        if (!audioElement || !audioSource) {
            console.error("Audio element or source not found");
            return;
        }

        isPlaying = !audioElement.paused && !audioElement.ended && audioElement.readyState > 2;

        if (isPlaying) {
            audioElement.pause();
        }

        if (target === "play") {
            audioElement.play();
        } else if (target === "next") {
            currentLogIndex = currentLogIndex === totalLogs ? 1 : currentLogIndex + 1;
            updateAudioSource(audioElement, audioSource);
        } else if (target === "prev") {
            currentLogIndex = currentLogIndex === 1 ? totalLogs : currentLogIndex - 1;
            updateAudioSource(audioElement, audioSource);
        }
    }

    function updateAudioSource(audioElement, audioSource) {
        audioSource.src = `assets/audio/logs/LOGMSTR_CH${currentLogIndex}.mp3`;
        audioElement.load();

        audioElement.addEventListener('loadedmetadata', () => {
            audioDuration = audioElement.duration;
            console.log("Audio Duration:", audioDuration);

            activeDelay = audioDuration / logParaCount;
            console.log("Active Delay:", activeDelay);

            highlightedIndex = 0; // Reset the highlight index
            attachHighlightHandler(audioElement);
        });

        audioElement.play();
    }

    function countEls() {
        const logTextElements = document.querySelectorAll('.log-text p');
        logParaCount = logTextElements.length;
        console.log("Paragraph Count:", logParaCount);

        const audioElement = document.getElementById('log-audio');
        if (audioElement && audioElement.readyState > 0) {
            audioDuration = audioElement.duration;
            console.log("Audio Duration (preloaded):", audioDuration);

            activeDelay = audioDuration / logParaCount;
            console.log("Active Delay (preloaded):", activeDelay);
        }
    }

    function attachHighlightHandler(audioElement) {
        if (!audioElement) return;

        audioElement.addEventListener('timeupdate', () => {
            if (activeDelay > 0) {
                const currentIndex = Math.floor(audioElement.currentTime / activeDelay);
                console.log("Current Time:", audioElement.currentTime, "Index:", currentIndex);

                if (currentIndex !== highlightedIndex && currentIndex < logParaCount) {
                    highlightedIndex = currentIndex;
                }
            }
        });
    }

    onMount(() => {
        countEls();
        const audioElement = document.getElementById('log-audio');
        attachHighlightHandler(audioElement);
    });
</script>

<section class="logs" class:logsVisible={$logsVisible}>
    <audio id="log-audio" loop>
        <source id="logAudioSource" src="assets/audio/logs/LOGMSTR_CH1.mp3" type="audio/mpeg">
    </audio>
    <div class="tape-wrapper">
        <div class="tape-wrapper-inner">
            <img src="assets/images/tape.png" />
            <div class="svg-wrapper" on:click={handleClick}>
                {@html tapeSVG}
            </div>
        </div>
    </div>
    <div class="log-text">
        <h5>Log Excerpt {currentLogIndex}</h5>
        <div class="text-wrapper">
            <div class="text-inner">
                {#if activeDelay !== undefined}
                    {#each copy.logs[currentLogIndex-1].text as graf,i}
                        <p class:highlight={i === highlightedIndex}>{@html graf.value}</p>
                    {/each}
                {/if}
            </div>
        </div>
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
        padding-top: 6rem;
        transform: translateY(100%);
        transition: transform 500ms linear;
        font-family: var(--serif);
        color: var(--fang-light);
        overflow-x: hidden;
    }

    section.logsVisible {
        transform: translateY(0);
    }

    .tape-wrapper {
        width: 100%;
        display: flex;
        justify-content: center;
        height: auto;
    }

    .tape-wrapper-inner {
        position: relative;
        width: 100%;
        max-width: 800px;
        padding: 0 1rem;
        aspect-ratio: 1/0.75;
    }

    .tape-wrapper img {
        pointer-events: none;
    }

    .tape-wrapper img, .svg-wrapper {
        position: absolute;
        width: 100%;
        max-width: 800px;
        padding: 0 1rem;
    }

    .svg-wrapper {
        z-index: 1000;
    }

    :global(svg #play, svg #prev, svg #pause, svg #next) {
        pointer-events: auto;
        cursor: pointer;
    }

    :global(svg #play:hover, svg #prev:hover, svg #pause:hover, svg #next:hover) {
        opacity: 0.8;
    }

    .log-text {
        width: 100%;
        margin-bottom: 4rem;
        max-width: 600px;
        padding: 0 1rem;
    }

    h5 {
        font-family: var(--serif);
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 5px;
    }

    p {
        color: var(--fang-light);
        font-size: 16px;
        margin: 0;
        z-index: 1000;
        opacity: 0.4;
        filter: blur(1px);
        transition: all 0.25s ease;
    }

    .highlight {
        opacity: 1;
        font-size: 24px;
        filter: blur(0px);
    }
</style>