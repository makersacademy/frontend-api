class ChitterApi {
  async loadPeeps(callback) {
    try {
      const response = await fetch('https://chitter-backend-api-v2.herokuapp.com/peeps');
      const notes = await response.json();
      return callback(notes);
    } catch (error) {
      console.log(error);
    }
  }

  async createPeep(peep, callback) {
    try {
      const response = await fetch('https://chitter-backend-api-v2.herokuapp.com/peeps', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content: peep }),
      });
      const peeps = await response.json();
      return callback(peeps);
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = ChitterApi;