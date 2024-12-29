<script>
    import { getContext, onMount } from "svelte";
    import Slider from "$components/Slider.svelte";

    import { notesVisible } from "$stores/misc.js";

    const copy = getContext("copy");
</script>

<section class="lyrics" class:notesVisible={$notesVisible}>
    <Slider />
</section>

<style>
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
        justify-content: center;
        transform: translateY(100%);
        transition: transform 500ms linear;
        font-family: var(--serif);
        color: #f1eeec;
        overflow: hidden;
    }

    section.notesVisible {
        transform: translateY(0);
    }
</style>