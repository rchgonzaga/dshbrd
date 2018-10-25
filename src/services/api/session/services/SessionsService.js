export default class SessionsService {
  /**
   * Get Current session
   * @returns {Promise}
   */
  async getSession() {
    let data = await fetch("http://10.184.248.123:8080/relations")
      .then(res => {
        return res.json();
      })
      .catch(err => {
        console.log("Error: ", err);
      });
    return data;
  }
}

