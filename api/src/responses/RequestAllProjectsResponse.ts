import {RawPackage, RawPlayedProject, RawProject} from "../models";

export interface RequestAllProjectsResponse {
    Projects: RawProject[];
    PlayedProjects?: RawPlayedProject[];
    Packages: RawPackage[];
}