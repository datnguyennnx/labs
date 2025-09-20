<script lang="ts">
    import { Button } from '$lib/components/ui/button';
    import TextInput from './inputs/textInput.svelte';
    import TextPreview from './displays/textPreview.svelte';
    import { useTextDiff } from '$lib/components/text-diff';
    import {
        DEFAULT_TEXT_1,
        DEFAULT_TEXT_2,
        BUTTON_LABELS,
        ARIA_LABELS,
        PLACEHOLDER_TEXT_1,
        PLACEHOLDER_TEXT_2,
    } from '$lib/components/text-diff';
    import '../styles.css';

    // Main component state
    let text1 = $state(DEFAULT_TEXT_1);
    let text2 = $state(DEFAULT_TEXT_2);

    // Diff logic
    const { compareTexts, getDiffStats } = useTextDiff();

    const diffResults = $derived(compareTexts(text1, text2));
    const stats = $derived(getDiffStats(diffResults));

    // Event handlers
    function handleClear() {
        text1 = '';
        text2 = '';
    }

    function handleLoadSample() {
        text1 = DEFAULT_TEXT_1;
        text2 = DEFAULT_TEXT_2;
    }
</script>

<main class="flex flex-col gap-y-8 focus:outline-none" aria-label={ARIA_LABELS.textDiffTool}>
    <!-- Header with toolbar -->
    <header
        class="bg-background/50 supports-[backdrop-filter]:bg-background/30 flex items-center justify-between pb-3 backdrop-blur"
        aria-label={ARIA_LABELS.textDiffToolbar}
    >
        <nav class="flex items-center gap-2" aria-label={ARIA_LABELS.textDiffActions}>
            <Button
                variant="outline"
                size="sm"
                onclick={handleLoadSample}
                aria-label={ARIA_LABELS.loadSampleAria}
            >
                {BUTTON_LABELS.loadSample}
            </Button>

            <Button
                variant="outline"
                size="sm"
                onclick={handleClear}
                disabled={!text1 && !text2}
                aria-label={ARIA_LABELS.clearAllAria}
            >
                {BUTTON_LABELS.clearAll}
            </Button>
        </nav>
    </header>

    <!-- Main content - Two column layout -->
    <div
        class="grid min-h-0 flex-1 grid-cols-1 gap-4 lg:grid-cols-2"
        role="region"
        aria-label="Text Comparison Workspace"
    >
        <!-- Left input panel -->
        <div class="h-full">
            <TextInput
                value={text1}
                onChange={(value: string) => (text1 = value)}
                placeholder={PLACEHOLDER_TEXT_1}
                className="h-full w-full"
            />
        </div>

        <!-- Right input panel -->
        <div class="h-full">
            <TextInput
                value={text2}
                onChange={(value: string) => (text2 = value)}
                placeholder={PLACEHOLDER_TEXT_2}
                className="h-full w-full"
            />
        </div>
    </div>

    <!-- Diff results panel - Full width below -->
    <div class="flex-1">
        <TextPreview {diffResults} {stats} className="h-full w-full" />
    </div>
</main>
