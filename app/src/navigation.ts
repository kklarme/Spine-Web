export interface NavigationItem {
    label: string;
    path: string;
}

export const MAIN_NAVIGATION_ITEMS: NavigationItem[] = [
    {
        label: 'News',
        path: '/',
    },
    {
        label: 'Mods',
        path: '/mods',
    },
];