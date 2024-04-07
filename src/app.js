// Khai báo thư viện
const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const hbs = require('express-handlebars');
const db = require('./db');
const bcrypt = require('bcrypt');
const multer = require('multer');
const path = require('path')

const app = express();

app.use(cookieParser('nhuy'))
app.use(session({
    secret: "nhuy",
    resave: true,
    saveUninitialized: true
}))

app.engine('handlebars', hbs.engine({
    defaultLayout: 'main',
    helpers: {
        formatPrice: (price) => {
            return price.toLocaleString('vi-VN') + "đ";
        },
        upperCase: (text) => {
            return text.toUpperCase();
        },
        mulBy12: (price) => {
            return (price * 12).toLocaleString('vi-VN') + "đ";
        },
        mulBy6: (price) => {
            return (price * 6).toLocaleString('vi-VN') + "đ";
        },
        mulBy3: (price) => {
            return (price * 3).toLocaleString('vi-VN') + "đ";
        },
    }
}));
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(__dirname + '/public'))

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, __dirname + '/public/uploads');
    },
    filename: function (req, file, cb) {
        let id = req.body.id;
        cb(null, id + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

// Middleware
app.get("/", (req, res) => {
    if (req.session.phone && req.session.phone === "admin")
        return res.redirect("/login")

    db.query("select * from product where deleted = 0", (error, results, fields) => {
        if (error)
            throw new Error(error.sqlMessage);

        let products = [];

        results.forEach(product => {
            products.push({
                id: product.id,
                name: product.name,
                upload_bandwidth: product.upload_bandwidth,
                download_bandwidth: product.download_bandwidth,
                price_per_month: product.price_per_month,
                install_fee: product.install_fee,
                description: product.description,
                category: product.category,
                image: product.image
            })
        })

        res.render("index", { phone: req.session.phone, products })
    })
})

app.get("/internet", (req, res) => {
    if (req.session.phone && req.session.phone === "admin")
        return res.redirect("/login")

    let category = req.query.category;

    // Trên query string, dấu + bị bỏ qua thành dấu " " nên phải chuyển lại thành dấu +
    if (category === "Internet   Truyền hình")
        category = "Internet + Truyền hình";

    db.query("select * from product where category = ? and deleted = 0", category, (error, results, fields) => {
        if (error)
            throw new Error(error.sqlMessage);

        let products = [];

        results.forEach(product => {
            products.push({
                id: product.id,
                name: product.name,
                upload_bandwidth: product.upload_bandwidth,
                download_bandwidth: product.download_bandwidth,
                price_per_month: product.price_per_month,
                install_fee: product.install_fee,
                description: product.description,
                category: product.category,
                image: product.image
            })
        })

        res.render("index", { phone: req.session.phone, products })
    })
})

app.get("/search", (req, res) => {
    if (req.session.phone && req.session.phone === "admin")
        return res.redirect("/login")

    let keyword = req.query.keyword;
    console.log(keyword)

    db.query("select * from product where (id like ? or name like ?) and deleted = 0", [`%${keyword}%`, `%${keyword}%`], (error, results, fields) => {
        if (error)
            throw new Error(error.sqlMessage);

        let products = [];

        results.forEach(product => {
            products.push({
                id: product.id,
                name: product.name,
                upload_bandwidth: product.upload_bandwidth,
                download_bandwidth: product.download_bandwidth,
                price_per_month: product.price_per_month,
                install_fee: product.install_fee,
                description: product.description,
                category: product.category,
                image: product.image
            })
        })

        res.render("index", { phone: req.session.phone, products })
    })
})

app.get("/login", (req, res) => {
    if (req.session.phone && req.session.phone === "admin")
        return res.redirect("/manage-product")
    else if (req.session.phone && req.session.phone !== "admin")
        res.redirect("/")
    else
        res.render("login")
})

app.post("/login", (req, res) => {
    db.query("select * from customer where phone = ?", req.body.phone, (error, results, fields) => {
        if (error)
            throw new Error(error.sqlMessage);

        if (results.length <= 0)
            return res.json({ code: 1, message: "Số điện thoại không tồn tại" });

        if (!bcrypt.compareSync(req.body.password, results[0].password))
            return res.json({ code: 1, message: "Mật khẩu không chính xác" });

        req.session.phone = results[0].phone;

        if (req.session.phone === "admin")
            res.json({ code: 100, message: "Đăng nhập thành công" }); // admin đăng nhập
        else
            res.json({ code: 0, message: "Đăng nhập thành công" }); // customer đăng nhập
    });
})

app.get("/logout", (req, res) => {
    delete req.session.phone
    res.redirect("login")
})

app.get("/profile", (req, res) => {
    if (!req.session.phone || req.session.phone === "admin")
        return res.redirect("/login")

    db.query("select * from customer where phone = ?", req.session.phone, (error, results, fields) => {
        if (error)
            throw new Error(error.sqlMessage);

        let customer = {
            phone: results[0].phone,
            fullname: results[0].fullname,
            address: results[0].address,
            email: results[0].email,
        }

        res.render("profile", { phone: req.session.phone, customer })
    });
})

app.post("/profile", (req, res) => {
    let { fullname, address, email } = req.body;

    let sql = "update customer set fullname = ?, address = ?, email = ? where phone = ?";
    let params = [fullname, address, email, req.session.phone];

    db.query(sql, params, (error, results, fields) => {
        if (error)
            throw new Error(error.sqlMessage);

        res.json({ code: 0, message: "Cập nhật thông tin thành công" })
    });
})

app.get("/manage-product", (req, res) => {
    if (!req.session.phone || req.session.phone !== "admin")
        return res.redirect("/login")

    db.query("select * from product where deleted = 0", (error, results, fields) => {
        if (error)
            throw new Error(error.sqlMessage);

        let products = [];

        results.forEach(product => {
            products.push({
                id: product.id,
                name: product.name,
                upload_bandwidth: product.upload_bandwidth,
                download_bandwidth: product.download_bandwidth,
                price_per_month: product.price_per_month,
                install_fee: product.install_fee,
                description: product.description,
                category: product.category,
                image: product.image
            })
        })

        res.render("manage-product", { products, layout: "admin" });
    })
})

app.post("/manage-product", upload.single("image"), (req, res) => {
    let image = req.file;
    let { id, name, upload_bandwidth, download_bandwidth, price_per_month, install_fee, description, category } = req.body;

    db.query("select count(*) as count from product where id = ?", id, (error, results, fields) => {
        if (error)
            throw new Error(error.sqlMessage);

        if (results[0].count > 0)
            return res.json({ code: 1, message: "Mã gói cước đã tồn tại" })

        let sql = "insert into product values(?, ?, ?, ?, ?, ?, ?, ?, ?, 0)";
        let params = [id, name, upload_bandwidth, download_bandwidth, price_per_month, install_fee, description, category, image.filename];

        db.query(sql, params, (error, results, fields) => {
            if (error)
                throw new Error(error.sqlMessage);

            res.json({ code: 0, message: "Thêm gói cước thành công" })
        })
    });
})

app.put("/manage-product", upload.single("image"), (req, res) => {
    let image = req.file;
    let { id, name, upload_bandwidth, download_bandwidth, price_per_month, install_fee, description, category } = req.body;
    let sql;
    let params;

    // Có update hình ảnh
    if (image) {
        sql = "update product set name = ?, upload_bandwidth = ?, download_bandwidth = ?, price_per_month = ?, install_fee = ?, description = ?, category = ?, image = ? where id = ?";
        params = [name, upload_bandwidth, download_bandwidth, price_per_month, install_fee, description, category, image.filename, id];
    }
    // Không update hình ảnh
    else {
        sql = "update product set name = ?, upload_bandwidth = ?, download_bandwidth = ?, price_per_month = ?, install_fee = ?, description = ?, category = ? where id = ?";
        params = [name, upload_bandwidth, download_bandwidth, price_per_month, install_fee, description, category, id];
    }

    db.query(sql, params, (error, results, fields) => {
        if (error)
            throw new Error(error.sqlMessage);

        res.json({ code: 0, message: "Cập nhật gói cước thành công" })
    })
})

app.delete("/manage-product", (req, res) => {
    let id = req.body.id;

    db.query("update product set deleted = 1 where id = ?", id, (error, results, fields) => {
        if (error)
            throw new Error(error.sqlMessage);

        res.json({ code: 0, message: "Xóa gói cước thành công" })
    })
})

app.get("/buy", (req, res, next) => {
    if (req.session.phone && req.session.phone === "admin")
        return res.redirect("/login")

    let id = req.query.id;

    if (!id)
        return next();

    db.query("select * from product where id = ? and deleted = 0", id, (error, results, fields) => {
        if (error)
            throw new Error(error.sqlMessage);

        if (results.length <= 0)
            return next();

        let product = {
            id: results[0].id,
            name: results[0].name,
            upload_bandwidth: results[0].upload_bandwidth,
            download_bandwidth: results[0].download_bandwidth,
            price_per_month: results[0].price_per_month,
            install_fee: results[0].install_fee,
            description: results[0].description,
            category: results[0].category,
            image: results[0].image
        }

        res.render("buy", { phone: req.session.phone, product })
    })
})

app.post("/buy", (req, res) => {
    let { phone, id, numberOfMonth, totalPrice, address, note } = req.body;

    let now = new Date();
    let day = String(now.getDate()).padStart(2, '0');
    let month = String(now.getMonth() + 1).padStart(2, '0'); // January is 0
    let year = now.getFullYear();
    let date = `${day}/${month}/${year}`;

    let sql = "insert into orders values(?, ?, ?, ?, ?, ?, ?)";
    let params = [phone, id, date, numberOfMonth, totalPrice, address, note];

    db.query(sql, params, (error, results, fields) => {
        if (error)
            throw new Error(error.sqlMessage);

        res.json({ code: 0, message: "Mua thành công. FPT sẽ liên hệ với bạn trong thời gian sớm nhất." })
    })
})

app.get("/history", (req, res) => {
    if (!req.session.phone || req.session.phone === "admin")
        return res.redirect("/login")

    db.query("select * from orders where phone = ?", req.session.phone, (error, results, fields) => {
        if (error)
            throw new Error(error.sqlMessage);

        let orders = [];

        results.forEach(order => {
            orders.push({
                id: order.id,
                date: order.date,
                number_of_month: order.number_of_month,
                total_price: order.total_price,
                address: order.address,
                note: order.note
            })
        })

        res.render("history", { orders, phone: req.session.phone });
    })
})

app.get("/request", (req, res) => {
    if (!req.session.phone || req.session.phone !== "admin")
        return res.redirect("/login")

    db.query("select * from orders", (error, results, fields) => {
        if (error)
            throw new Error(error.sqlMessage);

        let orders = [];

        results.forEach(order => {
            orders.push({
                phone: order.phone,
                id: order.id,
                date: order.date,
                number_of_month: order.number_of_month,
                total_price: order.total_price,
                address: order.address,
                note: order.note
            })
        })

        res.render("request", { orders, layout: "admin" });
    })
})

// Xử lý lỗi 404 và 500
app.use((req, res) => {
    res.status(404)
    res.render('404', { layout: null })
})

app.use((err, req, res, next) => {
    console.error(err.message);
    res.status(500);
    res.render('500', { layout: null });
});

app.listen(3000, () => {
    db.connect((error) => {
        if (error)
            throw new Error("Có lỗi khi kết nối MySQL: " + error.sqlMessage);

        console.log('Đã kết nối đến MySQL');
        console.log("Mở trang web: http://localhost:3000");
    })
})