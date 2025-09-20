<script lang="ts">
    import type { DiffResult } from '$lib/components/text-diff';
    import { processForUnifiedView } from '$lib/components/text-diff';
    import { CharHighlightRenderer } from '../displays';

    interface Props {
        diffResults: DiffResult[];
    }

    let { diffResults }: Props = $props();

    if (diffResults.length === 0) {
        // This would need to be handled differently in Svelte
        // renderEmptyState()
    }

    const { results: processedResults } = $derived(processForUnifiedView(diffResults));
</script>

<div class="diff-bg-primary flex h-full flex-col">
    <div class="min-h-0 flex-1 overflow-auto">
        <div class="min-h-full">
            {#each processedResults as result (`${result.type}-${result.lineNumber}-${result.value}`)}
                <div
                    class="diff-line-hover flex min-h-[1.5rem] items-center border-l-4 px-4 font-mono text-sm leading-relaxed whitespace-pre-wrap {result.value ===
                    '---'
                        ? 'diff-line-separator'
                        : result.type === 'added'
                          ? 'diff-line-added'
                          : result.type === 'removed'
                            ? 'diff-line-removed'
                            : result.type === 'modified'
                              ? 'diff-line-modified'
                              : 'diff-line-unchanged'}"
                >
                    <span
                        class="diff-text-quaternary mr-2 inline-block w-6 text-center text-xs select-none"
                    >
                        {#if result.value === '---'}
                            ⋯
                        {:else if result.type === 'added'}
                            +
                        {:else if result.type === 'removed'}
                            −
                        {:else}
                            <!-- empty -->
                        {/if}
                    </span>

                    <span
                        class="diff-text-quaternary mr-4 inline-block w-8 text-right text-xs select-none"
                    >
                        {#if result.value !== '---'}{result.lineNumber}{/if}
                    </span>

                    <span class="flex-1">
                        <CharHighlightRenderer fallbackText={result.value} />
                    </span>
                </div>
            {/each}
        </div>
    </div>
</div>
