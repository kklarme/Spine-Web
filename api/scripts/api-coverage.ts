import axios from 'axios';
import { promises } from 'fs';

export interface Route {
  file: string;
  path: string;
  method: string;
}

export interface ComparedRoute extends Route {
  isImplemented: boolean;
}

export const REMOTE_SOURCE_URLS = [
  'https://raw.githubusercontent.com/ClockworkOrigins/Spine/master/src/server/DatabaseServer.cpp',
];
export const REMOTE_ROUTE_REGEX = /"[^]([/].*)"][[]"(.*)"]/g;

export const LOCAL_SOURCE_PATHS = ['src/SpineApi.ts'];
export const LOCAL_ROUTE_REGEX = /axios[.](.*)[(]\s*["'`].*([/].*)\s*["'`]/g;

export async function collectRemoteRoutes(url: string): Promise<Route[]> {
  const response = await axios.get<string>(url);
  const fileContent = response.data;
  const matches = fileContent.matchAll(REMOTE_ROUTE_REGEX);
  return Array.from(matches).map((match) => ({
    file: url,
    path: match[1],
    method: match[2],
  }));
}

export async function collectLocalRoutes(path: string): Promise<Route[]> {
  const fileBuffer = await promises.readFile(path);
  const fileContent = fileBuffer.toString();
  const matches = fileContent.matchAll(LOCAL_ROUTE_REGEX);
  return Array.from(matches).map((match) => ({
    file: path,
    path: match[2],
    method: match[1],
  }));
}

export function areRoutesEqual(a: Route, b: Route): boolean {
  return (
    a.method.toLowerCase() === b.method.toLowerCase() &&
    a.path.toLowerCase() == b.path.toLowerCase()
  );
}

export function compareRoutes(sourceRoutes: Route[], localRoutes: Route[]): ComparedRoute[] {
  return sourceRoutes.map((route) => ({
    ...route,
    isImplemented: localRoutes.some((localRoute) => areRoutesEqual(route, localRoute)),
  }));
}

export async function getComparedRoutes(): Promise<ComparedRoute[]> {
  const sourceRoutePromises = REMOTE_SOURCE_URLS.map(collectRemoteRoutes);
  const sourceRouteResults = await Promise.all(sourceRoutePromises);
  const sourceRoutes = sourceRouteResults.reduce((result, foundRoutes) => {
    return [...result, ...foundRoutes];
  }, []);

  const localRoutePromises = LOCAL_SOURCE_PATHS.map(collectLocalRoutes);
  const localRouteResults = await Promise.all(localRoutePromises);
  const localRoutes = localRouteResults.reduce((result, foundRoutes) => {
    return [...result, ...foundRoutes];
  }, []);

  return compareRoutes(sourceRoutes, localRoutes);
}
