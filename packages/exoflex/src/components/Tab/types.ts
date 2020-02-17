import { ComponentType } from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type TabScene<T = any> = { title: string; scene: ComponentType<T> };

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type TabScenes<T = any> = Array<TabScene<T>>;
