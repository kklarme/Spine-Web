import { SpinePackage } from '../models/Package';
import { SpinePlayedProject } from '../models/PlayedProject';
import { SpineProject } from '../models/Project';

export interface RequestAllProjectsResponse {
  Projects: SpineProject[];
  PlayedProjects?: SpinePlayedProject[];
  Packages: SpinePackage[];
}
