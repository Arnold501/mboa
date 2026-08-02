<script lang="ts">
  import ArticleCard from './ArticleCard.svelte';
  let { posts } = $props();
</script>

<div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
  {#each posts as post (post._id)}
    <ArticleCard {post} />
  {/each}
</div>
