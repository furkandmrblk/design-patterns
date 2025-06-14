import { ProxyImage } from "./proxy";


function main() {
    const proxy = new ProxyImage("example.jpg");

    // Image will be loaded from disk only when the `display` method is being called.
    proxy.display();
    // Image will be loaded from cache.
    proxy.display();

    return 0;
};

main();
