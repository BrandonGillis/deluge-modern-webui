import AppStore from './AppStore';
import ActionTypes from '../constants/ActionTypes';
import AppDispatcher from '../dispatcher/AppDispatcher';

class TorrentStore extends AppStore {
    constructor() {
        super();
        this.dispatchToken = AppDispatcher.register(this.dispatcherCallback.bind(this));
        this.torrents = {};
        this.selectedTorrent = null;
    }

    getAllTorrents() {
        return this.torrents;
    }

    getSelectedTorrent() {
        return this.selectedTorrent;
    }

    handleGetTorrents(data) {
        this.torrents = data;
        this.emit(ActionTypes.CLIENT_GET_TORRENTS_SUCCESS);
    }

    handleSelectTorrent(selection) {
        this.selectedTorrent = selection;
    }

    handlePauseTorrent(hash) {
        if (this.torrents[hash].state === "Downloading") {
            this.torrents[hash].state = "Paused";
            this.emit(ActionTypes.CLIENT_GET_TORRENTS_SUCCESS);
        }
    }

    handleResumeTorrent(hash) {
        if (this.torrents[hash].state === "Paused") {
            this.torrents[hash].state = "Downloading";
            this.emit(ActionTypes.CLIENT_GET_TORRENTS_SUCCESS);
        }
    }

    dispatcherCallback(action) {
        switch (action.type) {
            case ActionTypes.CLIENT_GET_TORRENTS:
                this.handleGetTorrents(action.data);
                break;
            case ActionTypes.CLIENT_SELECT_TORRENT:
                this.handleSelectTorrent(action.data);
                break;
            case ActionTypes.CLIENT_PAUSE_TORRENT_SUCCESS:
                this.handlePauseTorrent(action.data);
                break;
            case ActionTypes.CLIENT_RESUME_TORRENT_SUCCESS:
                this.handleResumeTorrent(action.data);
                break;

            default:
                break;
        }
    }
}

export default new TorrentStore();