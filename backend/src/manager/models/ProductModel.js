
class ProductModel {

    constructor() {
        this.id = 0;
        this.name = "";
        this.description = "";
        this.price = 0;
        this.image = "";
        this.categoryId = 0;
    }


    get id() {
        return this.id;
    }

    set id(value) {             
        this.id = value;
    }

    get name() {
        return this.name;
    }

    set name(value) {      
        this.name = value;
    }

    get description() {
        return this.description;
    }

    set description(value) {
        this.description = value;
    }

    get price() {        
        return this.price;
    }

    set price(value) {
        this.price = value;
    }

    get image() {      
        return this.image;
    }

    set image(value) {      
        this.image = value;
    }

    get categoryId() {    
        return this.categoryId;
    }

    set categoryId(value) {               
        this.categoryId = value;          
    }

}