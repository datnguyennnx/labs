<script lang="ts">
    import * as Sidebar from '$lib/components/ui/sidebar';
    import ThemeToggle from '$lib/components/common/theme-toggle.svelte';
    import ArrowDownUpIcon from '@lucide/svelte/icons/arrow-down-up';
    import type { Snippet, Component } from 'svelte';
    import { page } from '$app/stores';

    let { children } = $props<{ children: Snippet }>();

    interface MenuItem {
        title: string;
        href: string;
        icon: Component;
    }

    const taskItems: MenuItem[] = [
        { title: 'Backtesting', href: '/backtesting', icon: ArrowDownUpIcon },
    ];
</script>

<Sidebar.Provider>
    <Sidebar.Root side="left" variant="sidebar" collapsible="icon">
        <Sidebar.Header class="flex flex-row items-center justify-between p-3">
            <h2
                class="px-1 text-lg font-semibold transition-opacity duration-200 group-data-[collapsible=icon]:hidden"
            >
                Thinkings Labs
            </h2>
            <Sidebar.Trigger />
        </Sidebar.Header>
        <Sidebar.Content>
            <Sidebar.Menu>
                <Sidebar.Group>
                    <Sidebar.GroupLabel>Applications</Sidebar.GroupLabel>
                    {#each taskItems as item (item.href)}
                        <Sidebar.MenuItem>
                            <Sidebar.MenuButton
                                tooltipContent={item.title}
                                isActive={$page.url.pathname === item.href}
                            >
                                {#snippet child({ props })}
                                    <a href={item.href} {...props}>
                                        <item.icon />
                                        <span>{item.title}</span>
                                    </a>
                                {/snippet}
                            </Sidebar.MenuButton>
                        </Sidebar.MenuItem>
                    {/each}
                </Sidebar.Group>
            </Sidebar.Menu>
        </Sidebar.Content>
        <Sidebar.Footer>
            <ThemeToggle />
        </Sidebar.Footer>
    </Sidebar.Root>
    <Sidebar.Inset>
        <main class="flex h-full p-4">
            {@render children()}
        </main>
    </Sidebar.Inset>
</Sidebar.Provider>
