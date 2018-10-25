export default class SessionsService {
  /**
   * Get Current session
   * @returns {Promise}
   */
  async getSession() {
    let data = await (await (fetch('https://jsonplaceholder.typicode.com/users')
      .then(res => {
        return res.json()
      })
      .catch(err => {
        console.log('Error: ', err)
      })
    ))
    return data
  }

}