import { Backend } from "./backend";

class SectionBackend extends Backend {

    getSections = async () => {
        const response = await this.request('/sections')
        return response.rows
    }

    addSection = async (section) => {

        const formData = this.convertToFormData(section)

        const config = {
            method: 'post',
            data: formData
        }

        const response = await this.request('/sections', config)
        return response.rows
    }

    updateSectionTitle = async ({uhash, title: newTitle}) => {
        const body = {
            type: 'title',
            uhash,
            value: newTitle
        }
        const formData = this.convertToFormData(body)

        const config = {
            method: 'put',
            data: formData
        }

        const response = await this.request('/sections', config)
        return response.rows
    }

    updateSectionImage = async ({uhash, previousImageUrls, images}) => {
        const body = {
            type: 'imgurl',
            uhash,
            value: previousImageUrls,
            image: images
        }
        const formData = this.convertToFormData(body)

        const config = {
            method: 'put',
            data: formData
        }

        const response = await this.request('/sections', config)
        return response.rows
    }

    deleteSection = async (uhash) => {

        const config = {method: 'delete'}

        const response = await this.request(`/sections?section_hash=${uhash}`, config)
        return response.rows
    }
}

// exports.module =  {'SectionBackend': (new SectionBackend())}
export default (new SectionBackend())