export interface RawPlayedProject {
  ID: string;
}

export class PlayedProject {
  id: number;

  constructor(playedProject: RawPlayedProject) {
    this.id = parseInt(playedProject.ID);
  }
}
