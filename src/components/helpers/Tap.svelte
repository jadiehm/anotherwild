<script>
	import ChevronLeft from "lucide-svelte/icons/chevron-left";
	import ChevronRight from "lucide-svelte/icons/chevron-right";
	import { createEventDispatcher } from "svelte";

	export let debug = false;
	export let enableKeyboard = false;
	export let full = false;
	export let showArrows = false; // boolean or array of directions
	export let disable = [];
	export let directions = ["left", "right"];
	export let size = "2.5rem";
	export let arrowSize = "48px";
	export let arrowStroke = "#000";
	export let arrowStrokeWidth = "2";
	export let arrowPosition = "center"; // start, center, end
	export let activeFolder;
	export let lettersLen;
	export let activeChapter;
	export let chaptersLen;

	const dispatch = createEventDispatcher();
	let innerHeight;

	$: getW = (dir) =>
		Array.isArray(size) ? size[directions.indexOf(dir)] : full ? "100%" : size;
	$: getH = (dir) =>
		["up", "down"].includes(dir) ? size : full ? "100%" : size;

	$: onKeyDown = (e) => {
		const dir = e.key.replace("Arrow", "").toLowerCase();
		const hasDir = directions.includes(dir);
		if (enableKeyboard && hasDir) {
			e.preventDefault();
			dispatch("tap", dir);
		}
	};

	$: visibleArrows = directions.filter((d) =>
		typeof showArrows === "boolean" ? showArrows : showArrows.includes(d)
	);
</script>

<svelte:window on:keydown={onKeyDown} bind:innerHeight />

<section class:debug style="height: {innerHeight}px;">
	<button
		on:click={() => dispatch("tap", "left")}
		style="width: {getW("left")}; height: {getH("left")};"
		aria-label={"left"}
		class="{"left"} {arrowPosition}"
		class:full
		disabled={activeFolder == 0 || activeChapter == 0}
	>
		<ChevronLeft color={arrowStroke} strokeWidth={arrowStrokeWidth} />
	</button>
	<button
		on:click={() => dispatch("tap", "right")}
		style="width: {getW("right")}; height: {getH("right")};"
		aria-label={"right"}
		class="{"right"} {arrowPosition}"
		class:full
		disabled={activeFolder == lettersLen-1 || activeChapter == chaptersLen-1}
	>
		<ChevronRight color={arrowStroke} strokeWidth={arrowStrokeWidth} />
	</button>
</section>

<style>
	section {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100%;
		z-index: var(--z-overlay);
		pointer-events: none;
	}

	button {
		position: absolute;
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
		background: var(--fang-light);
		border-radius: 3px;
		outline: none;
		box-shadow: none;
		pointer-events: auto;
		display: flex;
		transition: all 0.5s ease;
		border: 2px solid var(--fang-dark);
	}

	button:disabled {
		opacity: 0.2;
		cursor: not-allowed;
		pointer-events: none;
	}

	button:hover {
		opacity: 0.8;
	}

	:global(.left span svg path, .right span svg path) {
		fill: none;
	}

	.left {
		left: 1rem;
		top: 0;
		/* text-align: left; */
	}

	.right {
		right: 1rem;
		top: 0;
		/* text-align: right; */
	}

	button.left:hover {
		transform: translate(-4px, -50%);
	}

	button.right:hover {
		transform: translate(4px, -50%);
	}

	.left.start,
	.right.start {
		align-items: flex-start;
	}

	.left.center,
	.right.center {
		top: 50%;
		transform: translateY(-50%);
	}

	.left.end,
	.right.end {
		bottom: 0;
		top: auto;
	}

	.up {
		top: 0;
		left: 0;
		/* text-align: center; */
	}

	.down {
		bottom: 0;
		left: 0;
		/* text-align: center; */
	}

	.up.center,
	.down.center {
		left: 50%;
		transform: translateX(-50%);
	}

	.up.end,
	.down.end {
		right: 0;
		left: auto;
	}

	/* full positions */
	.full.left.start,
	.full.right.start {
		align-items: flex-start;
	}

	.full.left.center,
	.full.right.center {
		align-items: center;
	}

	.full.left.end,
	.full.right.end {
		align-items: flex-end;
	}

	.full.up.start,
	.full.down.start {
		justify-content: flex-start;
	}

	.full.up.center,
	.full.down.center {
		justify-content: center;
	}

	.full.up.end,
	.full.down-end {
		justify-content: flex-end;
	}

	span {
		display: inline-block;
		line-height: 1;
	}

	.debug .left {
		background: red;
		opacity: 0.5;
	}

	.debug .right {
		background: red;
		opacity: 0.5;
	}

	.debug .up {
		background: orange;
		opacity: 0.5;
	}

	.debug .down {
		background: orange;
		opacity: 0.5;
	}
</style>
