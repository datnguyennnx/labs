import type { DiffResult } from '../types';
import { STATUS_MESSAGES } from '../constants';

export interface ChangeNavigationData {
    result: DiffResult;
    index: number;
}

export function renderEmptyState(): string {
    return `
        <div class="flex items-center justify-center h-full diff-text-muted p-4">
            <div class="text-center">
                <p class="text-sm">${STATUS_MESSAGES.noDifferences}</p>
                <p class="text-xs mt-1">${STATUS_MESSAGES.enterTextToCompare}</p>
            </div>
        </div>
    `;
}

export function getCurrentChangeHighlight(isCurrent: boolean): string {
    return isCurrent
        ? 'bg-blue-100 dark:bg-blue-900/30 border-blue-300 dark:border-blue-600'
        : 'hover:bg-gray-50 dark:hover:bg-gray-800/50';
}
