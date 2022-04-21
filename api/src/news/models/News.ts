import { Image, RawImage } from '../../image/Image';
import { ProjectReference, RawProjectReference } from './ProjectReference';
import { unescapeHtml } from '../../utilities';
import { SpineDateUtils } from '../../date/SpineDateUtils';

export interface RawNews {
  Title: string;
  Body: string;
  Timestamp: string;
  ProjectReferences?: RawProjectReference[];
  Images?: RawImage[];
}

export class News {
  title: string;
  body: string;
  timestamp: Date;
  projectReferences: ProjectReference[];
  images: Image[];

  constructor(news: RawNews) {
    this.title = unescapeHtml(news.Title);
    this.body = unescapeHtml(news.Body);
    this.timestamp = SpineDateUtils.parseDate(news.Timestamp);
    this.projectReferences = (news.ProjectReferences || []).map(
      (projectReference) => new ProjectReference(projectReference),
    );
    this.images = (news.Images || []).map((image) => new Image(image));
  }
}
