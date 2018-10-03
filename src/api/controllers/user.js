//const config = require(__dirname + '/../../config.yml') // pointing src directory/config.yml
const fetch = require('node-fetch')

const get = async (req, res) => {
  const err = {
    usernotfound: {
      error: 'User Not found.',
    },
    noquery: {
      error: 'You need the least one queries.',
    },
    unexpected: {
      error: 'Unexpected error(Probably not found user).',
    },
    noclient: {
      error: 'Not found Client file / Not specified BlackListener Location.',
    },
    client_notready: {
      error: 'Discord Client is not ready.',
    },
  }
  try {
    const fetchByID = id => {
      fetch(`https://compute.blacklistener.tk/data/users/${id}/config.json`).then(response => {
        if (!response.ok) return res.status(404).send(JSON.stringify(err.usernotfound))
        response.json().catch(e => {
          err.unexpected.message = e
          return res.status(500).send(JSON.stringify(err.unexpected))
        }).then(json => {
          return res.send(JSON.stringify(json))
        })
      }).catch(e => {
        err.unexpected.message = e
        return res.status(500).send(JSON.stringify(err.unexpected))
      })
    }
    const id = req.query.id
    //const tag = req.query.tag
    //const username = req.query.username
    //const avatarURL = req.query.avatarURL
    if (!id) return res.status(400).send(JSON.stringify(err.noquery))
    if (id) {
      fetchByID(id)
    }/* else if (tag) { // how to get by tag? use client? use database?
      const user = client.users.find(n => n.tag === tag)
      if (!user) return res.status(404).send(JSON.stringify(err.usernotfound))
      fetchByID(user.id)
    } else if (username) {
      const user = client.users.find(n => n.username === username)
      if (!user) return res.status(404).send(JSON.stringify(err.usernotfound))
      fetchByID(user.id)
    } else if (avatarURL) {
      const user = client.users.find(n => n.avatarURL === avatarURL)
      if (!user) return res.status(404).send(JSON.stringify(err.usernotfound))
      fetchByID(user.id)
    }*/
  } catch(e) {
    err.unexpected.message = e
    err.unexpected.stack = e.stack || e
    res.status(500).send(JSON.stringify(err.unexpected))
  }
}

module.exports = {
  get: get,
}
