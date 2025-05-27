<script lang="ts">
    import { page } from '$app/state';
</script>

<div
    class="bg-background text-foreground flex min-h-screen w-full items-center justify-center px-4 py-12"
>
    <div class="max-w-md space-y-6 text-center">
        <div class="text-primary text-6xl font-extrabold">{page.status}</div>
        <h1 class="text-foreground text-xl font-semibold">
            {page.error?.message ?? 'Something went wrong.'}
        </h1>
        <p class="text-muted-foreground">
            We're working on it. Please try again later or return to the dashboard.
        </p>
        <a
            href="/"
            class="bg-primary text-primary-foreground hover:bg-primary/80 rounded-lg px-6 py-4 font-medium shadow"
        >
            Return to Dashboard
        </a>
    </div>
</div>
