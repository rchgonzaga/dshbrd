import fetchWithTimeout from "../../../../util/fetchWithTimeout";

export default class TicketsService {
  /**
   * Get Current session
   * @returns {Promise}
   */
  async getSession(port) {
    let data = await fetchWithTimeout(`http://10.183.120.7:${port}/relations`)
      .then(res => {
        return res.json();
      })
      .catch(err => {
        console.log("Error: ", err);
      });
    return data;
  }
  /**
   * Get Current session
   * @returns {Promise}
   */
  async getCurrentJiraStatus(port) {
    let data = await fetchWithTimeout(`http://10.183.120.7:${port}/updatejiraboardsstatus`)
      .then(res => {
        return res.json();
      })
      .catch(err => {
        console.log("Error: ", err);
      });
    return data;
  }
}