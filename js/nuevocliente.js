(()=>{

  
    const formulario = document.querySelector('#formulario');

    document.addEventListener('DOMContentLoaded', ()=>{

        conectarDB();

        formulario.addEventListener('submit', validarCliente);

    });

    function validarCliente(e){
        e.preventDefault();

        //Leer todos los datos del formulario
        const nombre = document.querySelector('#nombre').value;
        const email = document.querySelector('#email').value;
        const telefono = document.querySelector('#telefono').value;
        const empresa = document.querySelector('#empresa').value;

        if(nombre === '' || email === '' || telefono === '' || empresa === ''){
            imprimirAlerta('Todos los campos son obligatorios', 'error');
            return;
        }

        //Crear un objeto con la informacion del cliente a crear

        const cliente = {
            nombre,
            email,
            telefono,
            empresa
        }

        cliente.id = Date.now();

        crearNuevoCliente(cliente);

    }

    function crearNuevoCliente(cliente){
        const transaction = DB.transaction(['crm'], 'readwrite');
        const objectStore = transaction.objectStore('crm');

        objectStore.add(cliente);

        transaction.onerror = ()=>{
            imprimirAlerta('Hubo un error', 'error');
        }

        transaction.oncomplete = ()=>{
            console.log('Cliente agregado correctamente');
            imprimirAlerta('Cliente agregado correctamente');

            setTimeout( ()=>{
                window.location.href = 'index.html';
            },3000)
        }
    }



}) ();