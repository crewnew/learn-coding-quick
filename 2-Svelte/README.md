# SvelteKit

## Components

Everything exists inside a component. The component has three optional parts; <script>, which contains Javascript, <style> which contains CSS, and finally some HTML, which is able to use the JS from the <script> tag.

```svelte
<script>
    let say = 'hi';
</script>

<div>
    Say: {say}
</div>

<style>
    div {
        color: red;
    }
</style>
```

### Importing / Exporting

`import Face from "./Face.svelte";` - the export keyword allows other components to change components on import:

```svelte
<script>
    export let size;
</script>

<div style="font-size: {size}em">=)</div>
```

## Slots

Slots allow us to place elements inside components. For example, inserting a `<slot>` into a `<div>` with the class Container allows us to place as many elements as we want into the `<Container>` component:

```svelte
<div class="Container">
  <slot />
</div>
```

The newly-placed elements are children of the component:

```svelte
<Container>
  <div>Say: {say}</div>

  <Face index={0} /> <!-- passing integer requires {} around -->
  <Face /> <!-- passing no props -->
  <Face index={2} />
</Container>
```

## If/else

```svelte
<script>
	let x = 7;
</script>

{#if x > 10}
	<p>{x} is greater than 10</p>
{:else if 5 > x}
	<p>{x} is less than 5</p>
{:else}
	<p>{x} is between 5 and 10</p>
{/if}
```

[Try>>](https://svelte.dev/examples/else-if-blocks)

## Each

Show all the items in array:

```svelte
<script>
	let things = ['darkblue', 'indigo', 'deeppink', 'salmon', 'gold'];
</script>

{#each things as thing}
	{thing}
{/each}
```

Keyed eachk blocks allow for example, to remove the item from the array. Key must be unique.

```svelte
<script>
	let things = [
		{ id: 1, color: 'darkblue' },
		{ id: 2, color: 'indigo' },
		{ id: 3, color: 'deeppink' },
		{ id: 4, color: 'salmon' },
		{ id: 5, color: 'gold' }
	];

	function handleClick() {
		things = things.slice(1);
	}
</script>

<button on:click={handleClick}> Remove first thing </button>

{#each things as thing (thing.id)}
	{thing.color}
{/each}
```

[Try>>](https://svelte.dev/examples/keyed-each-blocks)

Also, index can be used: `{#each expression as name, index}...{/each}` or index and the key: `{#each expression as name, index (key)}...{/each}`