<script lang="ts">
    import { TextDiff } from '$lib/components/text-diff';
</script>

<svelte:head>
    <title>Text Diff - Svelte 5 Implementation</title>
    <meta name="description" content="Text diff comparison tool built with Svelte 5 and runes" />
</svelte:head>

<div class="container mx-auto py-8">
    <div class="mb-8">
        <h1 class="mb-2 text-3xl font-bold">Text Diff Tool</h1>
        <p class="text-muted-foreground">
            Compare text files and strings with side-by-side comparison and character-level
            highlighting.
        </p>
    </div>

    <TextDiff />
</div>

<style>
    :global(.text-diff-container) {
        height: calc(100vh - 12rem);
        min-height: 600px;
    }
</style>
