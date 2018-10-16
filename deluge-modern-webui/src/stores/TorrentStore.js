import AppStore from './AppStore';
import ActionTypes from '../constants/ActionTypes';
import AppDispatcher from '../dispatcher/AppDispatcher';

class TorrentStore extends AppStore {
    constructor() {
        super();
        this.dispatchToken = AppDispatcher.register(this.dispatcherCallback.bind(this));
        this.torrents = {};
    }

    getAllTorrents() {
        return this.torrents;
    }

    handleGetTorrents(data) {
        this.torrents = data;
        this.emit(ActionTypes.CLIENT_GET_TORRENTS_SUCCESS);
    }

    dispatcherCallback(action) {
        switch (action.type) {
            case ActionTypes.CLIENT_GET_TORRENTS:
                this.handleGetTorrents(action.data);
                break;

            default:
                break;
        }
    }
}

export default new TorrentStore();