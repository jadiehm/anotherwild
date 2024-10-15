<script>
	import { getContext, onMount } from "svelte";
	import Album from "$components/Album.svelte";
	import AudioViz from "$components/AudioViz.svelte";
	import * as d3 from "d3";

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
	<div class="video-overlay"></div>
</div>
<div class="header">
	<h1>A fang in the rough</h1>
	<p>An album in 3 parts by <a href="https://www.instagram.com/watercolorpony/">Noah Fagan</a></p>
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
		background-image: linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.7));
		position: sticky;
		top: 0;
		z-index: 1000;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		padding: 0 0.5rem;
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

