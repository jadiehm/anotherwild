<script>
	import { setContext } from "svelte";
	import { browser } from "$app/environment";
	import Meta from "$components/Meta.svelte";
	import Index from "$components/Index.svelte";
	import copy from "$data/copy.json";
	import story from "$data/adbd.json";
	import version from "$utils/version.js";

	export let data;

	version();

	const preloadFont = [
		"https://afangintherough.com/assets/fonts/hoefler-text.woff2",
		"https://afangintherough.com/assets/fonts/hoefler-text-bold.woff2"
	];

	const { title, description, url, keywords } = copy;
	setContext("copy", copy);
	setContext("story", story);
	setContext("data", data.data);
</script>

<Meta {title} {description} {url} {preloadFont} {keywords} />
<Index />
