<script lang="ts">
    import { mode, toggleMode } from 'mode-watcher';
    import { useSidebar } from '$lib/components/ui/sidebar/index.js';
    import SunIcon from '@lucide/svelte/icons/sun';
    import MoonIcon from '@lucide/svelte/icons/moon';
    import { Button } from '$lib/components/ui/button/index.js';

    const sidebar = useSidebar();

    const isCollapsed = $derived(sidebar.state === 'collapsed' && !sidebar.isMobile);
    const currentLabel = $derived(mode.current === 'light' ? 'Light' : 'Dark');
</script>

{#if isCollapsed}
    <Button
        variant="ghost"
        size="icon"
        onclick={toggleMode}
        class="h-8 w-8"
        aria-label="Current theme: {currentLabel}. Click to toggle theme."
    >
        {#if mode.current === 'light'}
            <SunIcon class="h-4 w-4" />
        {:else}
            <MoonIcon class="h-4 w-4" />
        {/if}
    </Button>
{:else}
    <Button
        variant="ghost"
        size="default"
        onclick={toggleMode}
        class="w-full justify-start"
        aria-label="Current theme: {currentLabel}. Click to toggle theme."
    >
        {#if mode.current === 'light'}
            <SunIcon class="mr-2 h-4 w-4" />
        {:else}
            <MoonIcon class="mr-2 h-4 w-4" />
        {/if}
        {currentLabel}
    </Button>
{/if}
