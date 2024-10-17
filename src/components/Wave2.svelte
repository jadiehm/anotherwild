<script>
    import { currTrack } from "$stores/misc.js";
    import { onMount } from "svelte";
    import * as d3 from 'd3';

    export let id;
    export let active;
    export let dimensions;
    
    let audioContext, analyser, audioSource;
    let frequencyData, dataArray;
    let isPlaying = false;
    let mounted = false;
    let currAudio;

    // Circular chart properties
    const numPoints = 100; // Number of points in the circular wave

    onMount(async () => {
        // Initialize the audio context and analyser
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
        analyser = audioContext.createAnalyser();
        analyser.fftSize = 256;
        analyser.smoothingTimeConstant = 0.7;

        // Set up frequency data array
        frequencyData = new Uint8Array(analyser.frequencyBinCount);
        dataArray = new Array(numPoints).fill(0);

        // Set up the audio element once
        currAudio = new Audio(`assets/audio/${id}.mp3`);
        currAudio.loop = true;
        audioSource = audioContext.createMediaElementSource(currAudio);
        audioSource.connect(analyser);
        analyser.connect(audioContext.destination);

        mounted = true;
    });

    function animate() {
        if (!isPlaying) return;

        requestAnimationFrame(animate);

        // Update frequency data and normalize for visualization
        analyser.getByteFrequencyData(frequencyData);
        for (let i = 0; i < numPoints; i++) {
            dataArray[i] = frequencyData[i * Math.floor(frequencyData.length / numPoints)] / 256;
        }

        let radius = dimensions[0]/4;

        // Create radial line generator
        const lineRadial = d3.lineRadial()
            .radius((d, i) => radius + d * 100 * d)
            .angle((d, i) => (i / numPoints) * 2 * Math.PI)
            .curve(d3.curveCardinalClosed.tension(1));
        
        const lineRadial2 = d3.lineRadial()
            .radius((d, i) => radius/2 + d * 100 * d)
            .angle((d, i) => (i / numPoints) * 2 * Math.PI)
            .curve(d3.curveCardinalClosed.tension(1));
        
        const lineRadial3 = d3.lineRadial()
            .radius((d, i) => radius/6 + d * 100 * d)
            .angle((d, i) => (i / numPoints) * 2 * Math.PI)
            .curve(d3.curveCardinalClosed.tension(1));

        // Update the path data
        let path1 = d3.select(`#path1-${id}`)
            .datum(dataArray)
            .attr('d', lineRadial)
            .style("opacity", 1);
        
        let path2 = d3.select(`#path2-${id}`)
            .datum(dataArray)
            .attr('d', lineRadial2)
            .style("opacity", 1);

        let path3 = d3.select(`#path3-${id}`)
            .datum(dataArray)
            .attr('d', lineRadial3)
            .style("opacity", 1);
    }

    // Reactively handle changes in `active`
    $: if (mounted) {
        if (active && !isPlaying) {
            // Resume audio context for browsers with autoplay restrictions
            audioContext.resume().then(() => {
                currAudio.play().catch(error => {
                    console.log("Autoplay prevented, audio play requires user interaction.");
                });
            });

            isPlaying = true;
            animate();
        } else if (!active && isPlaying) {
            // Stop audio and reset animation when inactive
            currAudio.pause();
            isPlaying = false;

            // Fade out the path
            d3.selectAll(`#path1-${id}, #path2-${id}`).style("opacity", 0);
        }
    }
</script>

{#if dimensions[0] !== undefined}
<svg id="audio-wave-{id}" class="audio-wave" width={dimensions[0]} height={dimensions[1]}>
    <!-- Center the group in the middle of the SVG -->
    <g transform={`translate(${dimensions[0]/2}, ${dimensions[1]/2})`}>
        <path id="path1-{id}" fill="none" stroke="#f1eeec" stroke-width="2"></path>
        <path id="path2-{id}" fill="none" stroke="#f1eeec" stroke-width="2"></path>
        <path id="path3-{id}" fill="none" stroke="#f1eeec" stroke-width="2"></path>
    </g>
</svg>
{/if}

<style>
    .audio-wave {
      width: 100%;
      height: 100%;
    }

    path {
        fill: none;
        stroke: #f1eeec;
        stroke-width: 2;
    }
</style>