import { create_attribute, create_category_attribute } from "./create.js";
import { get_attribute_catalog, get_category_attribute, get_one_attribute_catalog, get_one_category_attribute } from "./get.js";
import { remove_attribute_catalog, remove_category_attribute } from "./remove.js";
import { update_attribute_catalog, update_category_attribute } from "./update.js";

// loai thuoc tinh
const Category_attribute = {
    get_category_attribute,
    get_one_category_attribute,
    create_category_attribute,
    update_category_attribute,
    remove_category_attribute
}

const Attribute_catalog = {
    get_attribute_catalog,
    get_one_attribute_catalog,
    create_attribute,
    remove_attribute_catalog,
    update_attribute_catalog
};


export {
    Category_attribute,
    Attribute_catalog
}