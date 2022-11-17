import { Image, SpineImage } from './image';
import { ProjectReference, SpineProjectReference } from './projectReference';
import { unescapeHtml } from '../utilities';
import { parseDate } from '../date';

export interface SpineNews {
  Title: string;
  Body: string;
  Timestamp: string;
  ProjectReferences?: SpineProjectReference[];
  Images?: SpineImage[];
}

export class News {
  title: string;
  body: string;
  timestamp: Date;
  projectReferences: ProjectReference[];
  images: Image[];

  constructor(news: SpineNews) {
    this.title = unescapeHtml(news.Title);
    this.body = unescapeHtml(news.Body);
    this.timestamp = parseDate(news.Timestamp);
    this.projectReferences = (news.ProjectReferences || []).map(
      (projectReference) => new ProjectReference(projectReference),
    );
    this.images = (news.Images || []).map((image) => new Image(image));
  }
}
