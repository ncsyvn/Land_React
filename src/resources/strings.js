let wallet_services = '/wallet-services-dev'; //dev
// let wallet_services = '/wallet-services-test'; //test 
let isofhcare_service = '/isofhcare'; //dev 
// let isofhcare_service = '/isofhcare'; //test


module.exports = {
    key: {
        storage: {
            current_account: "CURRENT_USER"

        }
    },
    action: {
        action_user_login: "ACTION_USER_LOGIN",
        action_user_logout: "ACTION_USER_LOGOUT",
    },
    message: {
        user: {
            create_error: "Tạo mới tài khoản không thành công!",
            update_error: "Cập nhật tài khoản không thành công!",
            error_code_2: "SĐT đã được sử dụng trong hệ thống. Vui lòng sử dụng SĐT khác!",
            error_code_3: "Email đã được sử dụng trong hệ thống. Vui lòng sử dụng Email khác!",
            error_code_4: "Số văn bằng chuyên môn đã tồn tại trên hệ thống. Vui lòng sử dụng Số văn bằng chuyên môn khác!",
            error_code_5: "Username đã tồn tại trên hệ thống. Vui lòng sử dụng Username khác!",
        }, post: {
            approved_success: "Duyệt câu hỏi  thành công!",
            approved_error: "Duyệt câu hỏi không thành công!",
        },
        hospital: {
            create_error: "Tạo mới tài khoản không thành công!",
            update_error: "Cập nhật tài khoản không thành công!",

        }
    },
    api: {
        user: {

            // login: isofhcare_service + "/user/login",
            login: "/login",   
            register: "/api/Account/Register",
            getAll:"/api/User/all"
        }, 
        image: {

        },
        zone: {
            getAll: isofhcare_service + "/zone/get-by-district"
        },
        province: {
            getAll: isofhcare_service + "/province/get-all"
        },
        district: {
            // getAll: isofhcare_service + "/district/get-all",
            // getProvince: isofhcare_service + "/district/get-by-province"
            // getById: "https://thongtindoanhnghiep.co/api/city/3/district"
        },
        news:{
            getAll: "/api/News/all",
            getNewById:"/api/News/searchById",
            getNewPage: "api/News",
            create:"/api/News/create",
            delete:"/api/News/delete",
            getByPage:"/api/News/page",
        },
        new_category:{
            getAll:"/api/NewCategory/all",
            getById:"/api/NewCategories/searchById",
            create:"/api/News/create",
            getByPage:"/api/NewCategory/page",
            delete:"/api/NewCategory/delete"
        },
        product:{
            getAll:"/api/Products/all",
            getById:"/api/Products/searchById",
            create:"/api/Products/create",
            getByPage:"/api/Products/page",
            delete:"/api/Products/delete",
            search:"/api/Products",
            searchByName:'/api/Products/searchByName'
        },
        product_category:{
            getAll:"/api/ProductCategories/all",
            getById:"/api/ProductCategories/searchById",
            create:"/api/ProductCategories/create",
            getByPage:"/api/ProductCategories/page",
            delete:"/api/ProductCategories/delete",
            searchByName:'/api/ProductCategories/searchByName',
            getByParent:'/api/ProductCategories/getByParent'
        },

    }
} 