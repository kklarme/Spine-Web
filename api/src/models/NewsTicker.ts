import { unescapeHtml } from '../utilities';
import { SpineDate } from '../SpineDate';

export interface RawNewsTicker {
  Type: string;
  ProjectID: string;
  Name: string;
  Timestamp: string;
  MajorVersion?: string;
  MinorVersion?: string;
  PatchVersion?: string;
}

export class NewsTicker {
  type: number;
  projectId: number;
  name: string;
  timestamp: Date;
  version?: string;

  constructor(newsTicker: RawNewsTicker) {
    this.type = parseInt(newsTicker.Type);
    this.projectId = parseInt(newsTicker.ProjectID);
    this.name = unescapeHtml(newsTicker.Name);
    this.timestamp = SpineDate.parseDate(newsTicker.Timestamp);
    if (newsTicker.MajorVersion && newsTicker.MinorVersion && newsTicker.PatchVersion) {
      this.version = [
        newsTicker.MajorVersion,
        newsTicker.MinorVersion,
        newsTicker.PatchVersion,
      ].join('.');
    }
  }
}
