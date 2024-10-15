<script>
    import Wave from "$components/Wave.svelte";
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

        video.classList.add('fade-out');

        video.addEventListener('transitionend', function onFadeOut() {
            // Change the video source
            source.src = $currTrack !== null ? `/assets/${$currTrack}.mp4` : `/assets/01FLAGGROUND.mp4` ;

            
            // Reload and play the new video
            if ($currTrack !== null) {
                video.load();
                video.muted = true; // Ensures the video remains muted
                video.play();
            } else {
                video.load();
                video.muted = true; // Ensures the video remains muted
            }

            // Step 3: Fade the video back in
            video.classList.remove('fade-out');
            
            // Remove the event listener to avoid triggering it again
            video.removeEventListener('transitionend', onFadeOut);
        });
    }

    const splitAt = (index, xs) => [xs.slice(0, index)];

    $: active = $currTrack == trackData.id;
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
        <div class="chart-container" id="chart-container-{trackData.id}">
            <Wave id={trackData.id} {active} {playing} />
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
        height: 10rem;
        transition: 500ms all linear;
        overflow: hidden;
    }
    .track:hover .trackTitle {
        letter-spacing: 0.5rem;
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
        color: #ffffff;
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
        font-family: "Alder Road";
        text-transform: uppercase;
        font-size: 90px;
        margin: 0;
        color: #ffffff;
        transition: 500ms all linear;
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

    @media(max-width: 800px) {
        .track {
            height: 7rem;
        }
        .active {
            height: 35rem;
        }
        .trackTitle {
            font-size: 64px;
            text-shadow: 2px 2px 6px black;
        }

        .track:hover .trackTitle {
            letter-spacing: 0.5rem;
        }

        .trackNum {
            top: -0.5rem;
        }
        button {
            height: 2.5rem;
            width: 2.5rem; 
        }
    }

    @media(max-width: 600px) {
        .track {
            height: 6rem;
        }
        .active {
            height: 35rem;
        }
        .trackTitle {
            font-size: 40px;
            text-shadow: 2px 2px 6px black;
        }

        .track:hover .trackTitle {
            letter-spacing: 0.25rem;
        }

        .trackNum {
            top: -0.25rem;
            font-size: 14px;
        }
    }

    @media(max-width: 400px) {
        .track {
            height: 4rem;
        }
        .active {
            height: 32rem;
        }
        .trackTitle {
            font-size: 28px;
            text-shadow: 1px 1px 4px black;
        }

        .track:hover .trackTitle {
            letter-spacing: 0.25rem;
        }

        .trackNum {
            top: -0.25rem;
            font-size: 12px;
        }
    }
</style>