const fetch = require('node-fetch')

const get = (req, res) => {
  const err = {
    usernotfound: {
      error: 'User Not found',
    },
    noquery: {
      error: 'No query specified',
    },
    unexpected: {
      error: 'Unexpected error(Probably not found user)',
    },
  }
  if (!req.query.id) res.status(400).send(JSON.stringify(err.noquery))
  const id = req.query.id
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

module.exports = {
  get: get,
}
