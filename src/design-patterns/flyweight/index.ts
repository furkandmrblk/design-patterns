import { IconFactory } from "./flyweight";

function main() {
    const iconFactory = new IconFactory();

    const fileIcon = iconFactory.getIcon("file");
    fileIcon.draw(100, 100);

    const fileIcon2 = iconFactory.getIcon("file");
    fileIcon2.draw(150, 150);

    const folderIcon = iconFactory.getIcon("folder");
    folderIcon.draw(200, 200);

    const folderIcon2 = iconFactory.getIcon("folder");
    folderIcon2.draw(250, 250);

    return 0;
};

main();
