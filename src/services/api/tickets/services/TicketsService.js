import fetchWithTimeout from "../../../../util/fetchWithTimeout";

export default class TicketsService {
  /**
   * Get Current session
   * @returns {Promise}
   */
  async getSession() {
    let data = await fetchWithTimeout("http://10.184.248.106:8080/relations")
      .then(res => {
        return res.json();
      })
      .catch(err => {
        console.log("Error: ", err);
      });
    return data;
  }
}