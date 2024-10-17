<script>
    import Wave from "$components/Wave2.svelte";
    import PlayIcon from "$svg/play.svg";
    import PauseIcon from "$svg/pause.svg";
    import { onMount } from "svelte";
    import { currTrack } from "$stores/misc.js";
    import { get } from 'svelte/store';
    import { createEventDispatcher } from 'svelte';

    export let trackData;
    let active = false;
    let playing = false;

    const dispatch = createEventDispatcher();

    function trackClick() {
        const currActiveTrack = $currTrack;
        const newActiveTrack = currActiveTrack === trackData.id ? null : trackData.id;
        currTrack.set(newActiveTrack);
        dispatch('trackclicked', { id: trackData.id, active: newActiveTrack === trackData.id  });

        const video = document.getElementById('bg-video');
        const source = document.getElementById('videoSource');
        const audioSource = document.getElementById('audioSource');

        video.classList.add('fade-out');

        function onFadeOut() {
            // Change the video source

            if ($currTrack !== null) {
                audioSource.src = `assets/audio/preview/${$currTrack}.mp3`;
                source.src = `assets/video/${$currTrack}.mp4`;
                video.setAttribute("preload", "none");
                video.load();
                video.muted = true; // Ensures the video remains muted
                video.play();
            } else {
                audioSource.src = `assets/video/01FLAGGROUND.mp3`;
                source.src = `assets/video/01FLAGGROUND.mp4`;
                video.setAttribute("preload", "none");
                video.load();
                video.muted = true; // Ensures the video remains muted
            }

            // Step 3: Fade the video back in
            video.classList.remove('fade-out');
            
            // Remove the event listener to avoid triggering it again
            video.removeEventListener('transitionend', onFadeOut);
        }

        video.addEventListener('transitionend', onFadeOut);
    }

    const splitAt = (index, xs) => [xs.slice(0, index)];

    $: active = $currTrack == trackData.id;
    let svgWidth, svgHeight;
</script>

<div class="track" on:click={trackClick} class:active={active} id="id-{trackData.id}">
    <div class="details">
        <p class="trackNum">{splitAt(2, trackData.id)}</p>
        <p class="trackTitle">{trackData.title}</p>
        <button>
            {#if active}
                {@html PauseIcon}
            {:else}
                {@html PlayIcon}
            {/if}
        </button>
    </div>
        <div class="chart-container" id="chart-container-{trackData.id}" bind:clientWidth={svgWidth} bind:clientHeight={svgHeight}>
            <Wave id={trackData.id} {active} dimensions={[svgWidth, svgHeight]}/>
        </div>
</div>

<style>
    .chart-container {
        margin: 0 auto;
        width: 100%;
        max-width: 600px;
        aspect-ratio: 1 / 1;
        min-height: 500px;
        z-index: 999;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .track {
        display: flex;
        flex-direction: column;
        align-items: center;
        height: 8rem;
        transition: 500ms all linear;
        overflow: hidden;
        cursor: pointer;
    }
    .track:hover .trackTitle {
        letter-spacing: 0.35rem;
    }
    .track:hover button {
        opacity: 1;
    }
    .details {
        display: flex;
        flex-direction: row;
        align-items: center;
    }
    .trackNum {
        display: inline-block;
        color: #f1eeec;
        border-radius: 50%;
        width: 2rem;
        height: 2rem;
        font-family: "Carnaby Street";
        text-align: center;
        font-weight: 700;
        padding: 0.25rem;
        margin: 0;
        position: relative;
        top: -1rem;
        left: 0rem;
        font-size: 16px;
        text-shadow: 1px 1px 4px black;
    }
    .trackTitle {
        font-family: "Hoefler Text";
        text-transform: uppercase;
        font-size: 46px;
        margin: 0;
        color: #f1eeec;
        transition: 500ms letter-spacing linear;
        text-shadow: 2px 2px 6px black;
    }
    .active {
        height: 40rem;
    }
    button {
        background: transparent;
        border-radius: 50%;
        height: 3.5rem;
        width: 3.5rem;
        display: flex;
        justify-content: center;
        align-items: center;
        opacity: 0.5;
    }
    :global(button svg) {
        width: 100%;
        height: 100%;
    }
    :global(button svg path) {
        fill: #f1eeec;
    }

    @media(max-width: 800px) {
        .track {
            height: 6rem;
        }
        .active {
            height: 35rem;
        }
        .trackTitle {
            font-size: 36px;
            text-shadow: 2px 2px 6px black;
        }

        .track:hover .trackTitle {
            letter-spacing: 0.15rem;
        }

        .trackNum {
            top: -0.5rem;
            text-shadow: 1px 1px 2px black;
        }
        button {
            height: 2.5rem;
            width: 2.5rem; 
        }
    }

    @media(max-width: 600px) {
        .track {
            height: 5rem;
        }
        .active {
            height: 35rem;
        }
        .trackTitle {
            font-size: 24px;
            text-shadow: 2px 2px 6px black;
        }

        .track:hover .trackTitle {
            letter-spacing: 0.15rem;
        }

        .trackNum {
            top: -0.25rem;
            font-size: 12px;
        }
        button {
            height: 2.25rem;
            width: 2.25rem; 
        }
    }

    @media(max-width: 400px) {
        .track {
            height: 4rem;
        }
        .trackTitle {
            font-size: 18px;
        }
        .active {
            height: 32rem;
        }

        .track:hover .trackTitle {
            letter-spacing: 0.125rem;
        }
    }
</style>