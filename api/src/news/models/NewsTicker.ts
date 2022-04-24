import { unescapeHtml } from '../../utilities';
import { SpineDateUtils } from '../../date';

export interface SpineNewsTicker {
  Type: string;
  ProjectID: string;
  Name: string;
  Timestamp: string;
  MajorVersion?: string;
  MinorVersion?: string;
  PatchVersion?: string;
}

export enum NewsTickerType {
  Update,
  Release,
}

export class NewsTicker {
  type: NewsTickerType;
  projectId: number;
  name: string;
  timestamp: Date;
  version?: string;

  constructor(newsTicker: SpineNewsTicker) {
    this.type = parseInt(newsTicker.Type);
    this.projectId = parseInt(newsTicker.ProjectID);
    this.name = unescapeHtml(newsTicker.Name);
    this.timestamp = SpineDateUtils.parseDate(newsTicker.Timestamp);
    if (newsTicker.MajorVersion && newsTicker.MinorVersion && newsTicker.PatchVersion) {
      this.version = [
        newsTicker.MajorVersion,
        newsTicker.MinorVersion,
        newsTicker.PatchVersion,
      ].join('.');
    }
  }
}
