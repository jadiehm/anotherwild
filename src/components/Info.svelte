<script>
    import { getContext } from 'svelte';
    import spotifyIcon from "$svg/spotify.svg";
    import appleIcon from "$svg/itunes.svg";
    import instagramIcon from "$svg/instagram.svg";
    import youtubeIcon from "$svg/youtube.svg";
    export let infoVisible;

    const copy = getContext("copy");

    console.log(youtubeIcon)

    const icons = [spotifyIcon, appleIcon, youtubeIcon, instagramIcon];
</script>

<section class="info" class:infoVisible={infoVisible}>
    <div class="inner">
        <div class="left">
            <img src="assets/images/portrait.jpg" alt="a double exspoure portait of Noah Fagan against trees and a sky" />
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
</section>

<style>
    section {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        z-index: 1000;
        height: 100vh;
        overflow-y: auto;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        background: rgba(0,0,0,0.95);
        transform: translateX(100%);
        transition: transform 500ms linear;
        font-family: "Carnaby Street", var(--sans), sans;
        color: #f1eeec;
    }

    section.infoVisible {
        transform: translateX(0);
    }

    .inner {
        width: 100%;
        height: auto;
        max-width: 900px;
        display: flex;
        flex-direction: row;
        gap: 2rem;
        margin-top: 0rem;
        padding: 5rem 2rem;
    }

    .left, .right {
        width: 50%;
    }

    .right, .right a, .right p {
        color: #f1eeec;
    }

    .right p {
        font-size: var(--36px);
    }

    .left img {
        margin-bottom: 0.25rem;
    }

    .left span, .left a {
        color: #f1eeec;
    }

    .links {
        margin: 4rem 0;
        display: flex;
        flex-direction: column;
        list-style: none;
        padding: 0;
    }

    .links li {
        font-size: var(--24px);
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
        text-transform: uppercase;
    }

    span.icon {
        width: 1.5rem;
        height: 1.5rem;
    }
    :global(.caption a) {
       color: #f1eeec; 
    }

    :global(.left a:hover, .links a:hover) {
        opacity: 0.8;
    }
    :global(.links .icon svg path) {
        fill: #f1eeec;
    }

    @media(max-width: 700px) {
        .inner {
            flex-direction: column;
            margin-top: 6rem;
            padding: 2rem;
            height: 100%;
        }
        .left, .right {
            width: 100%;
            max-width: 400px;
        }
    }

    @media(max-width: 600px) {
        .inner {
            margin-top: 10rem;
        }
    }

    @media(max-width: 500px) {
        .right p {
            font-size: var(--24px);
        }
        caption, .links .lead-in {
            font-size: var(--12px);
        }
        .links p {
            font-size: var(--18px);
        }
    }
</style>