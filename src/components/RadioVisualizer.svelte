<script>
    import { getContext, onMount } from "svelte";
    import Album from "$components/Album.svelte";
    import { radioVisible } from "$stores/misc.js";

    import spotifyIcon from "$svg/spotify.svg";
    import appleIcon from "$svg/itunes.svg";
    import bandcampIcon from "$svg/bandcamp.svg";
    import youtubeIcon from "$svg/youtube.svg";
    import instagramIcon from "$svg/instagram.svg";

    import * as d3 from "d3";

    let width, height;

    const data = [
        { album: 1, title: "finally", id: "01FINALLY" },
        { album: 1, title: "rogue", id: "02ROGUE" },
        { album: 1, title: "theme (for homebody)", id: "03THEMEFORHOMEBODY" },
        { album: 1, title: "goldwave", id: "04GOLDWAVE" },
        { album: 1, title: "cold beach", id: "05COLDBEACH" },
        { album: 1, title: "and then", id: "06ANDTHEN" },
        { album: 2, title: "tanto", id: "07TANTO" },
        { album: 2, title: "black", id: "08BLACK" },
        { album: 2, title: "a (frame)", id: "09AFRAME" },
        { album: 2, title: "onward", id: "10ONWARD" },
        { album: 2, title: "driift", id: "11DRIIFT" },
        { album: 2, title: "go", id: "12GO" },
        { album: 3, title: "time", id: "13TIME" },
        { album: 3, title: "catch and release", id: "14CATCHANDRELEASE" },
        { album: 3, title: "mantra recital", id: "15MANTRARECITAL" },
        { album: 3, title: "summit", id: "16SUMMIT" },
        { album: 3, title: "prayer", id: "17PRAYER" },
        { album: 3, title: "holy", id: "18HOLY" }
    ];

    const albumGroups = d3.groups(data, d => d.album);

    onMount(() => {
        const video = document.querySelector('#bg-video');
        const backupPhoto = document.querySelector('#video-backup');

        video.addEventListener('canplay', () => {
            backupPhoto.style.display = 'none';
        });
    });
</script>

<svelte:window bind:innerWidth={width} bind:innerHeight={height} />

<div class="locked" class:radioVisible={$radioVisible}>
    <audio id="bg-audio" loop>
        <source id="audioSource" src="assets/audio/preview/01FINALLY.mp3" type="audio/mpeg" />
    </audio>
    <div class="bg-movie">
        <img 
            src="assets/images/backup.jpg" 
            alt="An old wooden desk with various objects" 
            id="video-backup" 
        />
        <video id="bg-video" class="background-video" loop muted playsinline>
            <source id="videoSource" src="assets/video/01FINALLY.mp4" type="video/mp4" />
        </video>
        <div class="video-overlay"></div>
    </div>
</div>

<section class="radio" class:radioVisible={$radioVisible}>
    <div class="album-container">
        {#each albumGroups as album}
            <Album data={album} />
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
		overflow-x: hidden;
	}

	.locked.radioVisible {
		transform: translateY(0);
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
		padding-top: 5rem;
		overflow-x: hidden;
	}

	section.radioVisible {
		transform: translateY(0);
	}

	.bg-movie {
		position: fixed;
		background: var(--fang-dark);
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
		transition: all 500ms linear;
	}

	.video-overlay {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: url("https://afangintherough.com/assets/images/bg-pattern-dark.png");
		opacity: 0.5;
	}

	@media (max-width: 600px) {
		section {
			padding-top: 4rem;
		}
	}
</style>