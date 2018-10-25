export default class SessionsService {
  /**
   * Get Current session
   * @returns {Promise}
   */
  async getSession() {
    let response = await fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      body: JSON.stringify({
        title: 'foo',
        body: 'bar',
        userId: 1
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    });
    // only proceed once promise is resolved
    let data = await response.json();
    console.log(data)
  }

}