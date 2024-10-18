<script>
	import "$styles/app.css";
	import Header from "$components/Header.svelte";
	import { onMount } from 'svelte';

	onMount(() => {
    if (typeof window !== 'undefined') {
      // Replace 'G-XXXXXXX' with your Google Analytics ID
      (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
      (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
      m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
      })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

      ga('create', 'G-SW8YQCTVCN', 'auto');
      ga('send', 'pageview');
    }
  });
</script>

<svelte:head>
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-SW8YQCTVCN"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-SW8YQCTVCN');
  </script>
</svelte:head>

<main id="content">
	<slot />
</main>
