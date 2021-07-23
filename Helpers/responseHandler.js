

const success = (req, res, data, message) => {
    res.json({
        status: 200,
        data: data,
        message: message
    })
}

const error = (req, res, error) => {
    res.json({
        status: 400,
        message: error.message || error
    })
}

module.exports = {
    success,
    error
}
