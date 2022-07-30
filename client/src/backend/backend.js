import axios from 'axios'

export class Backend {

    constructor() {
        this._API_PREFIX = process.env.REACT_APP_API_PREFIX || ''
    }

    request = async (url, config={}) => {
        const defaultConfig = {
            baseURL: this._API_PREFIX,
            withCredentials: true
        }

        const reqObj = await axios({url, ...defaultConfig, ...config})
        return reqObj.data
    }

    convertToFormData = (data) => {
        let formData = new FormData()
        for (let field in data) {
            let value = data[field]
            if (value.type === 'image') {
            for (let key in value) {
                let image = value[key]
                if (typeof(image) !== 'string') {
                formData.append('image', image)
                }
            }
            } else {
            formData.append(field, value)
            }
        }
        return formData
    }
}