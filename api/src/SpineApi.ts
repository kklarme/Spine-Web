import { Credentials, RawProjectInfo, RequestAllProjectsResponse } from './types';
import axios from 'axios';
import { Project } from './Project';
import { ProjectInfo } from './ProjectInfo';

export interface SpineApiConfig {
  serverUrl: string;
  credentials: Credentials;
  language?: string;
}

export class SpineApi {
  // for whatever reason a lot of teamName properties are missing if another language property than 'Deutsch' is passed
  // therefore the default language value is 'Deutsch'
  static defaultLanguage = 'Deutsch';

  static async requestAllProjects({
    serverUrl,
    credentials,
    language = this.defaultLanguage,
  }: SpineApiConfig): Promise<RequestAllProjectsResponse> {
    const response = await axios.post(`${serverUrl}/requestAllProjects`, {
      Username: credentials.username,
      Password: credentials.password,
      Language: language,
    });
    return response.data;
  }

  static async getProjects(config: SpineApiConfig): Promise<Project[]> {
    const response = await this.requestAllProjects(config);
    return response.Projects.map(
      (project) =>
        new Project(
          project,
          response.Packages.filter((pkg) => pkg.ProjectID === project.ProjectID),
        ),
    );
  }

  static async requestProjectInfo(
    id: string,
    { serverUrl, credentials, language = this.defaultLanguage }: SpineApiConfig,
  ): Promise<RawProjectInfo> {
    const response = await axios.post(`${serverUrl}/requestInfoPage`, {
      ProjectID: id,
      Username: credentials.username,
      Password: credentials.password,
      Language: language,
    });
    return response.data;
  }

  static async getProjectInfo(id: string, config: SpineApiConfig): Promise<ProjectInfo> {
    const projectInfo = await this.requestProjectInfo(id, config);
    return new ProjectInfo(projectInfo);
  }

  constructor(public config: SpineApiConfig) {}

  get language(): string {
    return this.config.language || SpineApi.defaultLanguage;
  }

  async requestAllProjects(): Promise<RequestAllProjectsResponse> {
    return SpineApi.requestAllProjects(this.config);
  }

  async getProjects(): Promise<Project[]> {
    return SpineApi.getProjects(this.config);
  }

  async requestProjectInfo(id: string): Promise<RawProjectInfo> {
    return SpineApi.requestProjectInfo(id, this.config);
  }

  async getProjectInfo(id: string): Promise<ProjectInfo> {
    return SpineApi.getProjectInfo(id, this.config);
  }
}
