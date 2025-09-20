<script lang="ts">
    import { Button } from '$lib/components/ui/button';
    import {
        DropdownMenu,
        DropdownMenuContent,
        DropdownMenuItem,
        DropdownMenuSeparator,
        DropdownMenuTrigger,
    } from '$lib/components/ui/dropdown-menu';
    import { ChevronDown, Eye, EyeOff, Columns, Minus } from '@lucide/svelte';
    import type { PreviewMode } from '$lib/components/text-diff';
    import { BUTTON_LABELS } from '$lib/components/text-diff';

    interface Props {
        previewMode: PreviewMode;
        showOnlyChanges: boolean;
        onPreviewModeChange: (mode: PreviewMode) => void;
        onShowOnlyChangesChange: (show: boolean) => void;
    }

    let { previewMode, showOnlyChanges, onPreviewModeChange, onShowOnlyChangesChange }: Props =
        $props();

    function getCurrentLabel(): string {
        if (showOnlyChanges) {
            return `${BUTTON_LABELS.changesOnly} • ${previewMode === 'split' ? BUTTON_LABELS.split : BUTTON_LABELS.unified}`;
        }
        return previewMode === 'split' ? BUTTON_LABELS.split : BUTTON_LABELS.unified;
    }
</script>

<DropdownMenu>
    <DropdownMenuTrigger>
        <Button variant="ghost" size="sm" class="h-8 gap-2 px-3 text-xs">
            {#if showOnlyChanges}
                <EyeOff class="h-3 w-3" />
            {:else}
                <Eye class="h-3 w-3" />
            {/if}

            {#if previewMode === 'split'}
                <Columns class="h-3 w-3" />
            {:else}
                <Minus class="h-3 w-3" />
            {/if}

            {getCurrentLabel()}
            <ChevronDown class="h-3 w-3" />
        </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end" class="w-48">
        <DropdownMenuItem onclick={() => onPreviewModeChange('split')}>
            <Columns class="mr-2 h-4 w-4" />
            {BUTTON_LABELS.split} View
        </DropdownMenuItem>
        <DropdownMenuItem onclick={() => onPreviewModeChange('unified')}>
            <Minus class="mr-2 h-4 w-4" />
            {BUTTON_LABELS.unified} View
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onclick={() => onShowOnlyChangesChange(!showOnlyChanges)}>
            {#if showOnlyChanges}
                <EyeOff class="mr-2 h-4 w-4" />
            {:else}
                <Eye class="mr-2 h-4 w-4" />
            {/if}
            {showOnlyChanges ? 'Show All Lines' : BUTTON_LABELS.changesOnly}
        </DropdownMenuItem>
    </DropdownMenuContent>
</DropdownMenu>
