import fs from 'fs';

class ProductManager {
    constructor(fileName) {
        this.fileName = fileName;
        if (fs.existsSync(fileName)) {
        try {
            let productos = fs.readFileSync(fileName, 'utf-8');
            this.productos = JSON.parse(productos);
        } catch (error) {
            this.productos = [];
        }
        } else {
        this.productos = [];
        }
    }

    async saveFile(data) {
        try {
        await fs.promises.writeFile(this.fileName, JSON.stringify(data, null, 2));
        return true;
        } catch (error) {
        console.log(error);
        return false;
        }
    }

    async addProducto(producto) {
        producto.id = this.generateId();
        this.productos.push(producto);

        const respuesta = await this.saveFile(this.productos);

        if (respuesta) {
        console.log('Producto agregado correctamente');
        } else {
        console.log('Hubo un error al agregar el producto');
        }
    }

    async deleteProducto(id) {
        const index = this.productos.findIndex((producto) => producto.id === id);

        if (index !== -1) {
        this.productos.splice(index, 1);
        await this.saveFile(this.productos);
        console.log('Producto eliminado correctamente');
        } else {
        console.log('Producto no encontrado');
        }
    }

    consultarProductos() {
        return this.productos;
    }

    getProductById(id) {
        return this.productos.find((producto) => producto.id === id);
    }

    generateId() {
        const maxId = this.productos.reduce(
        (max, producto) => (producto.id > max ? producto.id : max),
        0
        );
        return maxId + 1;
    }
}

export default ProductManager;