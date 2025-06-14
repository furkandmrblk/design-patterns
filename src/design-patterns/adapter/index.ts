import { MediaPlayer, MediaPlayerAdapter, mediaPlayerClient } from "./adapter";


function main() {
    const modernPlayer = new MediaPlayer();
    const adapter = new MediaPlayerAdapter();
    mediaPlayerClient(modernPlayer, "AVI");
    mediaPlayerClient(adapter, "AVI");

    return 0;
};

main();
