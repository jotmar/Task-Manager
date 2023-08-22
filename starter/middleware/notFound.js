const notFound = (req, res) => {
  res.status(404).send(`Route doesn't exists <a href="/index.html">Home</a>`)
}

module.exports = notFound
