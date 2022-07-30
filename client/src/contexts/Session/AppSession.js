class AppSession {

    constructor(ID) {
        this.sessionID = ID
    }

    __state = () => {
        let dashboardState = localStorage.getItem(this.sessionID)
        return dashboardState ? JSON.parse(dashboardState) : {history: [], dashHistory: [], service: ''}
    }

    __saveState = (state) => localStorage.setItem(this.sessionID, JSON.stringify(state))

    __clearState = () => localStorage.removeItem(this.sessionID)

    updateState = (name, value) => {
        const state = this.__state()
        state[name] = value
        this.__saveState(state)
    }

    updateService = (service) => this.updateState('service', service)

    getService = () => this.__state().service

    getCurrView = (historyToUpdate) => {
        let defAction = historyToUpdate === 'history' ? 'home' : 'admin:services'
        let action = this.__state()[historyToUpdate].length ? this.__state()[historyToUpdate].slice(-1)[0] : {view: defAction}
        return action
    }

    goBack = (historyToUpdate) => {
        const history = this.__state()[historyToUpdate]
        let action = historyToUpdate === 'history' ? {view: 'home'} : {view: 'admin:services'}
        if (history.length) history.pop() //Remove currView from history
        if (history.length) {
            action = history.splice(-1)[0] // The latest view is now the previous view
        }
        this.updateState(historyToUpdate, history) // Update history
        return action
    }

    updateHistory = (action, historyToUpdate) => {
        const history = this.__state()[historyToUpdate]
        history.push(action)
        this.updateState(historyToUpdate, history)
    }

    // updateCurrView = (action) => this.updateState('currView', action)

    // updateView = (prevAction, currAction) => {
    //     this.updateCurrView(currAction)
    //     this.updatePrevView(prevAction)
    // }
}

export default (new AppSession('ArtStore'))