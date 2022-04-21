import { RawPackage } from '../models/Package';
import { RawPlayedProject } from '../models/PlayedProject';
import { RawProject } from '../models/Project';

export interface RequestAllProjectsResponse {
    Projects: RawProject[];
    PlayedProjects?: RawPlayedProject[];
    Packages: RawPackage[];
}