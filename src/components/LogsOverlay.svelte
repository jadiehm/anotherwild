<script>
    import { getContext } from "svelte";
    import { logsVisible } from "$stores/misc.js";
    import tapeSVG from "$svg/tape.svg";

    const copy = getContext("copy");

    let currentLogIndex = 1; // Tracks the current log index
    const totalLogs = 18; // Total number of logs
    let logParaCount = 0;
    let audioDuration = 0;
    let activeDelay = 0;
    let highlightedIndex = 0; // Tracks the currently highlighted paragraph
    let isPlaying = false;
    let wheelSpin = false;

    function handleClick(event) {
        const targetId = event.target.closest('g')?.id;
        const audioElement = document.getElementById('log-audio');
        const audioSource = document.getElementById('logAudioSource');

        if (!audioElement || !audioSource) return;

        isPlaying = !audioElement.paused && !audioElement.ended && audioElement.readyState > 2;

        if (isPlaying) {
            audioElement.pause();
            wheelSpin = false;
        }

        switch (targetId) {
            case "play":
                audioElement.play();
                wheelSpin = true;
                break;
            case "next":
                currentLogIndex = (currentLogIndex % totalLogs) + 1;
                updateAudioSource(audioElement, audioSource);
                wheelSpin = true;
                break;
            case "prev":
                currentLogIndex = currentLogIndex === 1 ? totalLogs : currentLogIndex - 1;
                updateAudioSource(audioElement, audioSource);
                wheelSpin = true;
                break;
        }
    }

    function updateAudioSource(audioElement, audioSource) {
        audioSource.src = `assets/audio/logs/LOGMSTR_CH${currentLogIndex}.mp3`;
        audioElement.load();

        audioElement.addEventListener('loadedmetadata', () => {
            audioDuration = audioElement.duration;
            activeDelay = audioDuration / logParaCount;
            highlightedIndex = 0; // Reset highlight index
            attachHighlightHandler(audioElement);
        });

        audioElement.play();
    }

    function countEls() {
        const logTextElements = document.querySelectorAll('.log-text p');
        logParaCount = logTextElements.length;

        const audioElement = document.getElementById('log-audio');
        if (audioElement && audioElement.readyState > 0) {
            audioDuration = audioElement.duration;
            activeDelay = audioDuration / logParaCount;
        }
    }

    function attachHighlightHandler(audioElement) {
        if (!audioElement) return;

        const highlightDelay = 3; // Delay before highlights start
        const highlightPause = 0.5; // Pause between switching highlights
        let lastHighlightTime = 0; // Tracks last highlight update time

        audioElement.addEventListener("timeupdate", () => {
            if (activeDelay > 0) {
                const currentTime = audioElement.currentTime;

                if (currentTime > highlightDelay) {
                    const adjustedTime = currentTime - highlightDelay;

                    if (adjustedTime - lastHighlightTime >= highlightPause) {
                        const currentIndex = Math.floor(adjustedTime / activeDelay);

                        if (currentIndex !== highlightedIndex && currentIndex < logParaCount) {
                            highlightedIndex = currentIndex;
                            lastHighlightTime = adjustedTime;
                        }
                    }
                }
            }
        });
    }
</script>


<section class="logs" class:logsVisible={$logsVisible}>
    <audio id="log-audio" loop>
        <source id="logAudioSource" src="assets/audio/logs/LOGMSTR_CH1.mp3" type="audio/mpeg">
    </audio>
    <img 
        class="wheel" 
        class:wheelSpin={wheelSpin} 
        src="assets/images/tape-wheel.png" 
        alt="Tape deck wheel"
    />
    <div class="tape-wrapper">
        <div class="tape-wrapper-inner">
            <img 
                class="tape" 
                src="assets/images/tape.png" 
                srcset="
                    assets/images/tape.png 1000w, 
                    assets/images/tape-small.png 600w" 
                sizes="(min-width: 1000px) 1000px, 
                        (min-width: 600px) 600px, 
                        100vw" 
                alt="Vintage tape deck"
            />
            <div class="svg-wrapper" 
                role="button"
                tabindex="0"
                on:keydown={(e) => (e.key === 'Enter' || e.key === ' ') && handleClick(e)}
                aria-label="tape deck controls"
                on:click={handleClick}
            >
                {@html tapeSVG}
            </div>
        </div>
    </div>
    <div class="log-text">
        <h5>Log Excerpt {currentLogIndex}</h5>
        <div class="text-wrapper">
            <div class="text-inner">
                {#if activeDelay !== undefined}
                    {#each copy.logs[currentLogIndex - 1].text as graf, i}
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