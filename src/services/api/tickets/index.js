import TicketsService from "./services/TicketsService";

export class Sessions {
  constructor() {
    this.service = new TicketsService(this);
    return this.service;
  }
}

export default new Sessions();