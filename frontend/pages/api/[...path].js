import httpProxy from 'http-proxy'

const proxy = httpProxy.createProxyServer()

export const config = {
  api: { bodyParser: false, externalResolver: true }
}

const target = process.env.BACKEND_URL || 'http://localhost:5000'

export default function handler(req, res) {
  return new Promise((resolve, reject) => {
    proxy.web(req, res, { target }, (err) => {
      console.error('Proxy error:', err)
      res.status(500).end('Proxy error')
      resolve()
    })
  })
}
