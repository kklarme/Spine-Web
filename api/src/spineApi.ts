import axios from 'axios';
import { inflateRaw } from 'pako';
import { merge } from './utilities';
import { Language } from './language';
import {
  GetNewsDto,
  GetNewsResponse,
  GetNewsResult,
  GetProjectInfoDto,
  GetProjectInfoResult,
  GetProjectsDto,
  GetProjectsResponse,
  GetProjectsResult,
  GetRatingsDto,
  GetRatingsResponse,
  GetRatingsResult,
  GetReviewsDto,
  GetReviewsResponse,
  GetReviewsResult,
} from './endpoints';
import { SpineProjectInfo } from './models';

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

  static async getProjects(config?: Partial<SpineApiConfig>): Promise<GetProjectsResult> {
    const { serverUrl, credentials, language } = config
      ? merge(this.defaultConfig, config)
      : this.defaultConfig;
    const response = await axios.post<GetProjectsResponse>(
      `${serverUrl}/requestAllProjects`,
      new GetProjectsDto(credentials.username, credentials.password, language),
    );
    return new GetProjectsResult(response.data);
  }

  static async getProjectInfo(
    projectId: string | number,
    config?: Partial<SpineApiConfig>,
  ): Promise<GetProjectInfoResult> {
    const { serverUrl, credentials, language } = config
      ? merge(this.defaultConfig, config)
      : this.defaultConfig;
    const response = await axios.post<SpineProjectInfo>(
      `${serverUrl}/requestInfoPage`,
      new GetProjectInfoDto(projectId, credentials.username, credentials.password, language),
    );
    return new GetProjectInfoResult(response.data);
  }

  static async getNews(config?: Partial<SpineApiConfig>): Promise<GetNewsResult> {
    const { serverUrl, language } = config ? merge(this.defaultConfig, config) : this.defaultConfig;
    const response = await axios.post<GetNewsResponse>(
      `${serverUrl}/requestAllNews`,
      new GetNewsDto(language),
    );
    return new GetNewsResult(response.data);
  }

  static async getRatings(
    projectId: string | number,
    config?: Partial<SpineApiConfig>,
  ): Promise<GetRatingsResult> {
    const { serverUrl } = config ? merge(this.defaultConfig, config) : this.defaultConfig;
    const response = await axios.post<GetRatingsResponse>(
      `${serverUrl}/getRatings`,
      new GetRatingsDto(projectId),
    );
    return new GetRatingsResult(response.data);
  }

  static async getReviews(
    projectId: string | number,
    config?: Partial<SpineApiConfig>,
  ): Promise<GetReviewsResult> {
    const { serverUrl } = config ? merge(this.defaultConfig, config) : this.defaultConfig;
    const response = await axios.post<GetReviewsResponse>(
      `${serverUrl}/getReviews`,
      new GetReviewsDto(projectId),
    );
    return new GetReviewsResult(response.data);
  }

  static async loadImage(url: string): Promise<Uint8Array> {
    // the response is a binary text that contains raw deflated data
    const response = await axios.get<string>(url, {
      responseType: 'text',
      responseEncoding: 'binary',
    });
    const responseBuffer = this.convertBinaryToBuffer(response.data);
    return this.decompressImage(responseBuffer);
  }

  static decompressImage(imageBuffer: Uint8Array): Uint8Array {
    // zlib seems to add two bytes to the start of the buffer that can't be handled by nodejs/pako
    // these two bytes are probably a header but none of the nodejs/pako methods seem to be able to handle that
    // therefore these two bytes are simply omitted
    // -> copy everything but the first two bytes into buffer
    const buffer = new Uint8Array(imageBuffer.buffer, 2, imageBuffer.byteLength - 2);
    // lastly we want to decompress the buffer
    return inflateRaw(buffer);
  }

  private static convertBinaryToBuffer(binary: string): Uint8Array {
    if (typeof window === 'undefined') {
      return Buffer.from(binary, 'binary');
    }
    const buffer = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      buffer[i] = binary.charCodeAt(i);
    }
    return buffer;
  }

  config: SpineApiConfig;

  constructor(config?: Partial<SpineApiConfig>) {
    const defaultConfig = { ...SpineApi.defaultConfig };
    this.config = config ? merge(defaultConfig, config) : defaultConfig;
  }

  async getProjects(): Promise<GetProjectsResult> {
    return SpineApi.getProjects(this.config);
  }

  async getProjectInfo(projectId: string | number): Promise<GetProjectInfoResult> {
    return SpineApi.getProjectInfo(projectId, this.config);
  }

  async getNews(): Promise<GetNewsResult> {
    return SpineApi.getNews(this.config);
  }

  async getRatings(projectId: string | number): Promise<GetRatingsResult> {
    return SpineApi.getRatings(projectId);
  }

  async getReviews(projectId: string | number): Promise<GetReviewsResult> {
    return SpineApi.getReviews(projectId);
  }

  async loadImage(url: string): Promise<Uint8Array> {
    return SpineApi.loadImage(url);
  }
}
