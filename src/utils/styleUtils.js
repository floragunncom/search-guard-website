export const getColorSchemaCSS = (schemaName) => {
    // set the basic styling, we can do dark, light and white
    if (schemaName === "dark") {
        return "color-schema-dark";
    }
    if (schemaName === "light") {
        return "color-schema-light";
    }
    if (schemaName === "white") {
        return "color-schema-white";
    }

    throw new Error('Color schema only supports dark, ligh and white. Got: ' + schemaName);
};

export const getColorSchemaCSSForSVG = (schemaName) => {
    // set the basic styling, we can do dark, light and white
    if (schemaName === "dark") {
        return "color-schema-svg-dark";
    }
    if (schemaName === "light") {
        return "color-schema-svg-light";
    }
    if (schemaName === "white") {
        return "color-schema-svg-white";
    }
    if (schemaName === "none") {
        return "";
    }
    throw new Error('Color schema only supports dark, light, white and none, got: ' + schemaName);
};