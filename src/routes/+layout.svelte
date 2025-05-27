<script lang="ts">
    import '../app.css';
    import { ModeWatcher } from 'mode-watcher';
    import MainSidebar from '$lib/components/common/main-sidebar.svelte';

    let { children } = $props();
</script>

<ModeWatcher />
<MainSidebar>
    {@render children()}
</MainSidebar>
