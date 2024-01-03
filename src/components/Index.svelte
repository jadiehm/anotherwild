<script>
	import { getContext } from "svelte";
	import Album from "$components/Album.svelte";
	import AudioViz from "$components/AudioViz.svelte";
	import * as d3 from "d3";

	let scrollY;

	// const copy = getContext("copy");
	// const data = getContext("data");

	const data = [
		{
			"album": 1,
			"title": "flag//ground",
			"id": "01FLAG_GROUND"
		},
		{
			"album": 1,
			"title": "rogue",
			"id": "02ROGUE"
		},
		{
			"album": 1,
			"title": "theme (for homebody)",
			"id": "03THEME"
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
		console.log(scrollY)
		if (scrollY == 0 || scrollY == undefined || scrollY <= 1000) {
			return 1
		} else {
			return scrollY * 1/1000
		}	
	}
</script>

<svelte:window bind:scrollY={scrollY} />

<audio id="01FLAG_GROUND">
	<source src="src/data/01FLAG_GROUND.mp3" type="audio/mpeg">
</audio>
<audio id="04GOLDWAVE">
	<source src="src/data/04GOLDWAVE.mp3" type="audio/mpeg">
</audio>

<div class="bg" style="transform: scale({scrollScale(scrollY)})"></div>
<div class="album-container">
	{#each albumGroups as album}
		<Album data={album}/>
	{/each}
</div>
<!-- <AudioViz /> -->

<style>
	.bg {
		position: fixed;
		width: 100%;
		height: 100vh;
		top: 0;
		left: 0;
		background-image: url("assets/bg.jpg");
        background-size: cover;
		z-index: 1;
	}
	.album-container {
		position: absolute;
		width: 100%;
		height: 100vh;
		top: 0;
		left: 0;
		z-index: 999;
	}
</style>

