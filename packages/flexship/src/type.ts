import fetch from 'node-fetch';
export type ProjectType = 'Expo (Frontend)' | 'Express (Backend)' | 'Node';
export type Answers = {
  projectType: ProjectType;
  projectName: string;
};
export type MockFetch = (url: RequestInfo, init?: RequestInit) => Promise<any>;
export type RealFetch = typeof fetch;
export type Fetch = RealFetch | MockFetch;
