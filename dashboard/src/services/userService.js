export async function getUsers() {
    try {
        const response = await fetch('http://localhost:4000/api/v1/users');
        const data = await response.json();
        if (response.status !== 200) throw new Error('Error al conectarse con la BD');
        return data;
    } catch (error) {
        console.log('Error!');
    };
};