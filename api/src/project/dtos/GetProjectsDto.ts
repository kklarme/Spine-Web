import { Language, LANGUAGE_NAME_MAP } from '../../language';

export class GetProjectsDto {
  Username: string | null;
  Password: string | null;
  Language: string;

  constructor(username: string | null, password: string | null, language: Language) {
    this.Username = username;
    this.Password = password;
    this.Language = LANGUAGE_NAME_MAP[language];
  }
}
