# BlackListenerAPI By Swagger

## What you need to use/listen/start API

- You need a few commands before using this API.
- You need ``npm i -g swagger`` for download a swagger cli.
- Change the directory to ``BlackListenerAPI`` and Run ``npm i`` for download dependencies.
- To using this API, type ``swagger project start BlackListenerAPI``.
- Your API Server will start in 0.0.0.0:10010

## Test your API

### Using cURL

``curl http://localhost:10010/user?id=<Discord User ID>``

### Using fetch()

#### Using Promise#then()

```javascript
fetch('http://localhost:10010/user?id=<Discord User ID>').then(response => {
  response.json().then(json => {
    // do something
  })
})
```

#### Using await Promise

```javascript
const response = fetch('http://localhost:10010/user?id=<Discord User ID>')
const json = await response.json()
// do something
```

## What JSON Contains

## GET User

- User Reputation [number]
- Where a user got banned from a server(and server owner) [String]
- Who banned a user [String]
- Probes (Image URL) [String]
- Why a user got ban (Reasons) [String]
- Username changes(not working) [Array\<String\>]
- Nickname changes(not working) [{Object|Array}\<Array\<String\>\>]
- Avatar changes(not working) [Array\<String\>]
