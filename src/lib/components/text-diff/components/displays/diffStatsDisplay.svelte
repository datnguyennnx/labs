<script lang="ts">
    import type { DiffStats } from '../../engine/types';
    import { formatNumber } from '../../engine/utils';
    import { SECTION_LABELS } from '../../engine/constants';

    interface Props {
        stats: DiffStats;
        showOnlyChanges: boolean;
    }

    let { stats, showOnlyChanges }: Props = $props();
</script>

<div class="diff-text-muted flex items-center gap-3 text-sm">
    <span>
        {showOnlyChanges ? SECTION_LABELS.changesDetected : SECTION_LABELS.comparisonResults}
    </span>
    <div class="flex items-center gap-3">
        {#if stats.additions > 0}
            <span class="diff-stats-added font-mono">+{formatNumber(stats.additions)}</span>
        {/if}
        {#if stats.deletions > 0}
            <span class="diff-stats-removed font-mono">-{formatNumber(stats.deletions)}</span>
        {/if}
        <span class="diff-stats-total font-mono">{formatNumber(stats.totalLines)} lines</span>
    </div>
</div>
