import axios from 'axios';
import { inflateRaw } from 'pako';
import { merge } from './utilities';
import { Language } from './language';
import {
  GetRatingsDto,
  GetRatingsResponse,
  GetReviewsDto,
  GetReviewsResponse,
  Project,
  ProjectInfo,
  SpineProjectInfo,
  RequestAllProjectsDto,
  RequestAllProjectsResponse,
  RequestProjectInfoDto,
} from './project';
import { RequestAllNewsDto, RequestAllNewsResponse } from './news';

export interface Credentials {
  username: string;
  password: string;
}

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
    language: Language.German,
  };

  static async requestAllProjects(
    config?: Partial<SpineApiConfig>,
  ): Promise<RequestAllProjectsResponse> {
    const { serverUrl, credentials, language } = config
      ? merge(this.defaultConfig, config)
      : this.defaultConfig;
    const response = await axios.post(
      `${serverUrl}/requestAllProjects`,
      new RequestAllProjectsDto(credentials.username, credentials.password, language),
    );
    return response.data;
  }

  static async getProjects(config?: Partial<SpineApiConfig>): Promise<Project[]> {
    const response = await this.requestAllProjects(config);
    return response.Projects.map(
      (project) =>
        new Project(
          project,
          response.Packages.filter((pkg) => pkg.ProjectID === project.ProjectID),
          response.PlayedProjects?.some((playedProject) => project.ProjectID === playedProject.ID),
        ),
    );
  }

  static async requestProjectInfo(
    id: string | number,
    config?: Partial<SpineApiConfig>,
  ): Promise<SpineProjectInfo> {
    const { serverUrl, credentials, language } = config
      ? merge(this.defaultConfig, config)
      : this.defaultConfig;
    const response = await axios.post(
      `${serverUrl}/requestInfoPage`,
      new RequestProjectInfoDto(id, credentials.username, credentials.password, language),
    );
    return response.data;
  }

  static async getProjectInfo(
    id: string | number,
    config?: Partial<SpineApiConfig>,
  ): Promise<ProjectInfo> {
    const projectInfo = await this.requestProjectInfo(id, config);
    return new ProjectInfo(projectInfo);
  }

  static async requestAllNews(config?: Partial<SpineApiConfig>): Promise<RequestAllNewsResponse> {
    const { serverUrl, language } = config ? merge(this.defaultConfig, config) : this.defaultConfig;
    const response = await axios.post(
      `${serverUrl}/requestAllNews`,
      new RequestAllNewsDto(language),
    );
    return response.data;
  }

  static async getRatings(
    id: string | number,
    config?: Partial<SpineApiConfig>,
  ): Promise<GetRatingsResponse> {
    const { serverUrl } = config ? merge(this.defaultConfig, config) : this.defaultConfig;
    const response = await axios.post(`${serverUrl}/getRatings`, new GetRatingsDto(id));
    return response.data;
  }

  static async getReviews(
    id: string | number,
    config?: Partial<SpineApiConfig>,
  ): Promise<GetReviewsResponse> {
    const { serverUrl } = config ? merge(this.defaultConfig, config) : this.defaultConfig;
    const response = await axios.post(`${serverUrl}/getReviews`, new GetReviewsDto(id));
    return response.data;
  }

  static async loadImage(url: string): Promise<Uint8Array> {
    // the response is a buffer that contains raw deflated data
    const response = await axios.get<Uint8Array>(url, {
      responseType: 'arraybuffer',
    });
    // zlib seems to add two bytes to the start of the buffer that can't be handled by nodejs/pako
    // these two bytes are probably a header but none of the nodejs/pako methods seem to be able to handle that
    // therefore these two bytes are simply omitted
    // copy everything but the first two bytes into buffer
    const buffer = new Uint8Array(response.data.buffer, 2, response.data.byteLength - 2);
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

  async requestProjectInfo(id: string | number): Promise<SpineProjectInfo> {
    return SpineApi.requestProjectInfo(id, this.config);
  }

  async getProjectInfo(id: string | number): Promise<ProjectInfo> {
    return SpineApi.getProjectInfo(id, this.config);
  }

  async requestAllNews(): Promise<RequestAllNewsResponse> {
    return SpineApi.requestAllNews(this.config);
  }

  async getRatings(id: string | number): Promise<GetRatingsResponse> {
    return SpineApi.getRatings(id);
  }

  async getReviews(id: string | number): Promise<GetReviewsResponse> {
    return SpineApi.getReviews(id);
  }

  async loadImage(url: string): Promise<Uint8Array> {
    return SpineApi.loadImage(url);
  }
}
