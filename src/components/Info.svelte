<script>
    import { getContext, onMount } from "svelte";
    import spotifyIcon from "$svg/spotify.svg";
    import appleIcon from "$svg/itunes.svg";
    import bandcampIcon from "$svg/bandcamp.svg";
    import instagramIcon from "$svg/instagram.svg";
    import youtubeIcon from "$svg/youtube.svg";
    import stamp from "$svg/stamp.svg";
    import inView from "$actions/inView.js";
    import { fly } from 'svelte/transition';
    import { sineInOut } from 'svelte/easing';
    export let infoVisible;

    const copy = getContext("copy");

    const icons = [spotifyIcon, appleIcon, youtubeIcon, instagramIcon];
    
    function getRandomRotation() {
        return Math.floor(Math.random() * (-2 - 2 + 1)) + 2;
    }

    let scrollY = 0;
    let innerWidth = 0;

    function handleScroll(event) {
        scrollY = event.target.scrollTop;
    }
</script>

<svelte:window bind:innerWidth={innerWidth} />

<section class="info" class:infoVisible={infoVisible} on:scroll={handleScroll}>
    <div class="inner">
        <div class="left">
            <div class="photo-wrapper">
                <img src="assets/images/portrait.jpg" alt="a double exspoure portait of Noah Fagan against trees and a sky" />
                <img class="album-img" src="assets/images/LADDER.jpg" alt="a double exspoure portait of Noah Fagan against trees and a sky" />
                <div class="stamp">{@html stamp}</div>
            </div>
            <span class="caption">{@html copy.caption}</span>
        </div>
        <div class="right">
            <p>{@html copy.about}</p>
            <ul class="links">
                <li class="lead-in">Find them on</li>
                <li><span class="icon">{@html bandcampIcon}</span><a href="https://anotherwild.bandcamp.com/album/a-f-a-n-g-i-n-t-h-e-r-o-u-g-h">Bandcamp</a></li>
                <!-- {#each copy.links as link, i}
                    <li><span class="icon">{@html icons[i]}</span><a href="{link.url}">{link.name}</a></li>
                {/each} -->
            </ul>
        </div>
    </div>
    <div class="note">
        <p class="lead-in">About the project</p>
    
        <!-- Page 0 -->
        <div class="page-wrapper" style="z-index: 1000">
                <div class="fake-page" class:scrolled={innerWidth < 700 ? scrollY > 600 : scrollY > 150}></div>
                <div class="fake-page" class:scrolled={innerWidth < 700 ? scrollY > 600 : scrollY > 150}></div>
                <div class="fake-page" class:scrolled={innerWidth < 700 ? scrollY > 600 : scrollY > 150}></div>
                <div class="fake-page" class:scrolled={innerWidth < 700 ? scrollY > 600 : scrollY > 150}></div>
                <div class="page page-start" style="transform: rotate(0deg)">
                    {#each copy.note0 as graf, i}
                        <p class="center-itals">{@html graf.value}</p>
                    {/each}
                </div>
        </div>

        <!-- Page 1 -->
        <div class="page-wrapper">
            <div class="page" style="transform: rotate(0.5deg)">
                {#each copy.note2 as graf, i}
                    <p>{@html graf.value}</p>
                {/each}
            </div>
        </div>
    
        <!-- Page 2 -->
        <div class="page-wrapper">
                <div class="page" style="transform: rotate(-0.5deg)">
                    {#each copy.note2 as graf, i}
                        <p>{@html graf.value}</p>
                    {/each}
                </div>
        </div>
    
        <!-- Page 3 -->
        <div class="page-wrapper">
                <div class="page" style="transform: rotate(1deg)">
                    {#each copy.note3 as graf, i}
                        <p>{@html graf.value}</p>
                    {/each}
                </div>
        </div>
    
        <!-- Page 4 -->
        <div class="page-wrapper">
                <div class="page" style="transform: rotate(0.5deg)">
                    {#each copy.note4 as graf, i}
                        <p>{@html graf.value}</p>
                    {/each}
                </div>
        </div>
    </div>
</section>

<style>
    section {
        position: fixed;
        top: 3.5rem;
        left: 0;
        width: 100%;
        z-index: 1000;
        height: 100vh;
        overflow-y: auto;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: start;
        background: rgba(0,0,0,0.95);
        transform: translateX(100%);
        transition: transform 500ms linear;
        font-family: var(--serif);
        color: #f1eeec;
        padding: 3rem 2rem;
    }

    section.infoVisible {
        transform: translateX(0);
    }

    .inner {
        width: 100%;
        max-width: 900px;
        display: flex;
        flex-direction: row;
        gap: 3rem;
        margin-top: 0;
        padding: 1rem;
    }
    .note {
        width: 100%;
        font-family: var(--serif);
        margin: 5rem auto;
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 0 2rem;
    }
    .note .lead-in {
        font-size: var(--14px);
        font-family: "Carnaby Street";
        text-transform: uppercase;
    }
    .center-itals {
        font-style: italic;
        text-align: center;
    }
    .page-wrapper {
        position: relative;
        max-width: 660px;
        height: auto;
        width: 100%;
    }
    .fake-page {
        width: 100%;
        height: calc(100% - 2rem);
        position: absolute;
        background-color: #f1eeec;
        background-image: url("assets/images/bg_texture.png");
        background-size: 200px;
        background-repeat: repeat;
        border: 1px solid #dfd9d5;
        box-shadow: 0 -1px 1px rgba(0,0,0,0.15);
        z-index: 600;
        transition: all 0.125s ease-in;
    }
    .fake-page:first-of-type {
        left: 0rem;
        transform: rotate(-2deg);
    }
    .fake-page:nth-of-type(2) {
        left: 2rem;
        top: 1rem;
        transform: rotate(1deg);
    }
    .fake-page:nth-of-type(3) {
        left: 1rem;
        top: -0.5rem;
        transform: rotate(-1deg);
    }
    .fake-page:nth-of-type(3) {
        left: 1rem;
        top: 0rem;
        transform: rotate(2deg);
    }
    .fake-page.scrolled {
        left: 0;
        top: 1rem;
        transform: rotate(0deg);
    }
    .page {
        max-width: 660px;
        background-color: #f1eeec;
        color: #151515;
        padding: 3rem;
        margin: 1rem 0;
        background-image: url("assets/images/bg_texture.png");
        background-size: 200px;
        background-repeat: repeat;
        border: 1px solid #dfd9d5;
        box-shadow: 0 -1px 1px rgba(0,0,0,0.15);
        z-index: 1000;
        position: relative;
    }
    .expand-Btn {
        background: rgba(165, 191, 182, 1);
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		width: 6rem;
		padding: 0.5rem 0.5rem 0.5rem 0.75rem;
        color: black;
		font-family: "Carnaby Street", var(--sans), sans;
		text-transform: uppercase;
    }
    .left, .right {
        width: 50%;
    }

    .right, .right a, .right p {
        color: #f1eeec;
    }

    .right p {
        font-size: 24px;
    }

    .left img {
        margin-bottom: 0.25rem;
        transition: filter 0.3s ease;
    }

    .left span, .left a {
        color: #f1eeec;
    }
    .photo-wrapper {
        position: relative;
        width: 100%;
    }
    .album-img {
        position: absolute;
        top: -1.75rem;
        right: -1.75rem;
        width: 40%;
        aspect-ratio: 1;
        border: 5px solid black;
    }

    .links {
        margin: 4rem 0;
        display: flex;
        flex-direction: column;
        list-style: none;
        padding: 0;
    }

    .links li {
        font-size: var(--18px);
        display: flex;
        flex-direction: row;
        align-items: center;
        margin: 0;
        padding: 0.5rem 0;
    }

    .links a {
        margin-left: 0.5rem;
    }
    .links .lead-in {
        font-size: var(--14px);
        font-family: "Carnaby Street";
        text-transform: uppercase;
    }

    span.icon {
        width: 1.5rem;
        height: 1.5rem;
    }
    .stamp {
        position: absolute;
        left: -2rem;
        bottom: 1rem;
        width: 100px;
        height: 100px;
        transform: rotate(20deg);
    }
    :global(.stamp svg path) {
        fill: #f1eeec;
    }
    .caption {
        font-family: "Carnaby Street";
    }
    :global(.caption a) {
       color: #f1eeec; 
    }

    :global(.left a:hover, .right .links a:hover) {
        color: rgba(165, 191, 182, 0.95);
    }
    :global(.links .icon svg path) {
        fill: #f1eeec;
    }

    img:hover {
        filter: blur(2px);
    }

    @media(max-width: 800px) {
        .right p {
            font-size: 20px;
        }
    }

    @media(max-width: 700px) {
        .inner {
            flex-direction: column;
            padding: 2rem 1rem;
            align-items: center;
        }
        .left, .right {
            width: 100%;
            max-width: 400px;
        }
        .note {
            margin-top: 0;
            padding: 0;
        }
    }
    @media(max-width: 600px) {
        .page {
            padding: 1rem 2rem;
        }
        .page p {
            font-size: 14px;
        }

        .fake-page:first-of-type {
            left: 1.5rem;
            transform: rotate(-2deg);
        }
        .fake-page:nth-of-type(2) {
            left: 0.5rem;
            top: 1rem;
            transform: rotate(1deg);
        }
        .fake-page:nth-of-type(3) {
            left: 0rem;
            top: 0rem;
            transform: rotate(1deg);
        }
        .fake-page.scrolled {
            left: 0;
            top: 1rem;
            transform: rotate(0deg);
        }
    }

    @media(max-width: 500px) {
        .right p {
            font-size: 18px;
        }
        caption, .links .lead-in {
            font-size: var(--12px);
        }
        .links p {
            font-size: var(--16px);
        }
    }
</style>