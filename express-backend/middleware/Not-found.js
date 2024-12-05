const not_found = (req, res) => {
    res.status(404).send(`<div style='margin: 20px 0 0 10px;'>
    <h1>Ooooooooooooops!!</h1>
    <p>The requested endpoint url can not be found</p>
    <a href='/api/v1/blog'>Back Home</a>
    </div>`)
}

module.exports = not_found;