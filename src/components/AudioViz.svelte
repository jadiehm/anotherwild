<script>
    import { onMount } from "svelte";
    import CircularAudioWave from "$utils/circular-audio-wave.js";
    import PlayCircle from "lucide-svelte/icons/play";
	import PauseCircle from "lucide-svelte/icons/pause";

    export let id;

    let wave;
    let playing = false;
    let color = "currentColor";
	let fill = "2";
    let width;
    let height;

    onMount (() => {
        wave = new CircularAudioWave(document.getElementById(`chart-container-${id}`));
        wave.loadAudio(`src/data/${id}.mp3`);
    })

    function btnClick() {
        playing = !playing
        if (playing) { wave.play()  
        } else { wave.pause() }
    }
</script>

<div class="chart-container" id="chart-container-{id}"></div>
<button on:click={btnClick}>
    {#if playing}
        <PauseCircle {color} {fill} />
    {:else}
        <span><PlayCircle {color} {fill} /></span>
    {/if}
</button>

<style>
    .chart-container {
        width: 100%;
        aspect-ratio: 1 / 1;
        min-height: 500px;
        z-index: 999;
    }
    button {
        position: absolute;
        left: 1.5rem;
        bottom: 2rem;
        z-index: 999;
        background: rgba(255,255,255,0.8);
        border-radius: 50%;
        height: 3rem;
        width: 3rem;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    button span {
        margin: 0.25rem 0 0 0.25rem;
    }
    button:hover {
        transform: scale(1.25);
        transition: 100ms all linear;
    }
</style>