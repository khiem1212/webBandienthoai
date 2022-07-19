var service = new Service();
var listProduct = [];

function getEle(id) {

    return document.getElementById(id);
}
function getListProduct() {



    service.getList()
        .then(function (result) {

            renderProducts(result.data);
            searchStudent(result.data);
        })
        .catch(function (error) {
            console.log(error);
        });

}
getListProduct();

function renderProducts(data) {
    var contentHTML = "";
    for (var i = 0; i < data.length; i++) {

        var json = JSON.stringify(data[i]);

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
        <td style="text-align: center;">
   
        <div class="buttons_added">
        
        <input aria-label="quantity" id="input-qty" max="10" min="1" name="" type="number" value="1" >
    
      </div>

        </td>
       
        <td style="text-align: center;font-size:50px; margin-top: 30px;custer:pointer">

        

        <i onclick='getProduct(event,${json})' style=" margin-top: 40px; color: #28a745" class="fa-solid fa-cart-plus"></i>
        </td>
       
       
        </tr>`
    }
    getEle("tblDanhSachSP").innerHTML = contentHTML;
}

function getProduct(e, index) {

    var qtyValue = +e.target.closest("tr").querySelector("#input-qty").value

    getLocalStorage();
    alert("san pham da dc them vao gio hang");

    for (var i = 0; i < listProduct.length; i++) {
        if (index.id === listProduct[i].id) {
            // alert("san pham da cap nhat so luong");
            deleteProdcut(i);

            break;

        }

    }
    var cartItem = { id: index.id, price: index.price, name: index.name, numberr: qtyValue, img: index.img };

    listProduct.push(cartItem);
    localStorage.setItem("listTaskLocall", JSON.stringify(listProduct));
    renderProductss();



}

function getLocalStorage() {

    var listTaskFromLocal = localStorage.getItem("listTaskLocall");
    if (listTaskFromLocal == null) {
        listProduct = [];
    } else {
        listProduct = JSON.parse(listTaskFromLocal);
    }
}



function renderProductss() {
 
    getLocalStorage();
    var contentHTML = "";
    for (var i = 0; i < listProduct.length; i++) {
        var json = JSON.stringify(listProduct[i]);



        contentHTML += `<tr>
        <td  style="text-align: center">
        <i onclick='deleteProdcut(${i})' class="fa-solid fa-trash" style="color: #28a745"></i>
     <img style="width: 50px;" src="${listProduct[i].img}"/>
    
        </td>
        <td  style="text-align: center">
     ${listProduct[i].name}
        </td>
        <td  style="text-align: center">
        <input aria-label="quantity" max="10" min="1" name="" type="number" id="input-qtyy" value="${listProduct[i].numberr}" onclick='updateNumBer(event,${json})'>
   
        </td>
        <td  style="text-align: center">
     ${listProduct[i].price}
        </td>
        <td  style="text-align: center">
        ${Money(listProduct[i].id)}
        </td>

        
        

       
       
       
        </tr>`
    }
    getEle("tblDanhSachSPP").innerHTML = contentHTML;
    ToatalMoney();
}

renderProductss();
function deleteProdcut(i) {


    listProduct.splice(i, 1);
    localStorage.setItem("listTaskLocall", JSON.stringify(listProduct));
    renderProductss();


}
function alldeleteProdcut() {
    getLocalStorage();
    for (var i = 0; i < listProduct.length; i++) {
    
        listProduct.splice(i, listProduct.length);
        localStorage.setItem("listTaskLocall", JSON.stringify(listProduct));
    }
    renderProductss();
}

function buyProduct(){
    var total=ToatalMoney();
    alert("Số tiền bạn đã thanh toán là "+total+", chúc bạn mua sắm vui vẻ");
    alldeleteProdcut();

}
function updateNumBer(e, index) {

    var qtyValue = +e.target.closest("tr").querySelector("#input-qtyy").value;
    for (var i = 0; i < listProduct.length; i++) {
        if (index.id === listProduct[i].id) {
            listProduct[i].numberr = qtyValue;
            localStorage.setItem("listTaskLocall", JSON.stringify(listProduct));
            renderProductss();


        }
    }

}


function Money(index) {

    for (var i = 0; i < listProduct.length; i++) {

        if (index == listProduct[i].id) {
            var money = listProduct[i].numberr * listProduct[i].price;

            listProduct[i].money = money;
            localStorage.setItem("listTaskLocall", JSON.stringify(listProduct));
            return money;
        }

    }
}

function ToatalMoney() {
   getLocalStorage();
    var total = 0;

    for (var i = 0; i < listProduct.length; i++) {
      
    
     total+=listProduct[i].money;
  
    }
  getEle("total").innerHTML = total;
  return total;
  
}
