let phone = document.getElementById("phone");
let password = document.getElementById("password");

function login() {
    if (phone.value === "" || password.value === "")
        return toastr.error("Vui lòng nhập đầy đủ thông tin")

    fetch("/login", {
        method: "post",
        body: new URLSearchParams({
            phone: phone.value,
            password: password.value
        })
    })
    .then(response => response.json())
    .then(json => {
        if(json.code === 100)
            document.location.href = "/manage-product/"; // admin đăng nhập
        else if(json.code === 0)
            document.location.href = "/"; // customer đăng nhập
        else
            toastr.error(json.message, "Thông báo")
    })
}