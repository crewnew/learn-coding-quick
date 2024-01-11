# SvelteKit

SvelteKit is a powerful "framework" (well, actually compiler so much faster than React, Angular or Vue) for apps that brings together the simplicity of Svelte's component-based approach with advanced features for routing, server side rendering (SSR), etc. Max power, max simplicity, max speed. Svelte works like my brain works!

## File structure

By the way code written in different files will be executed in order of (1) number in front:

### Server side

API requests, access filesystem, private environment variables, access secure cookies, etc. All the private stuff must be in the server for security reasons.

(1) +hook.server.js - load data for every page
(3) +layout.server.js - for every child route under directory hierarchy
(?) +server.js - API only (no need for +page.svelte). ? = runs whenever called. If called from +hook.server.js then (1) but if called from . Maybe called from some other app at all.
(6) +page.server.js - load data and handle page's request

## Server & client side
Runs in both server and in browser unless SSR turned off `export const ssr = false`

(2) +hook.js - common JS for every page 
(4) +layout.js - common JS for every child route under directory hierarchy
(7) +page.js - page related

### Client side

(5) +layout.svelte - share common JS using </slot>
(8) +page.svelte - content

In +page.svelte first runs everything between `<script>` tags

## Components

Everything exists inside a component. The component has three optional parts; <script>, which contains Javascript, <style> which contains CSS, and finally some HTML, which is able to use the JS from the <script> tag.

```svelte
<script>
    let say = 'hi';
	let htmlContent = '<p>Some stuff</p>'
</script>

<div>
    Say: {say}
	<div>{@html htmlContent}</div> <!-- Note: we need @html if we want to display HTML -->
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

## Svelte reactivity (rective declarations)

Super simple, stuff: just use `$:` in front of the variable and it will be reactive. Eg.:

```svelte
<script>
	let peopleCount = 0;

	// the `$:` means 're-run whenever these values change'. Test the code out and see how values change in real time!
	$: moneyEarned = peopleCount * 15.99;
	
	function newVisitor() {
		peopleCount++
	}
</script>

<button on:click={newVisitor}>
	New visitor
</button>

<p>We have: {moneyEarned}€</p>
```

## Load function

[Svelte doc](https://kit.svelte.dev/docs/load): Before a +page.svelte component (and its containing +layout.svelte components) can be rendered, we often need to get some data. This is done by defining load functions.

### +page.server.js or in +page.js

`+page.js` and `+layout.js` files export universal load functions that run both on the server and in the browser. `+page.server.js` and `+layout.server.js` files export server load functions that only run server-side!

```javascript
export function load({ url, params, props, fetch, session, stuff, status, error }) { // or "export async function load() { ... }" for non-blocking code
	// Do some stuff. Eg. fetch data from APIs and do some whatever custom business logic before returning the data to the +page.svelte component
	// Eg. let's say we got data from API into apiData variable
	const apiData = 'boooo';

	return {		
		apiData, slug: params.slug	
	}
}
```

Now in +page.svelte we can use the data:

```svelte
<script>
	export let data;
	console.log(data.apiData);
</script>

<p>Slug is: {data.slug}</p>
```

## Svelte actions

TODO

## Svelte stores

TODO

## Built-in stores

### Access route

```javascript
import { page, navigating, updated } from '$app/stores';
// $page.url.pathname
// $navigating.to.url.pathname
```

## Dynamic components

```svelte
<script>
	export let data;
</script>

<svelte:component this={data.component} message={data.message} />
```

## Cookies

### Set cookie

```javascript
export function load({ cookies }) {
	const visited = cookies.get('visited');
	cookies.set('visited', 'true', { path: '/' });
	return {
		visited
	};
}
```

### Get cookie

TODO

## Redirect

## Server side

```javascript
import { redirect } from '@sveltejs/kit';

export function load() {
	throw redirect(307, '/b');
}

// 303 — for form actions, following a successful submission
// 307 — for temporary redirects
// 308 — for permanent redirects

export function handleLoginRedirect(
	event,
	message = "You must be logged in to access this page"
) {
	const redirectTo = event.url.pathname + event.url.search
	return `/login?redirectTo=${redirectTo}&message=${message}`
}

export const load = async (event) => {
	if (!event.locals.user) {
		throw redirect(302, handleLoginRedirect(event))
	}
}
```

## Client side

```svelte
<script>
import { goto } from '$app/navigation';

function fireEmployee() {
        goto('/badZone/firing');
}
</script>

<button on:click={fireEmployee}>Fire employee</button>
<button on:click={() => goto('/auth/logout')}>Logout</button>
```

## Dynamic routes

Eg. `src/routes/[[lang]]/+page.server.js`:

```javascript
const greetings = {
	en: 'hello!',
	de: 'hallo!',
	fr: 'bonjour!'
};
export function load({ params }) {
	return {
		greeting: greetings[params.lang ?? 'en']
	};
}
```

### Route regular expression match

```javascript
// src/params/hex.js
export function match(value) {
	return /^[0-9a-f]{6}$/.test(value);
}
```

### Routing group

If some routes need auth for example then add the subfolder for pages under (authed). Eg. `/src/routes/(authed)/+layout.server.js`:

```javascript
import { redirect } from '@sveltejs/kit';
export function load({ cookies, url }) {
	if (!cookies.get('logged_in')) {
		throw redirect(303, `/login?redirectTo=${url.pathname}`);
	}
}
// src/routes/(authed)/+layout.svelte
<form method="POST" action="/logout">
	<button>Log out</button>
</form>
// src/routes/login/+page.server.js
export const actions = {
	default: ({ cookies, url }) => {
		cookies.set('logged_in', 'true', { path: '/' });
		throw redirect(303, url.searchParams.get('redirectTo') ?? '/');
	}
};
// src/routes/logout/+page.server.js
export const actions = {
default: ({ cookies }) => {
	cookies.delete('logged_in', { path: '/' });
	throw redirect(303, '/');
	}
};
```

## Hooks (middleware)

Intercept and override the framework's default behavior. Run very first and affect every single route.

### Intercepting pages

Eg. hooks.server.js:

```javascript
export async function handle({ event, resolve }) {
	// do something in event
	
	// access the page.server.js
	let response = await resolve(event);
	
	// do something in response
	return response;
}
```

### Intercepting fetches

Eg. can be used to make credentialed requests on the server:

```javascript
export async function handleFetch({ event, request, fetch }) {
	const url = new URL(request.url);
	if (url.pathname === '/a') {
		return await fetch('/b');
	}
	return await fetch(request);
}
export async function load({ fetch }) {
	const response = await fetch('/a');  // <-- intercepted fetch
	return {
		message: await response.text()
	};
}
```

## Link options (Preloading)

```html
<a href="/slow-a" data-sveltekit-preload-data>slow-a</a>
```

SvelteKit will begin the navigation as soon as the user hovers over the link (on desktop) or taps it (on mobile). The page will be ready to display as soon as the user clicks or taps.

"eager" — preload everything on the page following a navigation
"viewport" — preload everything as it appears in the viewport
"hover" (default) as above
"tap" — as above
"off" — as above

### Preloading programmatically

```javascript
import { preloadCode, preloadData } from '$app/navigation';
// preload the code and data needed to navigate to /foo
preloadData('/foo');
// preload the code needed to navigate to /bar, but not the data
preloadCode('/bar');
```

### Reloading

SvelteKit is holding the page Snapshots even switch pages to disable this behaviour. You can do so by adding the data-sveltekit-reload attribute on an individual link

```html
<nav data-sveltekit-reload>
	<a href="/">home</a>
	<a href="/about">about</a>
</nav>
```

## Layout break

Eg. `/src/routes/a/b/c/+page.svelte` inherits four layouts:

src/routes/+layout.svelte
src/routes/a/+layout.svelte
src/routes/a/b/+layout.svelte
src/routes/a/b/c/+layout.svelte

But now rename it to `+page@[level].svelte` and it would put the page inside `/routes/.../[level]` folder.

## Manual invalidation/dependency

```javascript
export async function load({ fetch, depends }) {
    // load reruns when `invalidate('https://api.example.com/random-number')` is called...
    const response = await fetch('https://api.example.com/random-number');
    // ...or when `invalidate('app:random')` is called
    depends('app:random');
    return {
        number: await response.json()
    };
}
<script>
    import { invalidate, invalidateAll } from '$app/navigation';
    /** @type {import('./$types').PageData} */
    export let data;
    function rerunLoadFunction() {
        // any of these will cause the `load` function to re-run
        invalidate('app:random');
        invalidate('https://api.example.com/random-number');
        invalidate(url => url.href.includes('random-number'));
        invalidateAll();
    }
</script>
```

### When do load functions re-run?

* It references a property of params whose value has changed
* It references a property of url (such as url.pathname or url.search) whose value has changed. Properties in request.url are not tracked
* It calls await parent() and a parent load function re-ran
* It declared a dependency on a specific URL via fetch (universal load only) or depends, and that URL was marked invalid with invalidate(url)
* All active load functions were forcibly re-run with invalidateAll() params and url can change in response to a <a href=".."> link click, a <form> interaction, a goto invocation, or a redirect.

Re-running a load function will update the data prop inside the corresponding `+layout.svelte` or `+page.svelte`; it does not cause the component to be recreated. As a result, internal state is preserved. If this isn't what you want, you can reset whatever you need to reset inside an afterNavigate callback, and/or wrap your component in a `{#key ...}` block.

## Environment variables

$env/static/public
$env/dynamic/public

The static in $env/static/private indicates that these values are known at build time, and can be statically replaced.

Static variables get replaced at build time and dynamic variables get replaced at runtime. Static variables allow compile-time computations which can give better performance - e.g. if they're used in an if condition which contains expensive code inside such as a dynamic import. But for the most part the question is really just about when you want to set the variable - buildtime or runtime.

## Locals

The interface that defines event.locals, which can be accessed in hooks (handle, and handleError), server-only load functions, and +server.js files.

`interface Locals {}`

```javascript
import { afterNavigate } from '$app/navigation'
// if we came from /posts, we will use history to go back to preserve
let canGoBack = false
  afterNavigate(({ from }) => {
    if (from && from.url.pathname.startsWith('/posts')) {
      canGoBack = true
    }
  })
  function goBack() {
    if (canGoBack) {
      history.back()
    }
  }
```