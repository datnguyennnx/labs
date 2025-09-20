<script lang="ts">
    import type { DiffResult } from '$lib/components/text-diff';
    import { processForSplitView, filterDiffResults } from '$lib/components/text-diff';
    import { CharHighlightRenderer } from '../displays';

    interface Props {
        diffResults: DiffResult[];
        showOnlyChanges: boolean;
    }

    let { diffResults, showOnlyChanges }: Props = $props();

    // Simplified version without scroll synchronization for now

    if (diffResults.length === 0) {
        // This would need to be handled differently in Svelte
        // renderEmptyState()
    }

    const filteredResults = $derived(filterDiffResults(diffResults, showOnlyChanges));
    const { lineMap, lineNumbers } = $derived(processForSplitView(filteredResults));
</script>

<div class="diff-bg-primary flex h-full flex-col">
    <div class="flex min-h-0 flex-1">
        <div class="diff-border-light flex min-h-0 w-1/2 flex-col border-r">
            <div class="min-h-0 flex-1 overflow-auto">
                <div class="min-h-full">
                    {#each lineNumbers as displayLineNum (displayLineNum)}
                        {@const lineData = lineMap[displayLineNum]}
                        {@const original = lineData.original}

                        {#if !original}
                            <div
                                class="diff-border-transparent diff-line-hover flex min-h-[1.5rem] items-center border-l-2 px-4"
                            >
                                <span
                                    class="diff-text-muted-secondary mr-4 inline-block w-12 text-right text-xs select-none"
                                >
                                    {displayLineNum}
                                </span>
                                <div class="diff-text-gray flex-1 text-xs italic">• • •</div>
                            </div>
                        {:else}
                            {@const lineClass = `flex items-center min-h-[1.5rem] px-4 whitespace-pre-wrap font-mono text-sm leading-relaxed diff-line-hover ${
                                original.type === 'removed'
                                    ? 'diff-line-removed bg-red-50 dark:bg-red-950/20'
                                    : 'diff-line-unchanged'
                            }`}

                            <div class={lineClass}>
                                <span
                                    class="diff-text-muted-secondary mr-4 inline-block w-12 text-right text-xs select-none"
                                >
                                    {original.lineNumber}
                                </span>
                                <span class="flex-1">
                                    <CharHighlightRenderer fallbackText={original.value} />
                                </span>
                            </div>
                        {/if}
                    {/each}
                </div>
            </div>
        </div>

        <div class="flex min-h-0 w-1/2 flex-col">
            <div class="min-h-0 flex-1 overflow-auto">
                <div class="min-h-full">
                    {#each lineNumbers as displayLineNum (displayLineNum)}
                        {@const lineData = lineMap[displayLineNum]}
                        {@const modified = lineData.modified}

                        {#if !modified}
                            <div
                                class="diff-border-transparent diff-line-hover flex min-h-[1.5rem] items-center border-l-2 px-4"
                            >
                                <span
                                    class="diff-text-muted-secondary mr-4 inline-block w-12 text-right text-xs select-none"
                                >
                                    {displayLineNum}
                                </span>
                                <div class="diff-text-gray flex-1 text-xs italic">• • •</div>
                            </div>
                        {:else}
                            {@const lineClass = `flex items-center min-h-[1.5rem] px-4 whitespace-pre-wrap font-mono text-sm leading-relaxed diff-line-hover ${
                                modified.type === 'added'
                                    ? 'diff-line-added bg-green-50 dark:bg-green-950/20'
                                    : modified.type === 'modified'
                                      ? 'diff-line-modified bg-yellow-50 dark:bg-yellow-950/20'
                                      : 'diff-line-unchanged'
                            }`}

                            <div class={lineClass}>
                                <span
                                    class="diff-text-muted-secondary mr-4 inline-block w-12 text-right text-xs select-none"
                                >
                                    {modified.lineNumber}
                                </span>
                                <span class="flex-1">
                                    <CharHighlightRenderer fallbackText={modified.value} />
                                </span>
                            </div>
                        {/if}
                    {/each}
                </div>
            </div>
        </div>
    </div>
</div>
