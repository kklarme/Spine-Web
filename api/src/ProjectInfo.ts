import { GameType, RawProjectInfo } from './types';
import { parseSpineDate } from './utilities';

export interface Screenshot {
  file: string;
  hash: string;
}

export class ProjectInfo {
  name: string;
  screenshots: Screenshot[];
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
    this.name = projectInfo.Name;
    this.screenshots = projectInfo.Screenshots.map((screenshot) => ({
      file: screenshot.File,
      hash: screenshot.Hash,
    }));
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
