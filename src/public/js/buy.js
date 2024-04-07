let radios = document.querySelectorAll("input[name='price-per-month']");
let checkbox = document.getElementById("install-fee");
let totalPrice = document.getElementById("total-price");

radios.forEach(radio => {
    radio.addEventListener('change', function (event) {
        let radioValue = event.target.value
        totalPrice.innerText = (parseInt(radioValue.replace(/[đ.]/g, '')) + parseInt(checkbox.value.replace(/[đ.]/g, ''))).toLocaleString('vi-VN') + "đ"
    });
});

function buy() {
    let months = document.querySelector("input[name='price-per-month']:checked");
    let fullname = document.getElementById("fullname");
    let phone = document.getElementById("phone");
    let address = document.getElementById("address");
    let note = document.getElementById("note");
    let id = document.getElementById("id");

    if (!months || fullname.value === "" || phone.value === "" || address.value === "")
        return toastr.error("Vui lòng nhập đầy đủ thông tin", "Thông báo")

    if (!isValidPhone(phone.value))
        return toastr.error("Số điện thoại không hợp lệ", "Thông báo")

    let numberOfMonth = months.getAttribute("id")
    numberOfMonth = parseInt(numberOfMonth.replace("price-per-month", ""))

    fetch("/buy", {
        method: "post",
        body: new URLSearchParams({
            phone: phone.value,
            id: id.value,
            numberOfMonth: numberOfMonth,
            totalPrice: parseInt(totalPrice.innerText.replace(/[đ.]/g, '')),
            address: address.value,
            note: note.value
        })
    })
    .then(response => response.json())
    .then(json => {
        toastr.success(json.message, "Thông báo");

        setTimeout(() => {
            window.location.href = "/history";
        }, 1000)
    })
}

function back() {
    window.history.back();
}

function isValidPhone(phone) {
    var regex = /^(0[1-9][0-9]{8})$/;
    return regex.test(phone);
}