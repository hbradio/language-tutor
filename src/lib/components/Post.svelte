<script lang="ts">
	import { goto } from '$app/navigation';
	import type { PageData } from './$types';

	export let post: PageData;
</script>

<div class="post">
	<h2><a href={`/p/${post.id}`}>{post.title}</a></h2>
	<p>{@html post.content}</p>
</div>

<style>
	div {
		color: inherit;
	}
	.post {
		margin-top: 2rem;
	}
</style>
