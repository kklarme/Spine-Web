import { Image, RawImage } from './Image';
import { ProjectReference, RawProjectReference } from './ProjectReference';
import { unescapeHtml } from './utilities';

export interface RawNews {
  Timestamp: string;
  Title: string;
  Body: string;
  ProjectReferences?: RawProjectReference[];
  Images?: RawImage[];
}

export class News {
  timestamp: Date;
  title: string;
  body: string;
  projectReferences: ProjectReference[];
  images: Image[];

  constructor(news: RawNews) {
    this.timestamp = new Date(); // TODO determine value based on news.timestamp
    this.title = unescapeHtml(news.Title);
    this.body = unescapeHtml(news.Body);
    this.projectReferences = (news.ProjectReferences || []).map(
      (projectReference) => new ProjectReference(projectReference),
    );
    this.images = (news.Images || []).map((image) => new Image(image));
  }
}
