import ActionTypes from '../constants/ActionTypes';
import AppDispatcher from '../dispatcher/AppDispatcher';

const ClientActions = {
    getTorrents() {
        global.api
            .post('json', {
                'method': 'web.update_ui',
                'params': [
                    [
                        "queue",
                        "name",
                        "total_wanted",
                        "state",
                        "progress",
                        "num_seeds",
                        "total_seeds",
                        "num_peers",
                        "total_peers",
                        "download_payload_rate",
                        "upload_payload_rate",
                        "eta",
                        "ratio",
                        "distributed_copies",
                        "is_auto_managed",
                        "time_added",
                        "tracker_host",
                        "save_path",
                        "total_done",
                        "total_uploaded",
                        "max_download_speed",
                        "max_upload_speed",
                        "seeds_peers_ratio"
                    ],
                    {}
                ],
                'id': 1
            }).then(response => {
                var torrents = response.data.result.torrents;

                AppDispatcher.dispatch({
                    type: ActionTypes.CLIENT_GET_TORRENTS,
                    data: torrents
                });
            },
            error => {
                console.log(error);
            })
    },
};

export default ClientActions;