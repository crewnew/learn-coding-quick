## $page.data

`+page.svelte` and each `+layout.svelte` above it, has access to its own data plus all the data from its parents. But sometimes we may need the parent layout to access page data or data from a child. Eg. the layout need to access the `slug` property returned from a load function in `+page.server.js` or `+page.js`. This can be done with `$page.data`. So in `src/routes/+layout.svelte`:

```svelte
<script>
	import { page } from '$app/stores';
</script>

Slug: {$page.data.slug}
```

Doc: https://kit.svelte.dev/docs/types#app-pagedata