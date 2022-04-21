export class GetRatingsDto {
  ProjectID: string | number;

  constructor(id: string | number) {
    this.ProjectID = id;
  }
}
