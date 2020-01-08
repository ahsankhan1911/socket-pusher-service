const sqlite = require('sqlite')
const Promise = require('bluebird')

const dbPromise = sqlite.open('./database.sqlite', { Promise })

class AppDao {

  async createProjecTable() {
    let db = await dbPromise
    return db.run('CREATE TABLE IF NOT EXISTS project (projectName text, hostIp text)')

  }

  async  createProject(data) {
    let db = await dbPromise
    return db.run(`INSERT INTO project ('projectName', 'hostIp') VALUES('${data.projectName}', '${data.hostIp}')`)
  }

  async getAllProjects() {
    let db = await dbPromise
    return db.all('SELECT * FROM project')
  }

  async getProject(projectName) {
    let db = await dbPromise
    return db.all(`SELECT projectName FROM project WHERE projectName="${projectName}"`)
  }

  async getAllowedOrigins () {
    let db = await dbPromise
    return db.all(`SELECT hostIp from project`)
  }

}

const appdoa = new AppDao()
module.exports = appdoa