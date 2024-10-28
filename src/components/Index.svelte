<script>
	import { getContext, onMount } from "svelte";
	import Album from "$components/Album.svelte";
	import Info from "$components/Info.svelte";
	import Icon from "$components/helpers/Icon.svelte";
	import spotifyIcon from "$svg/spotify.svg";
    import appleIcon from "$svg/itunes.svg";
	import bandcampIcon from "$svg/bandcamp.svg";
	import youtubeIcon from "$svg/youtube.svg";
    import instagramIcon from "$svg/instagram.svg";
	import stamp from "$svg/stamp.svg";
	import * as d3 from "d3";

	import topography from "$svg/topography.svg";

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
				.duration(3000)                    // Set the duration of the draw effect
				.ease(d3.easeLinear)               // Use a linear easing for smooth drawing
				.attr("stroke-dashoffset", 0);     // Animate dashoffset to 0 to "draw" the path
		});

		const video = document.querySelector('#bg-video');
		const backupPhoto = document.querySelector('#video-backup');

		video.addEventListener('canplay', () => {
			backupPhoto.style.display = 'none';
		});
    })

	function infoClick() {
		infoVisible = !infoVisible;
		const body = document.querySelector('body');
		const albumContainer = d3.select('.album-container');
		if (infoVisible) {
			albumContainer.style("pointer-events", "none");
		} else {
			albumContainer.style("pointer-events", "auto");
		}
	}
</script>

<svelte:window bind:innerWidth={width} bind:innerHeight={height} />

<Info {infoVisible}/>
<audio id="bg-audio" loop>
	<source id="audioSource" src="assets/audio/preview/01FINALLY.mp3" type="audio/mpeg">
</audio>
<div class="bg-movie">
	<img src="assets/images/backup.jpg" alt="mountain" id="video-backup">
	<video id="bg-video" class="background-video" loop muted playsinline>
		<source id="videoSource" src="assets/video/01FINALLY.mp4" type="video/mp4">
	</video>
	<div class="bg-topography">
		{@html topography}
	</div>
	<div class="video-overlay"></div>
</div>
<div class="header">
	<h1>{copy.title} <span>audio visualizer</span></h1>
	<div class="links-header">
		<!-- {#each copy.links as link, i}
			<a href="{link.url}">{@html icons[i]}</a>
		{/each} -->
		<button class="infoBtn" on:click={infoClick} >
			{#if infoVisible}
				<p>Close</p>
				<Icon name="x" width="1rem"/>
			{:else}
				<p>About</p>
				<Icon name="info" width="1rem"/>
			{/if}
		</button>
	</div>
</div>
<div class="album-container">
	<div class="refer">
		<p>Listen to the full album on</p>
		<ul>
			<li><span>{@html spotifyIcon}</span><a href="https://open.spotify.com/album/7dCZsnk1hRpFGTfNpFXKwT">Spotify</a></li>
			<li><span>{@html appleIcon}</span><a href="https://music.apple.com/ca/album/a-f-a-n-g-i-n-t-h-e-r-o-u-g-h/1775466296">Apple Music</a></li>
			<li><span class="icon">{@html bandcampIcon}</span><a href="https://anotherwild.bandcamp.com/album/a-f-a-n-g-i-n-t-h-e-r-o-u-g-h">Bandcamp</a></li>
			<li><span>{@html youtubeIcon}</span><a href="https://www.youtube.com/@anotherwild">YouTube</a></li>
		</ul>
	</div>
	{#each albumGroups as album}
		<Album data={album}/>
	{/each}
</div>
<footer>
	<p>{copy.copyright}</p>
	<div class="stamp">{@html stamp}</div>
</footer>

<style>
	.refer {
		width: 100%;
		margin: 0;
		padding: 2rem 1rem;
		background: rgba(165, 191, 182, 0.85);
		color: #151515;
		font-family: var(--sans);
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		gap: 0.5rem;
	}
	.refer p {
		font-size: var(--18px);
		margin: 0;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
	}
	.refer ul {
		list-style: none;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		gap: 0.75rem;
		padding: 0;
		margin: 0;
	}
	.refer li {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		gap: 0.25rem;
	}
	:global(.refer span) {
		display: inline-block;
		width: 1.5rem;
		height: 1.5rem;
	}
	:global(.refer a) {
		font-weight: 700;
	}
	:global(.refer a:hover) {
		opacity: 0.6;
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
	.infoBtn {
		background: rgba(255,255,255,0.95);
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		width: 4.25rem;
		padding: 0.5rem 0.5rem 0.5rem 0.75rem;
	}
	.infoBtn:hover {
		background: rgba(165, 191, 182, 0.95);
	}
	.links-header {
		display: flex;
		flex-direction: row;
		gap: 0.75rem;
		align-items: center;
	}
	:global(.links-header a) {
		width: 1.5rem;
		height: 1.5rem;
		color: #f1eeec;
		border-bottom: none;
	}
	:global(.links-header a:hover) {
		opacity: 0.8;
	}
	:global(.links-header a svg path) {
		fill: #f1eeec;
	}
	.infoBtn p {
		color: black;
		margin: 0 0.25rem 0 0;
		font-family: "Carnaby Street", var(--sans), sans;
		text-transform: uppercase;
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
	.header {
		width: 100%;
		height: 3.5rem;
		background-image: linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.9));
		/* backdrop-filter: blur(2px); */
		position: fixed;
		top: 0;
		left: 0;
		z-index: 1000;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		padding: 0 0.5rem;
		border-bottom: 1px solid #f1eeec;
	}
	h1 {
		margin: 0;
		font-family: var(--serif);
		text-transform: uppercase;
		color: #f1eeec;
		font-size: 20px;
		display: flex;
		flex-direction: row;
		align-items: center;
		gap: 0.5rem
	}
	h1 span {
		font-family: "Carnaby Street", var(--sans);
		letter-spacing: 0;
		font-size: var(--14px);
	}
	.header a {
		text-transform: uppercase;
	}
	.header a:hover {
		color: #A5BFB6;
	}
	.album-container {
		width: 100%;
		margin-top: 3.5rem;
		z-index: 999;
	}

	footer {
		width: 100%;
		height: 2rem;
		color: rgba(165, 191, 182, 1);
		padding: 0 0.5rem;
		font-size: 12px;
		font-family: var(--sans);
		opacity: 0.8;
		position: relative;
	}

	.stamp {
		position: absolute;
		right: 1rem;
		bottom: 1rem;
		transform: rotate(20deg);
		width: 100px;
		height: 100px;
	}
	@media(max-width: 700px) {
		.refer {
			flex-direction: column;
			padding: 1rem;
	   }
	}

	@media(max-width: 600px) {
       .header {
			flex-direction: column;
			gap: 0.5rem;
			height: 6rem;
			padding: 0.5rem;
			justify-content: center;
	   }

	   .album-container {
			margin-top: 6rem;
		}
		.stamp {
			width: 80px;
			height: 80px;
		}
    }

	@media(max-width: 500px) {
       h1 {
			font-size: 18px;
			letter-spacing: 0px;
	   }
	   h1 span {
		font-size: 12px;
	   }
	   .header p, .header a  {
			font-size: 12px;
	   }
	   .refer p, .refer li {
		font-size: var(--16px);
	   }
	   .refer li {
		font-size: var(--14px);
	   }
	   :global(.refer span) {
			width: 1.25rem;
			height: 1.25rem;
		}
		.stamp {
			width: 60px;
			height: 60px;
		}
    }

	@media(max-width: 500px) {
		.refer ul {
			flex-wrap: wrap;
		}
	}
</style>

