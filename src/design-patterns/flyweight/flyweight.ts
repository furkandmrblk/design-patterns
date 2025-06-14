interface Icon {
    draw(x: number, y: number): void;
}

class FileIcon implements Icon {
    private type: string;
    private imageName: string;

    constructor(type: string, imageName: string) {
        this.type = type;
        this.imageName = imageName;
    }

    draw(x: number, y: number): void {
        console.log(`Drawing ${this.type} icon with image ${this.imageName} at position (${x},${y})`);
    }
}

class FolderIcon implements Icon {
    private color: string;
    private imageName: string;

    constructor(color: string, imageName: string) {
        this.color = color;
        this.imageName = imageName;
    }

    draw(x: number, y: number): void {
        console.log(`Drawing folder icon with color ${this.color} and image ${this.imageName} at position (${x},${y})`);
    }
}

export class IconFactory {
    private cache: Map<string, Icon> = new Map();

    getIcon(key: string): Icon {
        if (this.cache.has(key)) {
            console.log("[Retrieving item from cache]");
            return this.cache.get(key)!;
        }

        let icon: Icon;
        switch (key) {
            case "file":
                icon = new FileIcon("document", "document.png");
                break;
            case "folder":
                icon = new FolderIcon("blue", "folder.png");
                break;
            default:
                throw new Error("Unsupported icon type: " + key);
        }

        this.cache.set(key, icon);
        return icon;
    }
} 