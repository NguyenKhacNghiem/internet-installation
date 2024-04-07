let fullname = document.getElementById("fullname");
let address = document.getElementById("address");
let email = document.getElementById("email");

function update() {
    if (fullname.value === "" || address.value === "" || email.value === "")
        return toastr.error("Vui lòng nhập đầy đủ thông tin")

    if (!isValidEmail(email.value))
        return toastr.error("Email không hợp lệ")

    fetch("/profile", {
        method: "post",
        body: new URLSearchParams({
            fullname: fullname.value,
            address: address.value,
            email: email.value
        })
    })
    .then(response => response.json())
    .then(json => {
        toastr.success(json.message, "Thông báo")
    })
}

function isValidEmail(email) {
    var regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}