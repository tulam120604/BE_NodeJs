import Products from '../../Model/Products/Products.js';
import { StatusCodes } from 'http-status-codes';


// get all
export async function get_Item_Dashboard(req, res) {
    const {
        _page = 1,
        _limit = 20,
        _search = ''
    } = req.query;
    const options = {
        page: _page,
        limit: _limit,
        sort: { createdAt: -1 }
    }
    try {
        const querry = {};
        if (_search) {
            querry.$and = [
                {
                    short_name: { $regex: new RegExp(_search, 'i') }
                }
            ];
        };
        const data = await Products.paginate(querry, options);
        await Products.populate(data.docs, { path: 'category_id', select: 'category_name' });
        await Products.populate(data.docs, { path: 'attributes' });
        for (const id_data of data.docs) {
            if (id_data.attributes) {
                let current = 0;
                id_data.attributes.varriants.map((b) => {
                    b.size_item.map(l => {
                        current += l.stock_item
                    })
                })
                id_data.count_stock = current;
            }
            else {
                id_data.count_stock = id_data.stock
            }
        }
        if (!data.docs || data.docs.length === 0) {
            return res.status(StatusCodes.OK).json({
                message: "Khong co data!",
            })
        };
        return res.status(StatusCodes.OK).json({
            message: "OK!",
            data
        })
    }
    catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: error.message || 'Lỗi server rồi đại vương ơi!'
        })
    }
};


// get by categories, madeIn, panigation, ...
export async function get_Item_Client(req, res) {
    const {
        _page = 1,
        _limit = 100,
        _search = '',
        _bestseller = '',
    } = req.query;

    const sort = _bestseller ? { sale_quantity: -1 } : { createdAt: -1 }
    const options = {
        page: _page,
        limit: _limit,
        sort: sort
    };
    try {
        const querry = {};
        if (_search) {
            querry.$and = [
                {
                    short_name: { $regex: new RegExp(_search, 'i') }
                }
            ]
        };
        const data = await Products.paginate(querry, options);
        await Products.populate(data.docs, { path: 'category_id', select: 'category_name' });
        await Products.populate(data.docs, { path: 'attributes' });
        for (const item of data.docs) {
            if (item.attributes) {
                let current = 0;
                let quantity_sale = 0;
                item.attributes.varriants.map((b) => {
                    b.size_item.map(l => {
                        current += l.stock_item
                        quantity_sale += l.sale_quantity_attr
                    })
                })
                item.count_stock = current;
                item.sale_quantity = quantity_sale
            }
            else {
                item.count_stock = item.stock
            }
        };
        data.docs = data.docs.filter((item) => item.count_stock > 0);
        if (!data) {
            return res.status(StatusCodes.OK).json({
                message: "Khong co data!"
            })
        }
        return res.status(StatusCodes.OK).json({
            message: 'Done',
            data,
        })
    }
    catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: error.message || 'Lỗi server rồi đại vương ơi!'
        })
    }
};

// get detail

export async function get_Detail_Client(req, res) {
    try {
        const data = await Products.findById(req.params.id).populate('attributes');
        if (data.attributes) {
            let quantity_sales = 0
            data.attributes.varriants = data.attributes.varriants.map(item => {
                for (let i of item.size_item) {
                    quantity_sales += i.sale_quantity_attr
                }
                const dataAttr = item.size_item.filter(attr => attr.stock_item > 0)
                return {
                    ...item,
                    size_item: dataAttr
                }
            })
            data.sale_quantity = quantity_sales;
            // console.log(data.sale_quantity)
            await data.save()
        }
        return res.status(StatusCodes.OK).json({
            message: "Done",
            data
        })
    }
    catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: error.message || "Lỗi server rồi đại vương ơi!"
        })
    }
};


export async function get_Detail_Dashboard(req, res) {
    try {
        const data = await Products.findById(req.params.id).populate('attributes');
        return res.status(StatusCodes.OK).json({
            message: "Done",
            data
        })
    }
    catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: error.message || "Lỗi server rồi đại vương ơi!"
        })
    }
};

// get by category
export async function get_item_by_category(req, res) {
    const {
        _page = 1,
        _limit = 100,
        _search = '',
        _sort = '',
    } = req.query;
    try {
        const options = {
            page: _page,
            limit: _limit
        }
        const querry = {
            category_id: req.params.category_id
        };
        if (_search) {
            querry.$and = [
                {
                    short_name: { $regex: new RegExp(_search, 'i') }
                }
            ]
        }
        const data = await Products.paginate(querry, options);
        await Products.populate(data.docs, { path: 'category_id', select: 'category_name' });
        await Products.populate(data.docs, { path: 'attributes' });
        for (const id_data of data.docs) {
            if (id_data.attributes) {
                let current = 0;
                id_data.attributes.varriants.map((b) => {
                    b.size_item.map(l => {
                        current += l.stock_item
                    })
                })
                id_data.count_stock = current;
            }
            else {
                id_data.count_stock = id_data.stock
            }
        }
        data.docs = data.docs.filter((item) => item.count_stock > 0);
        return res.status(StatusCodes.OK).json({
            message: 'Done!',
            data
        })
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: error.message || 'Lỗi rồi đại vương ơi!'
        })
    }
}

// search
export async function search_Item(req, res) {
    const {
        _search = ''
    } = req.query;
    try {
        const querry = {};
        if (_search) {
            querry.$and = [
                {
                    short_name: { $regex: RegExp(_search, 'i') }
                }
            ]
        }
        const data = await Products.find(querry);
        return res.status(StatusCodes.OK).json({
            message: 'Done',
            data
        })
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: error.message || 'Lỗi rồi đại vương ơi!'
        })
    }
}

// get item by seller
export async function get_item_by_user(req, res) {
    const id_user = req.params.id_user;
    const {
        _page = 1,
        _limit = 50,
        _search = ''
    } = req.query
    try {
        const options = {
            page: _page,
            limit: _limit
        };
        const querry = { id_user_seller: id_user };
        if (_search) {
            querry.$and = [
                {
                    short_name: { $regex: new RegExp(_search, 'i') }
                }
            ]
        }
        const data = await Products.paginate(querry, options);
        await Products.populate(data.docs, { path: 'attributes' });
        return res.status(StatusCodes.OK).json({
            message: 'OK',
            data
        })
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: error.message || 'Lỗi rồi đại vương ơi!'
        })
    }
}