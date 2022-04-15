export class GetReviewsDto {
  ProjectID: string | number;

  constructor(id: string | number) {
    this.ProjectID = id;
  }
}
