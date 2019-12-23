const sqlite = require('sqlite')
const Promise = require('bluebird')

const dbPromise = sqlite.open('./database.sqlite', {Promise})

 class AppDao {

  async createProjecTable () {
    let db = await dbPromise
      return db.run('CREATE TABLE IF NOT EXISTS project (eventName text,projectName text)')
        
  }  

  async  createProject(data) {  
    let db = await dbPromise
    return db.run(`INSERT INTO project ('eventName','projectName') VALUES('${data.eventName}','${data.projectName}')`)
    }

  async getAllProjects () {
      let db = await dbPromise
     return db.all('SELECT * FROM project')
  }

}

const appdoa = new AppDao()
module.exports = appdoa