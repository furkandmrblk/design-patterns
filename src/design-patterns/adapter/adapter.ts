type MediaPlayerFileTypes = "MP4" | "WAV" | "MOV" | "AVI" | "MP3";

// * Target Interface
export class MediaPlayer {
    public play(filetype: MediaPlayerFileTypes): void {
        console.log(`Playing ${filetype} from modern player`);
    }
}

// * Adaptee
class LegacyMediaPlayer {
    public playMP3(): void {
        console.log("Playing MP3 from legacy player");
    }

    public playAVI(): void {
        console.log("Playing AVI from legacy player");
    }
}

// * Adapter
export class MediaPlayerAdapter extends MediaPlayer {
    constructor (private adaptee: LegacyMediaPlayer = new LegacyMediaPlayer()) {
        super();    
    }

    public override play(filetype: string): void {
        if (filetype === 'AVI') this.adaptee.playAVI();
        if (filetype === 'MP3') this.adaptee.playMP3();
    }
}

// * Client code
export function mediaPlayerClient(mediaPlayer: MediaPlayer, filetype: MediaPlayerFileTypes) {
    mediaPlayer.play(filetype);
}