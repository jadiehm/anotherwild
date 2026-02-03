<script>
    import { aboutVisible, folderVisible, radioVisible, notesVisible, viewfinderVisible, logsVisible, typewriterVisible, bckBtnVisible, modalVisible, audioEnabled } from "$stores/misc.js";
    import Icon from "$components/helpers/Icon.svelte";
    import * as d3 from "d3";

    let audioPhotoElement;

    function proceed(withAudio) {
        audioPhotoElement = d3.select('#photo-audio');

        if (withAudio && audioPhotoElement) {
            audioPhotoElement.node().play();
            audioEnabled.set(true);
        } else {
            audioEnabled.set(false);
        }
        // Handle proceeding with or without audio
        modalVisible.set(false);
        // Additional logic to enable/disable audio can be added here
    }
</script>

{#if $modalVisible}
<section class="audio-modal">
    <div class="inner-modal">
        <p>This experience uses audio.</p>
        <div class="btn-wrapper">
            <button on:click={() => proceed(true)}>Proceed with audio<Icon name="volume-2" width="2rem"/></button>
            <button on:click={() => proceed(false)}>Proceed muted<Icon name="volume-x" width="2rem"/></button>
        </div>
    </div>
</section>
{/if}

<style>
    .audio-modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        z-index: 1000;
        display: flex;
        align-items: center;
        justify-content: center;
        font-family: var(--mono);
        color: var(--fang-light);
        font-weight: 700;
        font-size: var(--18px);
    }

    .inner-modal {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 1rem;
    }

    .btn-wrapper {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 1rem;
    }

    button {
        position: relative;
        top: 0;
        font-family: var(--mono);
        font-weight: 700;
        text-transform: uppercase;
        font-size: var(--14px);
        line-height: 1;
        padding: 0.85rem 0.45rem 0.75rem 0.75rem;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.5s ease;
        background: var(--fang-accent);
        color: var(--fang-dark);
    }

    button:hover {
        opacity: 0.8 !important;
        top: -2px;
    }

    :global(.audio-modal button svg) {
        position: relative;
        top: -1px;
    }
</style>

