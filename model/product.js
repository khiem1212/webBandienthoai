function Product(name,price,backCamera,frontCamera,img,desc,type){
    this.name=name;
    this.price=price;
    this.backCamera=backCamera;
    this.frontCamera=frontCamera;
    this.img=img;
    this.desc=desc;
    this.type=type;
}

function Service() {
    this.getList=function(){
   return axios({
        url: "https://62bc4dcaeff39ad5ee2239f3.mockapi.io/api/productPhone",
        method: "GET"
    })

       
    }
}