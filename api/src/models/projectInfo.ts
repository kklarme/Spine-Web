import { unescapeHtml } from '../utilities';
import { GameType } from './gameType';
import { Image, SpineImage } from './image';
import { parseDate } from '../date';

export interface SpineProjectInfo {
  Name: string;
  Screenshots?: SpineImage[];
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

export class ProjectInfo {
  name: string;
  screenshots: Image[];
  description: string;
  features?: string[];
  spineFeatures: number;
  releaseDate: Date;
  majorVersion: number;
  minorVersion: number;
  patchVersion: number;
  gameType: GameType;
  updateDate: Date;
  installAllowed: boolean;

  constructor(projectInfo: SpineProjectInfo) {
    this.name = unescapeHtml(projectInfo.Name);
    this.screenshots = (projectInfo.Screenshots || []).map((screenshot) => new Image(screenshot));
    this.description = projectInfo.Description;
    this.features = projectInfo.Features;
    this.spineFeatures = parseInt(projectInfo.SpineFeatures);
    this.releaseDate = parseDate(projectInfo.ReleaseDate);
    this.majorVersion = parseInt(projectInfo.MajorVersion);
    this.minorVersion = parseInt(projectInfo.MinorVersion);
    this.patchVersion = parseInt(projectInfo.PatchVersion);
    this.gameType = parseInt(projectInfo.GameType);
    this.updateDate = parseDate(projectInfo.UpdateDate);
    this.installAllowed = projectInfo.installAllowed === '1';
  }
}
