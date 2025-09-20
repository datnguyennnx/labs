<script lang="ts">
    import { cn } from '$lib/utils';
    import { Textarea } from '$lib/components/ui/textarea';
    import { generateLineNumbers } from '../../engine/utils';

    interface Props {
        value: string;
        onChange: (value: string) => void;
        placeholder?: string;
        label?: string;
        className?: string;
    }

    let { value, onChange, placeholder = 'Enter text here...', label, className }: Props = $props();

    let lineCount = $state(1);
    let isDragOver = $state(false);

    $effect(() => {
        const lines = value.split('\n');
        lineCount = Math.max(lines.length, 1);
    });

    const lineNumbers = $derived(generateLineNumbers(lineCount));

    function handleKeyDown(event: KeyboardEvent) {
        if ((event.ctrlKey || event.metaKey) && event.key === 'a') {
            event.preventDefault();
            const target = event.target as HTMLTextAreaElement;
            target.select();
        }

        if (event.key === 'Tab') {
            event.preventDefault();
            const target = event.target as HTMLTextAreaElement;
            const start = target.selectionStart || 0;
            const end = target.selectionEnd || 0;
            const newValue = value.substring(0, start) + '  ' + value.substring(end);
            onChange(newValue);

            // Set cursor position
            setTimeout(() => {
                target.selectionStart = start + 2;
                target.selectionEnd = start + 2;
            }, 0);
        }
    }

    function handleDragOver(event: DragEvent) {
        event.preventDefault();
        event.stopPropagation();
        if (!isDragOver) {
            isDragOver = true;
        }
    }

    function handleDragLeave(event: DragEvent) {
        event.preventDefault();
        event.stopPropagation();
        // Only set drag over to false if we're actually leaving the drop zone
        if (
            event.currentTarget &&
            event.relatedTarget &&
            (event.currentTarget as Element).contains(event.relatedTarget as Node)
        ) {
            return;
        }
        isDragOver = false;
    }

    function handleDrop(event: DragEvent) {
        event.preventDefault();
        event.stopPropagation();
        isDragOver = false;

        if (!event.dataTransfer) return;
        const files = Array.from(event.dataTransfer.files);
        if (files.length === 0) return;

        // Handle only the first file for now
        const file = files[0];

        // Check if it's a text file
        if (
            !file.type.startsWith('text/') &&
            !file.name.match(/\.(txt|md|js|ts|jsx|tsx|json|css|html|xml|yml|yaml)$/i)
        ) {
            // Show warning - in a real app, you'd use a toast system
            console.warn('Only text files are supported for drag and drop');
            return;
        }

        // Read the file
        const reader = new FileReader();
        reader.onload = e => {
            const text = e.target?.result as string;
            if (text) {
                onChange(text);
            }
        };
        reader.readAsText(file);
    }
</script>

<div
    class={cn(
        'bg-card flex h-full w-full flex-col overflow-hidden rounded-lg border transition-all duration-200',
        isDragOver && 'ring-accent border-accent bg-accent/5 ring-2',
        className,
    )}
    ondragover={handleDragOver}
    ondragleave={handleDragLeave}
    ondrop={handleDrop}
    role="region"
>
    {#if label}
        <div
            class="bg-card/95 supports-[backdrop-filter]:bg-card/60 flex-shrink-0 border-b p-3 backdrop-blur"
        >
            <div class="diff-text-muted flex items-center justify-between text-xs">
                <span class="font-medium">{label}</span>
                <span class="font-medium">Lines: {lineCount.toLocaleString()}</span>
            </div>
        </div>
    {/if}

    <div class="relative min-h-0 flex-1 overflow-hidden">
        <div
            class="bg-muted/20 absolute top-0 left-0 z-10 h-full w-12 overflow-hidden rounded-l-lg select-none"
        >
            <div class="text-line-numbers scrollbar-text">
                {#each lineNumbers as lineNum (lineNum)}
                    <div class="text-line-number hover:diff-text-muted-secondary transition-colors">
                        {lineNum}
                    </div>
                {/each}
            </div>
        </div>

        <!-- Drag overlay -->
        {#if isDragOver}
            <div
                class="drag-drop-overlay absolute inset-0 z-20 flex items-center justify-center rounded-lg"
            >
                <div class="text-center">
                    <div class="drag-drop-text text-sm">Drop file here</div>
                    <div class="drag-drop-subtext mt-1">Text files supported</div>
                </div>
            </div>
        {/if}

        <Textarea
            class={cn(
                'h-full w-full resize-none border-0 bg-transparent p-4 pl-16',
                'rounded-none',
                'focus:ring-0 focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0',
                'diff-text-placeholder',
                'scrollbar-text',
                'text-textarea',
                isDragOver && 'pointer-events-none',
            )}
            {value}
            {placeholder}
            oninput={e => onChange((e.target as HTMLTextAreaElement).value)}
            onkeydown={handleKeyDown}
        />
    </div>
</div>
