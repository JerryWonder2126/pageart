import { Backend } from "./backend";

class AuthBackend extends Backend {

    login = async (authDetails) => {

        const formData = this.convertToFormData(authDetails)

        const config = {
            method: 'post',
            data: formData
        }

        return await this.request('/auth/login', config)
    }

    logout = async () => {

        const config = {
            method: 'post',
            data: null
        }

        return await this.request('/auth/logout', config)
    }

    getAuthState = async () => await this.request('/auth/state')

}

export default (new AuthBackend())