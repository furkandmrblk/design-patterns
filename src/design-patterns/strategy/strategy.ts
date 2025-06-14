
export class SortingContext {
    private sortingStrategy: SortingStrategy;

    constructor(sortingStrategy: SortingStrategy) {
        this.sortingStrategy = sortingStrategy;
    }

    setSortingStrategy(sortingStrategy: SortingStrategy): void {
        this.sortingStrategy = sortingStrategy;
    }

    performSort(arr: number[]): void {
        this.sortingStrategy.sort(arr);
    }
}

interface SortingStrategy {
    sort(arr: number[]): void
}

export class BubbleSortStragey implements SortingStrategy {
    sort(arr: number[]): void {
        console.log("Sorting algorithm: Bubble Sort");
    }
}

export class MergeSortStrategy implements SortingStrategy {
    sort(arr: number[]): void {
        console.log("Sorting algorithm: Merge Sort");
    }
}

export class QuickSortStrategy implements SortingStrategy {
    sort(arr: number[]): void {
        console.log("Sorting algorithm: Quick Sort");
    }
}