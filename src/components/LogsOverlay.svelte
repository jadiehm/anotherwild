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
    let wheelSpin = false;

    function handleClick(event) {
        const target = event.target.closest('g')?.id;

        const audioElement = document.getElementById('log-audio');
        const audioSource = document.getElementById('logAudioSource');

        if (!audioElement || !audioSource) {
            return;
        }

        isPlaying = !audioElement.paused && !audioElement.ended && audioElement.readyState > 2;

        if (isPlaying) {
            audioElement.pause();
            wheelSpin = false;
        }

        if (target === "play") {
            audioElement.play();
            wheelSpin = true;
        } else if (target === "next") {
            currentLogIndex = currentLogIndex === totalLogs ? 1 : currentLogIndex + 1;
            updateAudioSource(audioElement, audioSource);
            wheelSpin = true;
        } else if (target === "prev") {
            currentLogIndex = currentLogIndex === 1 ? totalLogs : currentLogIndex - 1;
            updateAudioSource(audioElement, audioSource);
            wheelSpin = true;
        }
    }

    function updateAudioSource(audioElement, audioSource) {
        audioSource.src = `assets/audio/logs/LOGMSTR_CH${currentLogIndex}.mp3`;
        audioElement.load();

        audioElement.addEventListener('loadedmetadata', () => {
            audioDuration = audioElement.duration;
            // console.log("Audio Duration:", audioDuration);

            activeDelay = audioDuration / logParaCount;
            // console.log("Active Delay:", activeDelay);

            highlightedIndex = 0; // Reset the highlight index
            attachHighlightHandler(audioElement);
        });

        audioElement.play();
    }

    function countEls() {
        const logTextElements = document.querySelectorAll('.log-text p');
        logParaCount = logTextElements.length;
        // console.log("Paragraph Count:", logParaCount);

        const audioElement = document.getElementById('log-audio');
        if (audioElement && audioElement.readyState > 0) {
            audioDuration = audioElement.duration;
            // console.log("Audio Duration (preloaded):", audioDuration);

            activeDelay = audioDuration / logParaCount;
            // console.log("Active Delay (preloaded):", activeDelay);
        }
    }

    function attachHighlightHandler(audioElement) {
        if (!audioElement) return;

        const highlightDelay = 5; // 3-second delay before highlights start
        const highlightPause = 1; // Pause of 0.5 seconds between switching highlights
        let lastHighlightTime = 0; // Tracks the last time a highlight was updated

        audioElement.addEventListener("timeupdate", () => {
            if (activeDelay > 0) {
                const currentTime = audioElement.currentTime;

                // Only start highlights after the 3-second delay
                if (currentTime > highlightDelay) {
                    const adjustedTime = currentTime - highlightDelay; // Adjust time to start after delay

                    // Throttle highlight switching based on highlightPause
                    if (adjustedTime - lastHighlightTime >= highlightPause) {
                        const currentIndex = Math.floor(adjustedTime / activeDelay);

                        if (currentIndex !== highlightedIndex && currentIndex < logParaCount) {
                            highlightedIndex = currentIndex;
                            lastHighlightTime = adjustedTime; // Update the last highlight switch time
                        }
                    }
                }
            }
        });
    }

    onMount(() => {
        // countEls();
        // const audioElement = document.getElementById('log-audio');
        // attachHighlightHandler(audioElement);
    });
</script>

<section class="logs" class:logsVisible={$logsVisible}>
    <audio id="log-audio" loop>
        <source id="logAudioSource" src="assets/audio/logs/LOGMSTR_CH1.mp3" type="audio/mpeg">
    </audio>
    <img class="wheel" class:wheelSpin={wheelSpin} src="assets/images/tape-wheel.png" />
    <div class="tape-wrapper">
        <div class="tape-wrapper-inner">
            <img class="tape" src="assets/images/tape.png" />
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
                        <p>{@html graf.value}</p>
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
        max-width: 600px;
        padding: 0 1rem;
        aspect-ratio: 1/0.75;
    }

    .tape-wrapper img {
        pointer-events: none;
    }

    .tape-wrapper .tape, .svg-wrapper {
        position: absolute;
        width: calc(100% - 1rem);
        max-width: 800px;
        padding: 0 1rem 0 0;
    }

    .wheel {
        position: absolute;
        left: -10%;
        width: 50%;
        max-width: 500px;
        aspect-ratio: 1/1;
        z-index: 1000;
        opacity: 0;
        transition: opacity 0.5s ease;
        mix-blend-mode: multiply;
    }

    .wheel.wheelSpin {
        opacity: 0.1;
        animation: rotate 2s linear infinite;
    }

    @keyframes rotate {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
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
        /* opacity: 0.4;
        filter: blur(1px); */
        transition: all 0.25s ease;
    }

    .highlight {
        opacity: 1;
        font-size: 24px;
        filter: blur(0px);
    }
</style>