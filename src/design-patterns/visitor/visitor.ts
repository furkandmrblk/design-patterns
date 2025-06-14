//* Visitor Interface
interface ShapeVisitor {
    visit(circle: Circle): void;
    visit(square: Square): void;
    visit(triangle: Triangle): void;
}

//* Element Interface
interface Shape {
    accept(visitor: ShapeVisitor): void;
}

//* Concrete Elements
export class Circle implements Shape {
    accept(visitor: ShapeVisitor): void {
        visitor.visit(this);
    }
}

export class Square implements Shape {
    accept(visitor: ShapeVisitor): void {
        visitor.visit(this);
    }
}

export class Triangle implements Shape {
    accept(visitor: ShapeVisitor): void {
        visitor.visit(this);
    }
}

//* Concrete Visitors
export class AreaCalculator implements ShapeVisitor {
    private totalArea: number = 0;


    visit(circle: Circle): void;
    visit(square: Square): void;
    visit(triangle: Triangle): void;
    visit(prop: unknown): void {
        if (prop instanceof Circle) {
            this.totalArea += Math.PI * Math.pow(5, 2);
        }

        if (prop instanceof Square) {
            this.totalArea += Math.pow(4, 2);
        }

        if (prop instanceof Triangle) {
            this.totalArea += (3 * 6) / 2
        }
    }

    getTotalArea(): number {
        return this.totalArea;
    }
}