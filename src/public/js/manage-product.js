// Thêm
let id = document.getElementById("id");
let name = document.getElementById("name");
let upload_bandwidth = document.getElementById("upload_bandwidth");
let download_bandwidth = document.getElementById("download_bandwidth");
let price_per_month = document.getElementById("price_per_month");
let install_fee = document.getElementById("install_fee");
let description = document.getElementById("description");
let image = document.getElementById("image");

function add() {
    let category = document.querySelector("input[class='form-check-input']:checked");

    if (id.value === "" || name.value === "" || description.value === "" || !category || !image.files[0])
        return toastr.error("Vui lòng nhập đầy đủ thông tin", "Thông báo")

    if (upload_bandwidth.value < 0 || download_bandwidth.value < 0)
        return toastr.error("Tốc độ băng thông không được < 0", "Thông báo")

    if (price_per_month.value < 0 || install_fee.value < 0)
        return toastr.error("Giá tiền không được < 0", "Thông báo")

    let formData = new FormData();
    formData.append('id', id.value);
    formData.append('name', name.value);
    formData.append('upload_bandwidth', upload_bandwidth.value);
    formData.append('download_bandwidth', download_bandwidth.value);
    formData.append('price_per_month', price_per_month.value);
    formData.append('install_fee', install_fee.value);
    formData.append('description', description.value);
    formData.append('category', category.value);
    formData.append('image', image.files[0]);

    fetch("/manage-product", {
        method: "post",
        body: formData
    })
    .then(response => response.json())
    .then(json => {
        if (json.code === 1)
            toastr.error(json.message, "Thông báo")
        else {
            toastr.success(json.message, "Thông báo")

            setTimeout(() => {
                reset()
            }, 1000)
        }
    })
}

// Sửa
let idUpdate = document.getElementById("id-update");
let nameUpdate = document.getElementById("name-update");
let upload_bandwidthUpdate = document.getElementById("upload_bandwidth-update");
let download_bandwidthUpdate = document.getElementById("download_bandwidth-update");
let price_per_monthUpdate = document.getElementById("price_per_month-update");
let install_feeUpdate = document.getElementById("install_fee-update");
let descriptionUpdate = document.getElementById("description-update");
let imageUpdate = document.getElementById("image-update");

function showModalUpdate(id, name, upload_bandwidth, download_bandwidth, price_per_month, install_fee, description, category) {
    idUpdate.value = id;
    nameUpdate.value = name;
    upload_bandwidthUpdate.value = upload_bandwidth;
    download_bandwidthUpdate.value = download_bandwidth;
    price_per_monthUpdate.value = price_per_month;
    install_feeUpdate.value = install_fee;
    descriptionUpdate.value = description;

    // Check radio button ứng với category
    let radios = document.querySelectorAll("input[name='category-update']")
    radios.forEach(r => {
        if (r.value === category)
            r.setAttribute("checked", true);
    })
}

function update() {
    let categoryUpdate = document.querySelector("input[name='category-update']:checked");

    if (nameUpdate.value === "" || descriptionUpdate.value === "" || !categoryUpdate)
        return toastr.error("Vui lòng nhập đầy đủ thông tin", "Thông báo")

    if (upload_bandwidthUpdate.value < 0 || download_bandwidthUpdate.value < 0)
        return toastr.error("Tốc độ băng thông không được < 0", "Thông báo")

    if (price_per_monthUpdate.value < 0 || install_feeUpdate.value < 0)
        return toastr.error("Giá tiền không được < 0", "Thông báo")

    let formData = new FormData();
    formData.append('id', idUpdate.value);
    formData.append('name', nameUpdate.value);
    formData.append('upload_bandwidth', upload_bandwidthUpdate.value);
    formData.append('download_bandwidth', download_bandwidthUpdate.value);
    formData.append('price_per_month', price_per_monthUpdate.value);
    formData.append('install_fee', install_feeUpdate.value);
    formData.append('description', descriptionUpdate.value);
    formData.append('category', categoryUpdate.value);
    formData.append('image', imageUpdate.files[0]);

    fetch("/manage-product", {
        method: "put",
        body: formData
    })
    .then(response => response.json())
    .then(json => {
        if (json.code === 1)
            toastr.error(json.message, "Thông báo")
        else {
            toastr.success(json.message, "Thông báo")

            setTimeout(() => {
                reset()
            }, 1000)
        }
    })
}

// Xóa
let idDelete = document.getElementById("id-delete");

function showModalDelete(id) {
    idDelete.innerText = id;
}

function deleteProduct() {
    fetch("/manage-product", {
        method: "delete",
        body: new URLSearchParams({
            id: idDelete.innerText
        })
    })
    .then(response => response.json())
    .then(json => {
        toastr.success(json.message, "Thông báo")

        setTimeout(() => {
            reset()
        }, 1500)
    })
}

function reset() {
    location.reload();
}