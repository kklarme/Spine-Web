export interface RawPlayedProject {
  ID: number;
}

export class PlayedProject {
  id: number;

  constructor(playedProject: RawPlayedProject) {
    this.id = playedProject.ID;
  }
}
