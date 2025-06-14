import { CRRequest, Level1SupportHandler, Level2SupportHandler, Level3SupportHandler, Priority } from "./chain-of-responsibility";

function main() {
    const lv1 = new Level1SupportHandler();
    const lv2 = new Level2SupportHandler();
    const lv3 = new Level3SupportHandler();

    lv1.setNextHandler(lv2);
    lv2.setNextHandler(lv3);

    const basicRequest = new CRRequest(Priority.BASIC);
    const intermediateRequest = new CRRequest(Priority.INTERMEDIATE);
    const criticalRequest = new CRRequest(Priority.CRITICAL);

    lv1.handleRequest(basicRequest);
    lv1.handleRequest(intermediateRequest);
    lv1.handleRequest(criticalRequest);

    return 0;
};

main();
