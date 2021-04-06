
var correo=document.querySelector('#correo')

var password=document.querySelector('#password')

var btnIniciar=document.querySelector('#btnconsultaLic')

var  recordar=document.querySelector('#record')

var modal = document.getElementById('mod')
var efect = document.getElementById('efect')

var check

var url=`https://placescr.azurewebsites.net`



window.addEventListener('load',()=>{

    if (localStorage.getItem('correoUser')==='0'
    &&localStorage.getItem('passUser')==='0') {
        correo.value=''
        password.value=''
        recordar.checked=false
        check=false
    } else {
        correo.value=localStorage.getItem('correoUser')
        password.value=localStorage.getItem('passUser')
        recordar.checked=true
        check=true
    }

})

recordar.addEventListener('change',(e)=>{
    check=e.target.checked
})

btnIniciar.addEventListener('click', async () => {
    try {

        if (correo.value !== "" && typeof correo.value !== undefined && typeof correo.value !== null &&
        password.value !== "" && typeof password.value !== undefined && typeof password.value !== null) {
           
                await pedirToken(correo.value, password.value)
           
        } else {
            this.mostrarMensaje(`No se lograron validar los credenciales, por favor revise los datos e intente de nuevo`, `error`);
        }



    } catch (error) {
        this.mostrarMensaje(`No se lograron validar los credenciales, por favor revise los datos e intente de nuevo`, `error`);
    }



})





/* solicitar un token */
async function pedirToken(user, pass) {

    try {
  
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    
        var urlencoded = new URLSearchParams();
        urlencoded.append("correo", user.toLowerCase());
        urlencoded.append("contrasena", pass);
    
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: urlencoded,
            redirect: 'follow'
        };
    
       await fetch(`${this.url}/jwt`, requestOptions)
            .then(response => response.text())
            .then(result => {
               let  elToken=JSON.parse(result).access_token;
                if (typeof elToken!==undefined) {
                    if (typeof elToken!== null) {
                        localStorage.setItem('correoUser',user.toLowerCase());
                        localStorage.setItem('passUser',pass);
                        localStorage.setItem('token',elToken);
                        location.href='index.html';
                    } else {
                        this.mostrarMensaje(`No se lograron validar los credenciales, por favor revise los datos e intente de nuevo`, `error`);
                    }
                } else {
                    this.mostrarMensaje(`No se lograron validar los credenciales, por favor revise los datos e intente de nuevo`, `error`);
                }
            })
            .catch(error => this.mostrarMensaje(`No se lograron validar los credenciales, por favor revise los datos e intente de nuevo`, `error`));
    } catch (error) {
        this.mostrarMensaje(`No se lograron validar los credenciales, por favor revise los datos e intente de nuevo`, `error`);
    }

   
}



function mostrarMensaje(body,type) {
    Swal.fire({
        title: 'Atención!',
        text: body,
        icon: type,
        confirmButtonText: 'Ok'
    });
}




