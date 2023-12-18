export async function getProducts() {
    try {
        const response = await fetch('http://localhost:4000/api/v1/products');
        const data = await response.json();
        if (response.status !== 200) throw new Error('Error al conectarse con la BD');
        return data;
    } catch (error) {
        console.log('Error!');
    };
};