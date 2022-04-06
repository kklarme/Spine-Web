import { Credentials, RawProjectInfo, RequestAllProjectsResponse } from './types';
import axios from 'axios';
import { Project } from './Project';
import { ProjectInfo } from './ProjectInfo';
import { inflateRaw } from 'pako';
import { merge } from './utilities';
import { Language, LANGUAGE_NAME_MAP } from './SpineLanguage';

export interface SpineApiConfig {
  serverUrl: string;
  credentials: Credentials;
  language: Language;
}

export class SpineApi {
  static defaultConfig: SpineApiConfig = {
    serverUrl: 'https://clockwork-origins.com:19181',
    credentials: {
      username: '',
      password: '',
    },
    // for whatever reason a lot of teamName properties are missing if another language property than 'Deutsch' is passed
    // therefore the default language value is 'Deutsch'
    language: Language.German,
  };

  static async requestAllProjects(
    config?: Partial<SpineApiConfig>,
  ): Promise<RequestAllProjectsResponse> {
    const { serverUrl, credentials, language } = config
      ? merge(this.defaultConfig, config)
      : this.defaultConfig;
    const response = await axios.post(`${serverUrl}/requestAllProjects`, {
      Username: credentials.username,
      Password: credentials.password,
      Language: LANGUAGE_NAME_MAP[language],
    });
    return response.data;
  }

  static async getProjects(config?: Partial<SpineApiConfig>): Promise<Project[]> {
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
    config?: Partial<SpineApiConfig>,
  ): Promise<RawProjectInfo> {
    const { serverUrl, credentials, language } = config
      ? merge(this.defaultConfig, config)
      : this.defaultConfig;
    const response = await axios.post(`${serverUrl}/requestInfoPage`, {
      ProjectID: id,
      Username: credentials.username,
      Password: credentials.password,
      Language: LANGUAGE_NAME_MAP[language],
    });
    return response.data;
  }

  static async getProjectInfo(
    id: string,
    config?: Partial<SpineApiConfig>,
  ): Promise<ProjectInfo> {
    const projectInfo = await this.requestProjectInfo(id, config);
    return new ProjectInfo(projectInfo);
  }

  static async loadImage(url: string): Promise<Uint8Array> {
    // the response is a buffer that contains raw deflated data
    const response = await axios.get<Uint8Array>(url, {
      responseType: 'arraybuffer',
    });
    // zlib seems to add two bytes to the start of the buffer that can't be handled by nodejs/pako\
    // these two bytes are probably a header but none of the nodejs/pako methods seem to be able to handle that
    // therefore these two bytes are simply omitted
    // copy everything but the first two bytes into buffer
    const buffer = new Uint8Array(response.data.buffer,2,response.data.byteLength - 2);
    // lastly we want to decompress the buffer
    return inflateRaw(buffer);
  }

  config: SpineApiConfig;

  constructor(config?: Partial<SpineApiConfig>) {
    const defaultConfig = { ...SpineApi.defaultConfig };
    this.config = config ? merge(defaultConfig, config) : defaultConfig;
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

  async loadImage(url: string): Promise<Uint8Array> {
    return SpineApi.loadImage(url);
  }
}
