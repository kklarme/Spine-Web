export interface SpinePlayedProject {
  ID: string;
}

export class PlayedProject {
  id: number;

  constructor(playedProject: SpinePlayedProject) {
    this.id = parseInt(playedProject.ID);
  }
}
