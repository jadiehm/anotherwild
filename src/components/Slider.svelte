<script>
    import { getContext, onMount } from "svelte";
    import Lyrics from "$components/Lyrics.svelte";
    import { currAboutSection } from "$stores/misc.js";
    export let infoVisible;

    const copy = getContext("copy");
    let scrollY = 0;
    let innerWidth = 0;

    function stripCharacters(string) {
        let stripped = string.replace(/[^A-Z0-9]/ig, '').toLowerCase();
        return stripped;
    } 

    function tabClick() {
        let id = (this.id).split("-")[1];
        currAboutSection.set(id)
    }

    $: console.log(scrollY);

    let notesArray = [copy.note0, copy.note1, copy.note2, copy.note3, copy.note4]

    let tabOptions = ["about this project", "lyrics"];

    $: translate = $currAboutSection == "aboutthisproject" || $currAboutSection == undefined
		? "translate(0vw, 0px)"
		: "translate(-96vw, 0px)";
</script>

<svelte:window bind:innerWidth={innerWidth} bind:scrollY={scrollY} />

<div class="slider-options">
    {#each tabOptions as option, i}
        {@const isActive = stripCharacters($currAboutSection) == stripCharacters(option) ? true : false}
        <button on:click={tabClick}
            id="tab-{stripCharacters(option)}"
            class:isActive={isActive}>
            {option}
        </button>
    {/each}
</div>
<section class="slider">
    <div class="slider-inner" style="transform:{translate};">
        <div id="notes" class="panel">
            {#each notesArray as note, i}
                <div class="page-wrapper" style="z-index: 1000">
                    {#if i == 0}
                        <div class="fake-page" class:scrolled={innerWidth < 700 ? scrollY > 600 : scrollY > 150}></div>
                        <div class="fake-page" class:scrolled={innerWidth < 700 ? scrollY > 600 : scrollY > 150}></div>
                        <div class="fake-page" class:scrolled={innerWidth < 700 ? scrollY > 600 : scrollY > 150}></div>
                        <div class="fake-page" class:scrolled={innerWidth < 700 ? scrollY > 600 : scrollY > 150}></div>
                    {/if}
                    <div class="page" style="transform: rotate(0.5deg)">
                        {#each note as graf, i}
                            <p>{@html graf.value}</p>
                        {/each}
                    </div>
                </div>
            {/each}
        </div>
        <div id="lyrics" class="panel">
            <Lyrics />
        </div>
    </div>
</section>

<style>
    section {
        width: 100%;
        z-index: 1000;
        display: flex;
        flex-direction: row;
        justify-content: start;
        font-family: var(--serif);
        color: #f1eeec;
    }

    .slider-inner {
        transform: translate(0vw, 0px);
		width: 300vw;
		display: flex;
		transition: transform 0.5s;
    }

    .slider-options {
        display: flex;
        flex-direction: row;
        gap: 1rem;
        color: #f1eeec;
        font-family: "Carnaby Street";
        text-transform: uppercase;
        font-size: var(--14px);
        font-weight: bold;
    }

    .panel {
        border: 1px solid red;
    }

    #notes, #lyrics {
        width: 96vw;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 2rem;
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