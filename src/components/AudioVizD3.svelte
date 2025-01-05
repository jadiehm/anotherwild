<script>
    import { onMount } from "svelte";
    import * as d3 from "d3";

    export let id;

    let width;
    let height;
    let context;
    let audioFile;
    let source;
    let analyser;
    let viz;
    let frequencyData = new Uint8Array(200);

    onMount (() => {
        context = new (window.AudioContext || window.webkitAudioContext)();
        audioFile = document.getElementById(`${id}`);
        source = context.createMediaElementSource(audioFile);
        analyser = context.createAnalyser();
        
        source.connect(analyser);
        source.connect(context.destination);

        viz = d3.select(`#id-${id} .audio-viz`)

        viz.append("svg")
            .attr("width", width)
            .attr("height", height)
            .append("g")
            .attr("transform", "translate(0,0)")
        
        let lineNum = [0,1,2,3,4];
        
        lineNum.forEach(function(i) {
            viz.select("g")
                .append("path")
                .attr("id", `path-${i}`);
        })
        

        renderChart();
    })

    function renderChart() {
        requestAnimationFrame(renderChart);
        analyser.getByteFrequencyData(frequencyData);

        let audioData = [];

        frequencyData.forEach(function(value, index) {
            if (index % 4 === 0) {
                if (value < 65) {
                    frequencyData[index] = value + 65;
                }
                audioData.push(frequencyData[index]);
            }
        })
        // drawPaths([audioData])
    }

    function drawPaths(audioFrequencies) {
        const freqLength = 5;
        
        audioFrequencies.forEach(function(frequency, i) {
            let pathOne = [];
            let pathTwo = [];
            let pathThree = [];
            let pathFour = [];
            let pathFive = [];

            // Lazy inefficient code to make 5 closed paths
            viz.selectAll(".nodes")
                .data(frequency, function (value, index) {
                    pathOne.push([
                        width / 2 * (1 - (parseFloat(Math.max(value, 0)) / 750) * 1.01 * Math.sin(index * 2 * Math.PI / freqLength)),
                        width / 2 * (1 - (parseFloat(Math.max(value, 0)) / 750) * 1.01 * Math.cos(index * 2 * Math.PI / freqLength))
                    ]);
                });

            pathOne.push(pathOne[0]);

            let lineFunctionCurvy = d3.line()
                .x(d => d[0])
                .x(d => d[1]-70)
                .curve(d3.curveBasis);

            viz.select(`#path-0`)
                .attr("d", lineFunctionCurvy(pathOne))
                .attr("stroke", "rgba(30,215,96, 1)")
                .attr("stroke-width", 1);
        })
    }
</script>

<svelte:window bind:innerWidth={width} bind:innerHeight={height} />

<div class="audio-viz" id="audio-viz-{id}">
</div>

<style>
    .audio-viz {
        width: 100%;
        height: 100vh;
    }
</style>