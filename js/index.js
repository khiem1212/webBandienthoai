var service = new Service();

function getEle(id) {

    return document.getElementById(id);
}
function getListProduct() {



    service.getList()
        .then(function (result) {

            renderProducts(result.data);

        })
        .catch(function (error) {
            console.log(error);
        });

}
getListProduct();

function renderProducts(data) {
    var contentHTML = "";
    for (var i = 0; i < data.length; i++) {
        contentHTML += `<tr>
        <td  style="text-align: center">
     <img style="width: 120px;" src="${data[i].img}"/>
        </td>

        <td style="font-size:22px;pading:20px">
        Tên sản phẩm:  ${data[i].name}
        <div> Loại sản phẩm:    ${data[i].type}<div>
        <div>Cammera trước:  ${data[i].backCamera}<div>
        <div>Cammera sau:  ${data[i].frontCamera}<div>
        <div> Đặc điểm:    ${data[i].desc}<div>
        <h3> Giá niêm yết:      ${data[i].price}</h3>
        
        </td>
        <td>
        <button class="btn btn-danger" onclick="deleteProduct('${data[i].id}')" >dele</button>
        <button class="btn btn-info" onclick="getProduct('${data[i].id}')" >update</button>
        </td>
       
        </tr>`
    }
    getEle("tblDanhSachSP").innerHTML = contentHTML;
}


function deleteProduct(id) {
    axios({
        url: "https://62bc4dcaeff39ad5ee2239f3.mockapi.io/api/productPhone/" + id,
        method: "DELETE",
    })
        .then(function (res) {
            alert("xoá thành công");
            getListProduct();
        })
        .catch(function (err) {
            console.log(err);
        });
}



function creatProduct() {
    var isValid = validateForm();

    if (!isValid) return;
    var prodName = getEle("TenSP").value;
    var prodPrice = getEle("GiaSP").value;
    var prodBackCamera = getEle("backCamera").value;
    var prodbackFrontCamera = getEle("frontCamera").value;
    var prodbackimg = getEle("HinhSP").value;
    var proddesc = getEle("decreProduct").value;
    var prodtype = getEle("typeSP").value;

    var product = new Product(prodName, prodPrice, prodBackCamera, prodbackFrontCamera, prodbackimg, proddesc, prodtype);
console.log(Product);
    axios({
        url: "https://62bc4dcaeff39ad5ee2239f3.mockapi.io/api/productPhone",
        method: "POST",
        data: product,
    })
        .then(function (res) {
            console.log(res);
            getListProduct();
            getEle("btnClose").click();
         
          
            // Product();
        
            // tat form
        })
        .catch(function (err) {
            console.log(err);
        })

    // get post put delete
}




function getProduct(id) {
    axios({
        url: "https://62bc4dcaeff39ad5ee2239f3.mockapi.io/api/productPhone/" + id,
        method: "GET",

    })
        .then(function (res) {
            getEle("btnThemSP").click();

            getEle("TenSP").value = res.data.name;
            getEle("GiaSP").value = res.data.price;
            getEle("backCamera").value = res.data.backCamera;
            getEle("frontCamera").value = res.data.frontCamera
            getEle("HinhSP").value = res.data.img;
            getEle("decreProduct").value = res.data.desc;
            getEle("typeSP").value = res.data.type;
            getEle("text").value = res.data.id;


            document.getElementById("luu").style.display = "none";
            document.getElementById("thay").style.display = "block";

        })
        .catch(function (err) {
            console.log(err);
        });

}
function updateProduct() {
    var isValid = validateForm();

    if (!isValid) return;
    var prodName = getEle("TenSP").value;
    var prodPrice = getEle("GiaSP").value;
    var prodBackCamera = getEle("backCamera").value;
    var prodbackFrontCamera = getEle("frontCamera").value;
    var prodbackimg = getEle("HinhSP").value;
    var proddesc = getEle("decreProduct").value;
    var prodtype = getEle("typeSP").value;
    var proId = getEle("text").value

    var product = new Product(prodName, prodPrice, prodBackCamera, prodbackFrontCamera, prodbackimg, proddesc, prodtype);


    axios({
        url: "https://62bc4dcaeff39ad5ee2239f3.mockapi.io/api/productPhone/" + proId,
        method: "PUT",
        data: product,
    })
        .then(function (res) {
            console.log(res);
            getListProduct();


            document.getElementById("luu").style.display = "block";
            document.getElementById("thay").style.display = "none";

            getEle("btnClose").click();
        



        })
        .catch(function (err) {
            console.log(err);
        })

    
}

function checkRequired(val, spanId) {
    if (val.length > 0) {
        document.getElementById(spanId).innerHTML = "";
        return true;
    }

    document.getElementById(spanId).innerHTML = "* Trường này bắt buộc nhập";
    return false;
}

function validateForm() {
    var isValid = true;
    var prodName = getEle("TenSP").value;
    var prodPrice = getEle("GiaSP").value;
    var prodBackCamera = getEle("backCamera").value;
    var prodbackFrontCamera = getEle("frontCamera").value;
    var prodbackimg = getEle("HinhSP").value;
    var proddesc = getEle("decreProduct").value;
    var prodtype = getEle("typeSP").value;

    isValid = checkRequired(prodName, "TenSPP");
    isValid &= checkRequired(prodPrice, "GiaSPP") && checkNumner(prodPrice, "GiaSPP");
    isValid = checkRequired(prodBackCamera, "backCameraa");
    isValid = checkRequired(prodbackFrontCamera, "frontCameraa");
    isValid = checkRequired(prodbackimg, "HinhSPP");
    isValid = checkRequired(proddesc, "decreProductt");
    isValid = checkRequired(prodtype, "typeSPP");
    return isValid;
}


function checkNumner(val, spanId) {
    var letter = /^[0-9]+$/;
    if (val.match(letter)) {
        document.getElementById(spanId).innerHTML = "";
        return true;
    }

    //false
    document.getElementById(spanId).innerHTML = "* Vui lòng nhập số";
    return false;
}
