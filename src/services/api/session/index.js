import SessionsService from "./services/SessionsService";

export class Sessions {
  constructor() {
    this.service = new SessionsService(this);
    return this.service;
  }
}

export default new Sessions();