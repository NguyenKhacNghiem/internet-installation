let idName = document.getElementById("id-name");
let bandwidth = document.getElementById("bandwidth");
let pricePerMonth = document.getElementById("price-per-month");
let installFee = document.getElementById("install-fee");
let desc = document.getElementById("description");
let cate = document.getElementById("category");
let img = document.getElementById("image");
let buy = document.getElementById("buy");

function showModalDetail(id, name, upload_bandwidth, download_bandwidth, price_per_month, install_fee, description, category, image) {
    idName.innerText = name + " (" + id.toUpperCase() + ")";
    bandwidth.innerHTML = `<i class="fa-solid fa-cloud-arrow-up"></i> ${upload_bandwidth}Mbps <i class="fa-solid fa-cloud-arrow-down"></i> ${download_bandwidth}Mbps`;
    installFee.innerText = install_fee.toLocaleString('vi-VN') + "đ";
    desc.innerHTML = description;
    cate.innerHTML = category;
    img.setAttribute("src", "/uploads/" + image);
    pricePerMonth.innerText = price_per_month.toLocaleString('vi-VN') + "đ /1 tháng";
    buy.setAttribute("href", "/buy?id=" + id);
}