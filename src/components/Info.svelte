<script>
    import Icon from "$components/helpers/Icon.svelte";
    import SpotifyIcon from "$svg/spotify.svg";
    import BCIcon from "$svg/bandcamp.svg";
    export let infoVisible;
</script>

<section class="info" class:infoVisible={infoVisible}>
    <div class="inner">
        <div class="left">
            <img src="assets/images/portrait.jpg" alt="a double exspoure portait of Noah Fagan against trees and a sky" />
            <caption>Photo by <span><a href="https://www.instagram.com/grantwlowe/"> Grant W. Lowe</a></span></caption>
        </div>
        <div class="right">
            <p>A Fang in the Rough is a concept album in 3 parts by Nashville artist Noah Fagan.</p>
            <div class="links">
                <p class="lead-in">Find them on</p>
                <p><Icon name="instagram" width="1.5rem"/> <a href="https://www.instagram.com/watercolorpony/">Instagram</a></p>
                <p><span class="icon">{@html SpotifyIcon}</span> <a href="">Spotify</a></p>
                <p><span class="icon">{@html BCIcon}</span> <a href="">Bandcamp</a></p>
            </div>
        </div>
    </div>
</section>

<style>
    section {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        z-index: 999;
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

    .links {
        margin: 4rem 0;
    }

    .links p {
        font-size: var(--24px);
        display: flex;
        flex-direction: row;
        align-items: center;
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

    caption {
        width: 100%;
        display: inline-block;
        text-align: left;
        color: rgba(255,255,255,0.8);
        font-size: var(--14px); 
        letter-spacing: 1px;
    }
    :global(caption a) {
        color: #f1eeec;
    }

    :global(caption a:hover, .links a:hover) {
        opacity: 0.8;
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