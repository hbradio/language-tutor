<script lang="ts">
	import Post from '$lib/components/Post.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section>

	<h1>My Notes</h1>
	<div class="page">
		{#if data.user.credits > 0}
			<a href="/p">New note</a>
		{:else}
			<a href="/buy">Buy more credits to make new notes</a>
		{/if}
		<main>
			<div>
				{#each data.feed as post (post.id)}
					<Post {post} />
				{/each}
			</div>
		</main>
	</div>
</section>
