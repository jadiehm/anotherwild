<script>
    import CircularAudioWave from "$utils/circular-audio-wave.js";
    import { currTrack } from "$stores/misc.js";
    import { onMount } from "svelte";

    export let id;
    export let active;
    
    let innerWidth;
    let isPlaying = false;
    let wave;
    let mounted = false;

    onMount (() => {
        wave = new CircularAudioWave(document.getElementById(`chart-container-${id}`));
        wave.loadAudio(`/assets/audio/${id}.mp3`);
        mounted = true;
    })

    $: if (mounted) {
        if (active && !isPlaying) {
            wave.play();
            isPlaying = true;
        } else if (!active && isPlaying) {
            wave.pause();
            isPlaying = false;
        }
    }
</script>