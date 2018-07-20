import fetch from '@/config/fetch'

/**
 * 登陆
 */

export const login = data => fetch('/admin/login', data, 'POST');

/**
 * 退出
 */

export const signout = () => fetch('/admin/singout');

/**
 * 获取用户信息
 */

export const getAdminInfo = () => fetch('/admin/info');

/**
 * api请求量
 */

export const apiCount = date => fetch('/statis/api/' + date + '/count');

/**
 * 所有api请求量
 */

export const apiAllCount = () => fetch('/statis/api/count');


/**
 * 所有api请求信息
 */

export const apiAllRecord = () => fetch('/statis/api/all');

/**
 * 用户注册量
 */

export const userCount = date => fetch('/statis/user/' + date + '/count');

/**
 * 某一天订单数量
 */

export const orderCount = date => fetch('/statis/order/' + date + '/count');


/**
 * 某一天管理员注册量
 */

export const adminDayCount = date => fetch('/statis/admin/' + date + '/count');

/**
 * 管理员列表
 */

export const adminList = data => fetch('/admin/all', data);

/**
 * 管理员数量
 */

export const adminCount = () => fetch('/admin/count');

/**
 * 获取定位城市
 */

export const cityGuess = () => fetch('/v1/cities', {
	type: 'guess'
});

/**
 * 添加商铺
 */

export const addShop = data => fetch('/shopping/addShop', data, 'POST');

/**
 * 获取搜索地址
 */

export const searchplace = (cityid, value) => fetch('/v1/pois', {
	type: 'search',
	city_id: cityid,
	keyword: value
});

/**
 * 获取当前店铺食品种类
 */

export const getCategory = restaurant_id => fetch('/shopping/getcategory/' + restaurant_id);

/**
 * 添加食品种类
 */

export const addCategory = data => fetch('/shopping/addcategory', data, 'POST');


/**
 * 添加食品
 */

export const addFood = data => fetch('/shopping/addfood', data, 'POST');


/**
 * category 种类列表
 */

export const foodCategory = (latitude, longitude) => fetch('/shopping/v2/restaurant/category');

/**
 * 获取餐馆列表
 */

export const getResturants = data => fetch('/shopping/restaurants', data);

/**
 * 获取餐馆详细信息
 */

export const getResturantDetail = restaurant_id => fetch('/shopping/restaurant/' + restaurant_id);

/**
 * 获取餐馆数量
 */

export const getResturantsCount = () => fetch('/shopping/restaurants/count');

/**
 * 更新餐馆信息
 */

export const updateResturant = data => fetch('/shopping/updateshop', data, 'POST');

/**
 * 删除餐馆
 */

export const deleteResturant = restaurant_id => fetch('/shopping/restaurant/' + restaurant_id, {}, 'DELETE');

/**
 * 获取食品列表
 */

export const getFoods = data => fetch('/shopping/v2/foods', data);

/**
 * 获取食品数量
 */

export const getFoodsCount = data => fetch('/shopping/v2/foods/count', data);


/**
 * 获取menu列表
 */

export const getMenu = data => fetch('/shopping/v2/menu', data);

/**
 * 获取menu详情
 */

export const getMenuById = category_id => fetch('/shopping/v2/menu/' + category_id);

/**
 * 更新食品信息
 */

export const updateFood = data => fetch('/shopping/v2/updatefood', data, 'POST');

/**
 * 删除食品
 */

export const deleteFood = food_id => fetch('/shopping/v2/food/' + food_id, {}, 'DELETE');

/**
 * 获取用户列表
 */

export const getUserList = data => fetch('/v1/users/list', data);

/**
 * 获取用户数量
 */

export const getUserCount = data => fetch('/v1/users/count', data);

/**
 * 获取订单列表
 */

export const getOrderList = data => fetch('/bos/orders', data);

/**
 * 获取订单数量
 */

export const getOrderCount = data => fetch('/bos/orders/count', data);

/**
 * 获取用户信息
 */

export const getUserInfo = user_id => fetch('/v1/user/' + user_id);

/**
 * 获取地址信息
 */

export const getAddressById = address_id => fetch('/v1/addresse/' + address_id);

/**
 * 获取用户分布信息
 */

export const getUserCity = () => fetch('/v1/user/city/count');


/**
 * 新增banner
 */

export const addBanner = data => fetch('/admin/addBanners', data, 'POST');

/**
 * 加载banner数量
 * @param data
 */

export const getBannersCount = data => fetch('/admin/v2/banners/count', data);

/**
 * 加载banner
 * @param data
 */
export const getBanners = data => fetch('/admin/v2/banners', data);

/**
 * 删除banner
 * @param id
 */
export const deleteBanner = id => fetch('/admin/v2/banners/banner/' + id, {}, 'DELETE');

/**
 * 获取餐馆详细信息
 */

export const getBannerDetail = id => fetch('/admin/v2/banners/getBannersDetal/' + id);


export const updateBanner = data => fetch('/admin/v2/banners/updateBanner',data, 'POST');


export const authBanner = data => fetch('/admin/v2/banners/authBanner',data, 'POST');


/**
 * 新增分类
 */

export const addCategoryGoods = data => fetch('/admin/addCategoryGoods', data, 'POST');

/**
 * 加载分类数量
 * @param data
 */

// export const getBannersCount = data => fetch('/admin/v2/banners/count', data);

/**
 * 加载分类
 * @param data
 */
export const getCategories = data => fetch('/admin/getCategories', data);

/**
 * 删除分类
 * @param id
 */
export const deleteCategoryGoods = id => fetch('/admin/deleteCategoryGoods/' + id, {}, 'DELETE');



export const updateCategoryGoods = data => fetch('/admin/updateCategoryGoods',data, 'POST');



/**
 * 新增keyword
 */

export const addKeyword = data => fetch('/admin/addKeywords', data, 'POST');

/**
 * 加载banner数量
 * @param data
 */

export const getKeywordCount = data => fetch('/admin/getKeywords/count', data);

/**
 * 加载banner
 * @param data
 */
export const getKeywords = data => fetch('/admin/getKeywords', data);

/**
 * 删除banner
 * @param id
 */
export const deleteKeyword = id => fetch('/admin/deleteKeywords/' + id, {}, 'DELETE');

/**
 * 获取餐馆详细信息
 */

export const getKeywordDetail = id => fetch('/admin/getKeywordsDetal/' + id);


export const updateKeyword = data => fetch('/admin/updateKeywords',data, 'POST');






/**
 * 新增banner
 */

export const addIndexType = data => fetch('/admin/addIndexType', data, 'POST');

/**
 * 加载banner数量
 * @param data
 */

export const getIndexTypeCount = data => fetch('/admin/v2/indexType/count', data);

/**
 * 加载banner
 * @param data
 */
export const getIndexTypes = data => fetch('/admin/v2/indexTypes', data);

/**
 * 删除banner
 * @param id
 */
export const deleteIndexType = id => fetch('/admin/v2/indexTypes/indexType/' + id, {}, 'DELETE');

/**
 * 获取餐馆详细信息
 */

export const getIndexTypeDetail = id => fetch('/admin/v2/indexTypes/getIndexTypeDetal/' + id);


export const updateIndexType = data => fetch('/admin/v2/indexTypes/updateIndexTyper',data, 'POST');

export const authIndexTyper = data => fetch('/admin/v2/indexTypes/authIndexTyper',data, 'POST');






