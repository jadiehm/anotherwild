<script>
    import * as d3 from "d3";
    import AudioViz from "$components/AudioViz.svelte";
    import CircularAudioWave from "$utils/circular-audio-wave.js";
    import PlayIcon from "$svg/play.svg";
    import PauseIcon from "$svg/pause.svg";
    import { onMount } from "svelte";

    export let trackData;
    let active = false;
    let playing = false;
    let wave;
    let currTrack;
    let prevTrack = "x";
    let color = "currentColor";
	let fill = "2";

    onMount (() => {
        if (trackData.id == "01FLAG_GROUND" || trackData.id == "04GOLDWAVE") {
            wave = new CircularAudioWave(document.getElementById(`chart-container-${trackData.id}`));
            wave.loadAudio(`src/data/${trackData.id}.mp3`);
        }
    })

    function trackClick() {
        active = !active
        currTrack = this.id
        if (playing) { wave.pause()  
        } else { wave.play() }
        playing = !playing;
        console.log(currTrack, prevTrack)
        prevTrack = currTrack;
        console.log(currTrack, prevTrack)
    }

    const splitAt = (index, xs) => [xs.slice(0, index)]
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
    {#if trackData.id == "01FLAG_GROUND" || trackData.id == "04GOLDWAVE"}
        <div class="chart-container" id="chart-container-{trackData.id}"></div>
    {/if}
</div>

<style>
    .chart-container {
        width: 100%;
        aspect-ratio: 1 / 1;
        min-height: 500px;
        z-index: 999;
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
        letter-spacing: 1rem;
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
        top: -2rem;
        left: 0rem;
        font-size: 16px;
    }
    .trackTitle {
        font-family: "Alder Road";
        text-transform: uppercase;
        font-size: 100px;
        margin: 0;
        color: #ffffff;
        transition: 500ms all linear;
    }
    .active {
        height: 50rem;
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
</style>