<script>
    import { getContext, onMount } from "svelte";
    import spotifyIcon from "$svg/spotify.svg";
    import appleIcon from "$svg/itunes.svg";
    import bandcampIcon from "$svg/bandcamp.svg";
    import instagramIcon from "$svg/instagram.svg";
    import youtubeIcon from "$svg/youtube.svg";
    import stamp from "$svg/stamp.svg";
    import topography from "$svg/topography.svg";
    import { aboutVisible } from "$stores/misc.js";
    import * as d3 from "d3";

    const copy = getContext("copy");
    const icons = [spotifyIcon, appleIcon, bandcampIcon, youtubeIcon, instagramIcon];
    let mounted = false;

    onMount(() => {
        mounted = true;
    });

    $: if ($aboutVisible && mounted) {
        const topoPaths = d3.selectAll(".bg-topography svg path");
        d3.shuffle(topoPaths).each(function (d, i) {
            const path = d3.select(this);
            const length = this.getTotalLength();

            path.attr("stroke-dasharray", length)
                .attr("stroke-dashoffset", length)
                .transition()
                .delay(i * 100)
                .duration(3000)
                .ease(d3.easeLinear)
                .attr("stroke-dashoffset", 0);
        });
    }
</script>

<section class="info" class:aboutVisible={$aboutVisible}>
    <div class="bg-topography">
        {@html topography}
    </div>
    <div class="inner">
        <div class="left">
            <div class="photo-wrapper">
                <img 
                    src="assets/images/portrait.jpg" 
                    alt="A double exposure portrait of Noah Fagan against trees and a sky" />
                <img 
                    class="album-img" 
                    src="assets/images/LADDER.jpg" 
                    alt="Album artwork for LADDER" />
                <div class="stamp">{@html stamp}</div>
            </div>
            <span class="caption">{@html copy.caption}</span>
        </div>
        <div class="right">
            {#each copy.about as graf}
                <p>{@html graf.value}</p>
            {/each}
            <hr />
            {#each copy.about2 as graf}
                <p>{@html graf.value}</p>
            {/each}
            <ul class="links">
                <li class="lead-in">Find them on</li>
                {#each copy.links as link, i}
                    <li>
                        <span class="icon">{@html icons[i]}</span>
                        <a href="{link.url}">{link.name}</a>
                    </li>
                {/each}
            </ul>
            <p class="copyright">{@html copy.copyright}</p>
        </div>
    </div>
</section>

<style>
    .bg-topography {
		position: absolute;
		width: 100%;
		height: 100vh;
		top: 0;
		left: 0;
		z-index: 1;
		opacity: 0.1;
		transform: scale(4);
        pointer-events: none;
	}
	:global(.bg-topography svg path) {
		fill: none;
		stroke: #f1eeec;
		stroke-width: 0.5px;
	}
    section {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        z-index: 999;
        height: 100svh;
        overflow-y: auto;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding-top: 4rem;
        transform: translateY(100%);
        transition: transform 500ms linear;
        font-family: var(--serif);
        color: var(--fang-light);
        overflow-x: hidden;
    }

    section.aboutVisible {
        transform: translateY(0);
    }

    .inner {
        width: 100%;
        max-width: 900px;
        display: flex;
        flex-direction: row;
        gap: 5rem;
        padding: 3rem;
    }
    .left, .right {
        width: 50%;
    }

    .right, .right a, .right p {
        color: var(--fang-light);
    }

    .right p {
        font-size: 20px;
    }

    :global(.expand) {
        font-weight:700;
        text-transform: uppercase;
        letter-spacing: 3px;
    }

    .left img {
        width: 100%;
        aspect-ratio: 1/1.508;
        margin-bottom: 0.25rem;
        transition: filter 0.3s ease;
    }

    .left span, .left a {
        color: var(--fang-light);
    }
    .photo-wrapper {
        position: relative;
        width: 100%;
    }
    .album-img {
        position: absolute;
        top: -1.75rem;
        right: -1.75rem;
        width: 40% !important;
        aspect-ratio: 1/1 !important;
        border: 5px solid var(--fang-dark);
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
        font-family:  var(--mono);
        font-weight: 700;
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
        fill: var(--fang-light);
    }
    .caption, .copyright {
        font-family:  var(--mono);
        font-size: 14px !important;
        font-weight: 700;
    }
    :global(.caption a, .copyright a) {
       color: var(--fang-light); 
    }

    :global(.info a:hover, .right .links li a:hover) {
        color: var(--fang-accent);
    }
    :global(.links .icon svg path) {
        fill: var(--fang-light);
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
            padding: 4.5rem 2.5rem 2rem 2.5rem;
            align-items: center;
        }
        .left, .right {
            width: 100%;
            max-width: 400px;
        }
    }

    @media(max-width: 500px) {
        .right p {
            font-size: 18px;
        }
        caption, .links .lead-in, .copyright {
            font-size: var(--12px) !important;
        }
        .links p {
            font-size: var(--16px);
        }
    }
</style>