import { Credentials, RawProjectInfo, RequestAllProjectsResponse } from './types';
import axios from 'axios';
import { Project } from './Project';
import { ProjectInfo } from './ProjectInfo';
import { inflateRaw } from 'pako';

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

  static async downloadImage(url: string): Promise<Uint8Array> {
    // the response is a buffer that contains raw deflated data
    const response = await axios.get<Buffer>(url, {
      responseType: 'arraybuffer',
    });
    // zlib seems to add two bytes to the start of the buffer that can't be handled by nodejs/pako\
    // these two bytes are probably a header but none of the nodejs/pako methods seem to be able to handle that
    // therefore these two bytes are simply omitted
    const buffer = Buffer.alloc(response.data.length - 2);
    // copy everything but the first two bytes into buffer
    response.data.copy(buffer, 0, 2);
    // lastly we want to decompress the buffer
    return inflateRaw(buffer);
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

  async downloadImage(url: string): Promise<Uint8Array> {
    return SpineApi.downloadImage(url);
  }
}
