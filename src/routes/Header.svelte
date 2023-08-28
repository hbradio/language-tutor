<script>
	import { page } from '$app/stores';
</script>

<header>
	<div class="status">
		<p class="nojs-show loaded">
			{#if $page.data.session}
				{#if $page.data.session.user?.image}
					<span style="background-image: url('{$page.data.session.user.image}')" class="avatar" />
				{/if}
				<p class="signedInText">
					<strong>{$page.data.session.user?.email ?? $page.data.session.user?.name}</strong>
				</p>
				<p>{$page.data.user.credits} credits remaining. <a href="/buy" class="button" data-sveltekit-preload-data="off">Buy more</a></p>
				<p><a href="/auth/signout" class="button" data-sveltekit-preload-data="off">Sign out</a></p>
			{:else}
				<a href="/auth/signin" class="buttonPrimary" data-sveltekit-preload-data="off">Sign in</a>
			{/if}
		</p>
	</div>
</header>

<style>
	.avatar {
		border-radius: 2rem;
		float: left;
		height: 2.8rem;
		width: 2.8rem;
		background-color: white;
		background-size: cover;
		background-repeat: no-repeat;
		margin: 1rem;
	}
				

	p {
		line-height: 0.8;
	}
	.status {
		margin: 1rem;
	}

	header {
		padding: 2rem;
	}
</style>
