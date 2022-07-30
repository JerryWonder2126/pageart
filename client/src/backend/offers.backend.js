import { Backend } from "./backend";

class OfferBackend extends Backend {

    parseOffers = (offers) => {
        /**
         * Converts every null value in offer to an empty string
         */
        return offers.map(offer => {
            for (let key in offer) {
                let value = offer[key]
                if (value === null) {
                    offer[key] = ''
                }
            }
            if (offer.price) {
                let cleanPrice = offer.price.replace('£', '')
                cleanPrice = cleanPrice.replace(',', '')
                offer.price = Number(cleanPrice)
            }
            return offer
        })
    }

    getOffersBySection = async ({queryKey: [_, sectionHash]}) => {
        if (!sectionHash) return []
        const response = await this.request(`/offers?section=${sectionHash}`)
        return this.parseOffers(response.rows)
    }

    getLatestOffers = async () => {
        const response = await this.request('/offers?latest=true')
        return this.parseOffers(response.rows)
    }

    addOffer = async (offer) => {
        console.log(offer)
        const formData = this.convertToFormData(offer)
    
        const config = {
            method: 'post',
            data: formData
        }

        const response = await this.request('/offers', config)
        return this.parseOffers(response.rows)
    }

    updateOfferText = async (offer) => {

        const formData = this.convertToFormData(offer)

        const config = {
            method: 'put',
            data: formData
        }

        const response = await this.request('/offers?type=text', config)
        return this.parseOffers(response.rows)
    }

    updateOfferImages = async ({uhash, previousImageUrls, images}) => {
        const body = {
            uhash,
            value: previousImageUrls,
            images
        }
        const formData = this.convertToFormData(body)

        const config = {
            method: 'put',
            data: formData
        }

        const response = await this.request('/offers?type=imgurl', config)
        return this.parseOffers(response.rows)
    }

    deleteOfferImage = async ({uhash, nameToDelete, updateWith}) => {
        const body = { uhash, nameToDelete, updateWith }

        const formData = this.convertToFormData(body)

        const config = {
            method: 'put',
            data: formData
        }

        const response = await this.request('/offers?type=imgurl', config)
        return this.parseOffers(response.rows)
    }



    deleteOffer = async (uhash) => {

        const config = {method: 'delete'}

        const response = await this.request(`/offers?offer_hash=${uhash}`, config)
        return response.rows
        
    }

}

export default (new OfferBackend())