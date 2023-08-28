<script lang="ts">
    import type { PageData } from './$types'
  
    export let data: PageData
    const { post } = data
  </script>
  
  <div class="page">
    <main>
      <a href="/">Back</a>
      <h2>{post.title}</h2>
      <div>
        {@html post.content}
      </div>
      <form method="post" class="actions">
          <button formaction="?/deletePost">Delete</button>
      </form>
    </main>
  </div>
  
  <style>
    .page {
      padding: 2rem;
    }
  
    .actions {
      margin-top: 2rem;
    }
  
    button {
      padding: 1rem 2rem;
    }
  
    button + button {
      margin-left: 1rem;
    }
  </style>