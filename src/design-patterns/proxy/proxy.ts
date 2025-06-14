//* Subject
interface Image {
    display(): void;
}

//* RealSubject
class RealImage implements Image {
    private filename: string;

    constructor(filename: string) {
        this.filename = filename;
        this.loadImageFromDisk();
    }


    loadImageFromDisk(): void {
        console.log("Loading image: " + this.filename);
    }

    display(): void {
        console.log("Displaying image: ", this.filename);
    }
}


//* Proxy
export class ProxyImage implements Image {
    private filename: string;
    private realImage!: RealImage;

    constructor(filename: string) {
        this.filename = filename;
    }

    display(): void {
        if (!this.realImage) {
            this.realImage = new RealImage(this.filename);
        } else {
            console.log("[Retrieving image from cache]");
        }

        this.realImage.display();
    }
}
