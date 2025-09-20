<script lang="ts">
    interface Props {
        fallbackText?: string;
    }

    let { fallbackText }: Props = $props();

    // Simplified: just return the fallback text without complex highlighting
    // This keeps the UI simple and clean like GitHub
</script>

<span>{fallbackText}</span>
