import axios from 'axios';
import { promises } from 'fs';

export interface FileMeta {
  path: string;
  lineNumber: number;
}

export interface Route {
  path: string;
  method: string;
  file: FileMeta;
}

export interface ComparedRoute extends Route {
  isImplemented: boolean;
  localFile?: FileMeta;
}

export const REMOTE_SOURCE_URLS = [
  'https://raw.githubusercontent.com/ClockworkOrigins/Spine/master/src/server/DatabaseServer.cpp',
];
export const REMOTE_ROUTE_REGEX = /"[^]([/].*)"][[]"(.*)"]/g;

export const LOCAL_SOURCE_PATHS = ['src/SpineApi.ts'];
export const LOCAL_ROUTE_REGEX = /axios[.](.*)[(]\s*["'`].*([/].*)\s*["'`]/g;

export function getLineNumber(match: RegExpMatchArray): number {
  if (!match.index || !match.input) {
    return 0;
  }
  const substring = match.input.substring(0, match.index);
  return substring.split('\n').length;
}

export async function collectRemoteRoutes(url: string): Promise<Route[]> {
  const response = await axios.get<string>(url);
  const fileContent = response.data;
  const matches = fileContent.matchAll(REMOTE_ROUTE_REGEX);
  return Array.from(matches).map((match) => ({
    path: match[1],
    method: match[2],
    file: {
      path: url,
      lineNumber: getLineNumber(match),
    },
  }));
}

export async function collectLocalRoutes(path: string): Promise<Route[]> {
  const fileBuffer = await promises.readFile(path);
  const fileContent = fileBuffer.toString();
  const matches = fileContent.matchAll(LOCAL_ROUTE_REGEX);
  return Array.from(matches).map((match) => ({
    path: match[2],
    method: match[1],
    file: {
      path,
      lineNumber: getLineNumber(match),
    },
  }));
}

export function areRoutesEqual(a: Route, b: Route): boolean {
  return (
    a.method.toLowerCase() === b.method.toLowerCase() &&
    a.path.toLowerCase() == b.path.toLowerCase()
  );
}

export function compareRoutes(sourceRoutes: Route[], localRoutes: Route[]): ComparedRoute[] {
  return sourceRoutes.map((route) => {
    const relatedLocalRoute = localRoutes.find((localRoute) => areRoutesEqual(route, localRoute));
    return {
      ...route,
      isImplemented: !!relatedLocalRoute,
      localFile: relatedLocalRoute?.file,
    };
  });
}

export async function getComparedRoutes(): Promise<ComparedRoute[]> {
  const sourceRoutePromises = REMOTE_SOURCE_URLS.map(collectRemoteRoutes);
  const sourceRouteResults = await Promise.all(sourceRoutePromises);
  const sourceRoutes = sourceRouteResults.reduce(
    (result, foundRoutes) => [...result, ...foundRoutes],
    [],
  );

  const localRoutePromises = LOCAL_SOURCE_PATHS.map(collectLocalRoutes);
  const localRouteResults = await Promise.all(localRoutePromises);
  const localRoutes = localRouteResults.reduce(
    (result, foundRoutes) => [...result, ...foundRoutes],
    [],
  );

  return compareRoutes(sourceRoutes, localRoutes);
}
