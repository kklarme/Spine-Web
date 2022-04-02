export interface Credentials {
  username: string;
  password: string;
}

export interface RequestAllProjectsResponse {
  Projects: RawProject[];
  PlayedProjects?: PlayedProject[];
  Packages: RawPackage[];
}

export enum GameType {
  Gothic1 = 0,
  Gothic2 = 1,
  Gothic3 = 2,
  Gothic1And2 = 3,
  Game = 4,
}

export enum ModType {
  TotalConversion,
  Expansion,
  Patch,
  Tool,
  Original,
  Multiplayer,
}

export interface RawProject {
  ProjectID: string;
  Name: string;
  GameType: string;
  ModType: string;
  Keywords: string; // semicolon (;) delimited string, always ends with delimiter
  SupportedLanguages: string; // ? | probably there is a language entry in the database for every possible language combination
  TeamID: string;
  TeamName?: string;
  ReleaseDate: string; // hours till now
  MajorVersion: string;
  MinorVersion: string;
  PatchVersion: string;
  SpineVersion: string;
  DevDuration: string; // in minutes
  AvgDuration: string; // in minutes
  DownloadSize: string;
  UpdateDate: string; // hours till now
  Language: string; // ? | look at SupportedLanguages
}

export interface PlayedProject {
  ID: number;
}

export interface RawPackage {
  PackageID: string;
  ProjectID: string;
  Name: string;
  Language: string;
}

export interface RawScreenshot {
  File: string;
  Hash: string;
}

export interface RawProjectInfo {
  Name: string;
  Screenshots: RawScreenshot[];
  Description: string;
  Features?: string[];
  SpineFeatures: string;
  ReleaseDate: string;
  MajorVersion: string;
  MinorVersion: string;
  PatchVersion: string;
  GameType: string;
  UpdateDate: string;
  installAllowed: string;
}
