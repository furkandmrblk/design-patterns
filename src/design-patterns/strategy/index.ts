import { BubbleSortStragey, MergeSortStrategy, QuickSortStrategy, SortingContext } from "./strategy";

function main() {
    const arr = [3,5,8,10];

    const sortingContext = new SortingContext(new BubbleSortStragey());
    sortingContext.performSort(arr);

    sortingContext.setSortingStrategy(new MergeSortStrategy());
    sortingContext.performSort(arr);

    sortingContext.setSortingStrategy(new QuickSortStrategy());
    sortingContext.performSort(arr);

    return 0;
};

main();
