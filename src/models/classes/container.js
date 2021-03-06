class Container extends StorageCore
{
    /**
     * @param {Product} product - The product to be added.
     * @throws Error when the product's shelf size exceeds Container capacity!
     *
     * @override
     */
    addItem(product)
    {
        var availableCapacity = this.capacity - this.usedCapacity();

        if (availableCapacity < product.shelfSize()) {
            throw new Error("There is no more capacity in this " + this.name + "; cannot add " + product.name);
        }

        this.items.push(product);
    }

    /**
     * Updates perishable products whenever the next day occurs.
     *
     * @augments StorageCore.updatePerishableProducts()
     */
    updatePerishableProducts()
    {
        this.items = this.items.filter(
            function (product) {
                if (typeof product == "undefined") {
                    return false;
                }

                product.perishable = product.perishable - 1;

                // empty container does not have defined products. Else: product needs to be perishable,
                // and needs to have perished.
                return !(product.isPerishable && product.perishable <= 0)
            }
        );
    }

    /**
     * @override
     */
    usedCapacity()
    {
        return this.items.reduce((sum, prod) => sum + prod.shelfSize(), 0);
    }

    toString()
    {
        return "I am a Container, specifically a " + this.name + "; Currently I have used " + this.usedCapacity()
            + " out of a total capacity of " + this.capacity + ", and I have " + this.items.length
            + " Products in storage.";
    }
}
