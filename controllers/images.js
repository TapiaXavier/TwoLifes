const FormData = require('form-data')
const fetch = require('node-fetch');

function upload(req, res, next) {
    const formData = new FormData()
    formData.append('file', req.body.file);
    formData.append('upload_preset', process.env.CLOUDINARY_PRESET)

    const requestOptions = {
        method: 'POST',
        body: formData
    }

    const tryUpload = async () => {
        try {
            const response = await fetch(process.env.CLOUDINARY_URL, requestOptions)
            const data = await response.json()
            res.json(data)
        }
        catch (error) {
            console.log(error)
            next()
        }
    }

    tryUpload()
}

module.exports = { upload }