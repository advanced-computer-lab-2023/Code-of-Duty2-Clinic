
export default interface Medicine {
    name: { type: string, required: true, unique: true, index: true },
    activeIngredients: { type: [string], required: true },
    price: { type: number, required: true, min: 0 },
    availableQuantity: { type: number, required: true },
    pictureUrl: { type: string },
    description: { type: string },
    usages: { type: [string] },
    isOverTheCounter: { type: boolean },
    isArchived: { type: boolean, required: true }
}
