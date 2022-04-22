import { SpinePackage } from '../models/Package';
import { SpinePlayedProject } from '../models/PlayedProject';
import { SpineProject } from '../models/Project';

export interface GetProjectsResponse {
  Projects: SpineProject[];
  PlayedProjects?: SpinePlayedProject[];
  Packages: SpinePackage[];
}
