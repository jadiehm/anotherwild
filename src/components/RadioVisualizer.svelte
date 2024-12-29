<script>
    import { getContext, onMount } from "svelte";
	import Album from "$components/Album.svelte";
	import Info from "$components/Info.svelte";
	import PhotoClick from "$components/PhotoClick.svelte";
	import Icon from "$components/helpers/Icon.svelte";
	import spotifyIcon from "$svg/spotify.svg";
    import appleIcon from "$svg/itunes.svg";
	import bandcampIcon from "$svg/bandcamp.svg";
	import youtubeIcon from "$svg/youtube.svg";
    import instagramIcon from "$svg/instagram.svg";
	import stamp from "$svg/stamp.svg";
	import * as d3 from "d3";

	import topography from "$svg/topography.svg";

    import { aboutVisible, folderVisible, radioVisible, bckBtnVisible } from "$stores/misc.js";

	let width;
	let height;
	let infoVisible = false;

	const icons = [spotifyIcon, appleIcon, youtubeIcon, bandcampIcon, instagramIcon];

	const copy = getContext("copy");

	const data = [
		{
			"album": 1,
			"title": "finally",
			"id": "01FINALLY"
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
			"title": "driift",
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

	onMount (() => {
        // let topoPaths = d3.selectAll(".bg-topography svg path");

		// let shuffledPaths = d3.shuffle(topoPaths);

		// shuffledPaths.each(function(d, i) {
		// 	const path = d3.select(this);
		// 	const length = this.getTotalLength();

		// 	// Set up the path for drawing effect
		// 	path.attr("stroke-dasharray", length)
		// 		.attr("stroke-dashoffset", length)
		// 		.transition()                      // Apply a transition
		// 		.delay(i * 100)                    // Stagger each path by 300ms
		// 		.duration(3000)                    // Set the duration of the draw effect
		// 		.ease(d3.easeLinear)               // Use a linear easing for smooth drawing
		// 		.attr("stroke-dashoffset", 0);     // Animate dashoffset to 0 to "draw" the path
		// });

		const video = document.querySelector('#bg-video');
		const backupPhoto = document.querySelector('#video-backup');

		video.addEventListener('canplay', () => {
			backupPhoto.style.display = 'none';
		});
    })
</script>

<svelte:window bind:innerWidth={width} bind:innerHeight={height} />

<div class="locked" class:radioVisible={$radioVisible}>
    <audio id="bg-audio" loop>
        <source id="audioSource" src="assets/audio/preview/01FINALLY.mp3" type="audio/mpeg">
    </audio>
    <div class="bg-movie">
        <img src="assets/images/backup.jpg" alt="mountain" id="video-backup">
        <video id="bg-video" class="background-video" loop muted playsinline>
            <source id="videoSource" src="assets/video/01FINALLY.mp4" type="video/mp4">
        </video>
        <!-- <div class="bg-topography">
            {@html topography}
        </div> -->
        <div class="video-overlay"></div>
    </div>
</div>
<section class="radio" class:radioVisible={$radioVisible}>
    <div class="album-container">
        {#each albumGroups as album}
            <Album data={album}/>
        {/each}
    </div>
</section>

<style>
    .locked {
        position: fixed;
        transform: translateY(100%);
        transition: transform 500ms linear;
        width: 100%;
        height: 100svh;
    }

    .locked.radioVisible {
        transform: translateY(0);
        transition: transform 500ms linear;
    }
    section {
        width: 100%;
        height: 100svh;
        position: absolute;
        top: 0;
        left: 0;
        transform: translateY(100%);
        transition: transform 500ms linear;
        overflow-y: scroll;
    }

    section.radioVisible {
        transform: translateY(0);
        transition: transform 500ms linear;
    }

    .bg-topography {
		position: absolute;
		width: 100%;
		height: 100vh;
		top: 0;
		left: 0;
		z-index: 1;
		opacity: 0.1;
		transform: scale(4);
	}
	:global(.bg-topography svg path) {
		fill: none;
		stroke: #f1eeec;
		stroke-width: 0.5px;
	}

    .bg-movie {
		position: fixed;
		background: black;
		top: 0;
		left: 0;
		width: 100vw;     
		height: 100vh;   
		object-fit: cover; 
		z-index: -1;
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
	#video-backup {
		object-fit: cover;
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
		left: 0;
		transition: all 500s linear
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
		background: url("https://afangintherough.com/assets/images/bg-pattern-dark.png");
		opacity: .5;
	}
</style>