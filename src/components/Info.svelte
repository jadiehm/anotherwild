<script>
    import { getContext, onMount } from "svelte";
    import spotifyIcon from "$svg/spotify.svg";
    import appleIcon from "$svg/itunes.svg";
    import instagramIcon from "$svg/instagram.svg";
    import youtubeIcon from "$svg/youtube.svg";
    import stamp from "$svg/stamp.svg";
    export let infoVisible;

    const copy = getContext("copy");

    const icons = [spotifyIcon, appleIcon, youtubeIcon, instagramIcon];
</script>

<section class="info" class:infoVisible={infoVisible}>
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
                {#each copy.links as link, i}
                    <li><span class="icon">{@html icons[i]}</span><a href="{link.url}">{link.name}</a></li>
                {/each}
            </ul>
        </div>
    </div>
    <div class="note">
        <p class="lead-in">About the project</p>
        <div class="page">
            {#each copy.note1 as graf, i}
                <p>{graf.value}</p>
            {/each}
        </div>
        <div class="page">
            {#each copy.note2 as graf, i}
            <p>{graf.value}</p>
            {/each}
        </div>

        <div class="page">
            {#each copy.note3 as graf, i}
            <p>{graf.value}</p>
            {/each}
        </div>
        <div class="page">
            {#each copy.note4 as graf, i}
            <p>{graf.value}</p>
            {/each}
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
        padding: 3rem 1rem;
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
        max-width: 660px;
        font-family: var(--serif);
        margin: 5rem auto;
    }
    .note .lead-in {
        font-size: var(--14px);
        font-family: "Carnaby Street";
        text-transform: uppercase;
    }
    .page {
        background-color: #f1eeec;
        color: #151515;
        padding: 3rem;
        margin: 1rem 0;
        background-image: url("assets/images/bg_texture.png");
        background-size: 200px;
        background-repeat: repeat;
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
            align-items: center;
            margin-top: 10rem;
            padding: 3rem;
            height: 100%;
        }
        .left, .right {
            width: 100%;
            max-width: 400px;
        }
    }

    @media(max-width: 600px) {
        .inner {
            margin-top: 13rem;
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