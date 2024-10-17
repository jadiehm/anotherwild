<script>
	export let title = "A F A N G I N T H E R O U G H";
	export let description = "A concept album in 3 parts by A N O T H E R W I L D";
	export let url = "https://afangintherough.com";
	export let keywords = "";
	export let preloadFont = [];
</script>

<svelte:head>
	<title>A F A N G I N T H E R O U G H</title>
	<meta name="description" content="A concept album in 3 parts by A N O T H E R W I L D" />
	<meta name="author" content="A N O T H E R W I L D" />
	<meta name="news_keywords" content={keywords} />

	<meta property="og:title" content="A F A N G I N T H E R O U G H" />
	<meta property="og:site_name" content="A N O T H E R W I L D" />
	<meta property="og:url" content={url} />
	<meta property="og:description" content="A concept album in 3 parts by A N O T H E R W I L D" />
	<meta property="og:type" content="article" />
	<meta property="og:locale" content="en_US" />

	<meta property="og:image" content="{url}/assets/social/social-facebook.jpg" />
	<meta property="og:image:type" content="image/jpeg" />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="600" />

	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:site" content="" />
	<meta name="twitter:creator" content="" />
	<meta name="twitter:title" content="A F A N G I N T H E R O U G H" />
	<meta name="twitter:description" content="A concept album in 3 parts by A N O T H E R W I L D" />
	<meta name="twitter:image:src" content="{url}/assets/social/social-twitter.jpg" />

	<meta name="robots" content="max-image-preview:large" />

	<link rel="canonical" href="{url}/" />

	{#each preloadFont as href}
		<link rel="preload" {href} as="font" type="font/woff2" crossorigin />
	{/each}
</svelte:head>
