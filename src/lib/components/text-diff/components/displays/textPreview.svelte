<script lang="ts">
    import { cn } from '$lib/utils';
    import type { DiffResult, DiffStats, PreviewMode } from '../../engine/types';
    import DiffStatsDisplay from './diffStatsDisplay.svelte';
    import ModeControls from '../inputs/modeControls.svelte';
    import UnifiedView from '../views/unifiedView.svelte';
    import SplitView from '../views/splitView.svelte';

    interface Props {
        diffResults: DiffResult[];
        stats: DiffStats;
        className?: string;
    }

    let { diffResults, stats, className }: Props = $props();

    let previewMode = $state<PreviewMode>('split');
    let showOnlyChanges = $state(false);

    const filteredResults = $derived(
        diffResults.filter(result => !showOnlyChanges || result.type !== 'unchanged'),
    );
</script>

<div class={cn('bg-card flex h-full w-full flex-col overflow-hidden rounded-lg border', className)}>
    <div class="border-border/40 flex-shrink-0 border-b px-4 py-2">
        <div class="flex items-center justify-between">
            <div class="flex items-center gap-3">
                <DiffStatsDisplay {stats} {showOnlyChanges} />
            </div>

            <ModeControls
                {previewMode}
                {showOnlyChanges}
                onPreviewModeChange={(mode: PreviewMode) => (previewMode = mode)}
                onShowOnlyChangesChange={(show: boolean) => (showOnlyChanges = show)}
            />
        </div>
    </div>

    <div class="min-h-0 flex-1 overflow-auto">
        {#if previewMode === 'unified'}
            <UnifiedView diffResults={filteredResults} />
        {:else}
            <SplitView {diffResults} {showOnlyChanges} />
        {/if}
    </div>
</div>
