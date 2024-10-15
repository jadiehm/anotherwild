<script>
	import { getContext, onMount } from "svelte";
	import Album from "$components/Album.svelte";
	import AudioViz from "$components/AudioViz.svelte";
	import * as d3 from "d3";

	import topography from "$svg/topography.svg";

	let scrollY;
	let width;
	let height;
	let audio;
	let demo1Shader;
	let img;


	const data = [
		{
			"album": 1,
			"title": "flag//ground",
			"id": "01FLAGGROUND"
		},
		{
			"album": 1,
			"title": "rogue",
			"id": "02ROGUE"
		},
		{
			"album": 1,
			"title": "theme (for homebody)",
			"id": "03THEMEFORHOMEBODY"
		},
		{
			"album": 1,
			"title": "goldwave",
			"id": "04GOLDWAVE"
		},
		{
			"album": 1,
			"title": "cold beach",
			"id": "05COLDBEACH"
		},
		{
			"album": 1,
			"title": "and then",
			"id": "06ANDTHEN"
		},
		{
			"album": 2,
			"title": "tanto",
			"id": "07TANTO"
		},
		{
			"album": 2,
			"title": "black",
			"id": "08BLACK"
		},
		{
			"album": 2,
			"title": "a (frame)",
			"id": "09AFRAME"
		},
		{
			"album": 2,
			"title": "onward",
			"id": "10ONWARD"
		},
		{
			"album": 2,
			"title": "drifft",
			"id": "11DRIIFT"
		},
		{
			"album": 2,
			"title": "go",
			"id": "12GO"
		},
		{
			"album": 3,
			"title": "time",
			"id": "13TIME"
		},
		{
			"album": 3,
			"title": "catch and release",
			"id": "14CATCHANDRELEASE"
		},
		{
			"album": 3,
			"title": "mantra recital",
			"id": "15MANTRARECITAL"
		},
		{
			"album": 3,
			"title": "summit",
			"id": "16SUMMIT"
		},
		{
			"album": 3,
			"title": "prayer",
			"id": "17PRAYER"
		},
		{
			"album": 3,
			"title": "holy",
			"id": "18HOLY"
		},
	]
	const albumGroups = d3.groups(data, d => d.album);

	function scrollScale(scrollY) {
		if (scrollY == 0 || scrollY == undefined) {
			return 1
		} else {
			return 1 + scrollY/1000
		}	
	}

	onMount (() => {
        let topoPaths = d3.selectAll(".bg-topography svg path");

		let shuffledPaths = d3.shuffle(topoPaths);

		shuffledPaths.each(function(d, i) {
			const path = d3.select(this);
			const length = this.getTotalLength();

			// Set up the path for drawing effect
			path.attr("stroke-dasharray", length)
				.attr("stroke-dashoffset", length)
				.transition()                      // Apply a transition
				.delay(i * 100)                    // Stagger each path by 300ms
				.duration(2000)                    // Set the duration of the draw effect
				.ease(d3.easeLinear)               // Use a linear easing for smooth drawing
				.attr("stroke-dashoffset", 0);     // Animate dashoffset to 0 to "draw" the path
		});
    })
</script>

<svelte:window bind:scrollY={scrollY} bind:innerWidth={width} bind:innerHeight={height} />

{#each data as song, i}
	<audio id="audio_{song.id}">
		<source src="src/data/{song.id}.mp3" type="audio/mpeg">
	</audio>
{/each}
<!-- <div class="bg" style="transform: scale({scrollScale(scrollY)})"></div> -->
<div class="bg-movie">
	<video id="bg-video" loop muted class="background-video">
		<source id="videoSource" src="/assets/01FLAGGROUND.mp4" type="video/mp4">
	</video>
	<div class="bg-topography">
		{@html topography}
	</div>
	<div class="video-overlay"></div>
</div>
<div class="header">
	<h1>A fang in the rough</h1>
	<p>A concept album in 3 parts by <a href="https://www.instagram.com/watercolorpony/">Noah Fagan</a></p>
</div>
<div class="album-container">
	{#each albumGroups as album}
		<Album data={album}/>
	{/each}
</div>

<style>
	.bg {
		position: fixed;
		width: 100%;
		height: 100vh;
		top: 0;
		left: 0;
		background-image: url("assets/bg.jpg");
        background-size: cover;
		background-position: center;
		background-repeat: no-repeat;
		z-index: 1;
	}
	.bg-topography {
		position: absolute;
		width: 100%;
		height: 100vh;
		top: 0;
		left: 0;
		z-index: 1;
		opacity: 0.05;
		transform: scale(4);
	}
	:global(.bg-topography svg path) {
		fill: none;
		stroke: white;
		stroke-width: 0.5px;
	}
	.bg-movie {
		position: fixed;
		background: black;
		top: 0;
		left: 0;
		width: 100vw;     /* Full viewport width */
		height: 100vh;    /* Full viewport height */
		object-fit: cover; /* Ensures the video covers the entire screen */
		z-index: -1;      /* Places the video behind other content */
	}
	#bg-video {
		object-fit: cover;
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
		left: 0;
		transition: opacity 0.25s ease-out;
   		opacity: 0.8; 
	}
	:global(#bg-video.fade-out) {
    	opacity: 0 !important; 
	}
	.video-overlay {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: url("assets/bg-pattern-dark.png");
		opacity: .5;
	}
	.header {
		width: 100%;
		height: 3.5rem;
		background-image: linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.9));
		backdrop-filter: blur(2px);
		position: fixed;
		top: 0;
		left: 0;
		z-index: 1000;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		padding: 0 0.5rem;
		border-bottom: 1px solid white;
	}
	h1 {
		margin: 0;
		font-family: "Carnaby Street";
		text-transform: uppercase;
		color: #ffffff;
		font-size: 20px;
		letter-spacing: 1px;
	}
	.header p, .header a {
		margin: 0;
		font-family: "Carnaby Street";
		color: #ffffff;
		font-size: 14px;
	}
	.header a {
		text-transform: uppercase;
	}
	.header a:hover {
		color: #A5BFB6;
	}
	.album-container {
		position: absolute;
		width: 100%;
		height: 100vh;
		top: 3.5rem;
		left: 0;
		z-index: 999;
	}

	@media(max-width: 400px) {
       h1 {
			font-size: 18px;
			letter-spacing: 0px;
	   }
	   .header p, .header a  {
			font-size: 12px;
	   }
    }
</style>

