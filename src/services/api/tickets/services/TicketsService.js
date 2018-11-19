import fetchWithTimeout from "../../../../util/fetchWithTimeout";

export default class TicketsService {
  /**
   * Get Current session
   * @returns {Promise}
   */
  async getSession(port) {
    let data = await fetchWithTimeout(`http://10.184.248.106:${port}/relations`)
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
    let data = await fetchWithTimeout(`http://10.184.248.106:${port}/boardsstatus`)
      .then(res => {
        return res.json();
      })
      .catch(err => {
        console.log("Error: ", err);
      });
    return data;
  }
}