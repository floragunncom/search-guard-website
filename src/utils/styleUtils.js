export const getColorSchemaCSS = (schemaName) => {
    // set the basic styling, we can do dark, light and white
    if (schemaName === "dark") {
        return "color-schema-dark"
    }
    if (schemaName === "light") {
        return "color-schema-light"
    }
    if (schemaName === "white") {
        return "color-schema-white"
    }

    throw new Error('Color schema only supports dark, light and white');
};
