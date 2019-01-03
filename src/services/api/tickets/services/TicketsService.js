import fetchWithTimeout from "../../../../util/fetchWithTimeout";

export default class TicketsService {
  /**
   * Get Current session
   * @returns {Promise}
   */
  async getSession(route) {
    let data = await fetchWithTimeout(`http://10.183.114.98:8080/relations/${route}`)
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
  async getCurrentJiraStatus(route) {
    let data = await fetchWithTimeout(`http://10.183.114.98:8080/boardsstatus/${route}`)
      .then(res => {
        return res.json();
      })
      .catch(err => {
        console.log("Error: ", err);
      });
    return data;
  }
}