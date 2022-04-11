import { parseSpineDate, unescapeHtml } from './utilities';
import { GameType } from './GameType';
import { RawImage, Image } from './Image';

export interface RawProjectInfo {
  Name: string;
  Screenshots?: RawImage[];
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

  constructor(projectInfo: RawProjectInfo) {
    this.name = unescapeHtml(projectInfo.Name);
    this.screenshots = (projectInfo.Screenshots || []).map((screenshot) => new Image(screenshot));
    this.description = projectInfo.Description;
    this.features = projectInfo.Features;
    this.spineFeatures = parseInt(projectInfo.SpineFeatures);
    this.releaseDate = parseSpineDate(projectInfo.ReleaseDate);
    this.majorVersion = parseInt(projectInfo.MajorVersion);
    this.minorVersion = parseInt(projectInfo.MinorVersion);
    this.patchVersion = parseInt(projectInfo.PatchVersion);
    this.gameType = parseInt(projectInfo.GameType);
    this.updateDate = parseSpineDate(projectInfo.UpdateDate);
    this.installAllowed = projectInfo.installAllowed === '1';
  }
}
