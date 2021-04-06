
var  registrobtn=document.getElementById('registrobtn');
var  nombretxt=document.getElementById('nombre');
var  emailtxt=document.getElementById('email');
var  passwordtxt=document.getElementById('password');



registrobtn.addEventListener('click',async(e)=>{
    e.preventDefault();
    if (typeof(nombretxt.value)!=='undefined'&&typeof(nombretxt.value)!=='null'&&nombretxt.value!==''
    &&typeof(emailtxt.value)!=='undefined'&&typeof(emailtxt.value)!=='null'&&emailtxt.value!==''
    &&typeof(passwordtxt.value)!=='undefined'&&typeof(passwordtxt.value)!=='null'&&passwordtxt.value!==''){
        let reg = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
        if (emailtxt.value.match(reg)){
           await registro(emailtxt.value.toLowerCase(),passwordtxt.value);
        }else{
           await Swal.fire({
                title: 'Atención!',
                text: 'El formato del correo no es correcto',
                icon: 'warning',
                confirmButtonText: 'Ok'
            });
        }
        
    }
    else {
       await Swal.fire({
            title: 'Atención!',
            text: 'Faltan datos',
            icon: 'warning',
            confirmButtonText: 'Ok'
        });
    }
});

async function registro(correo,pass) {
    try {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
    

        var raw = JSON.stringify({
            "correo": correo,
            "contrasena": pass
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

       await fetch("https://placescr.azurewebsites.net/registro", requestOptions)
            .then(response => response.text())
            .then(result => {
                Swal.fire({
                    title: 'Resultado!',
                    text: result,
                    icon: 'success',
                    confirmButtonText: 'Ok'
                });
                location.href='login.html';
            })
            .catch(error => {
                 Swal.fire({
                    title: 'Error!',
                    text: error,
                    icon: 'error',
                    confirmButtonText: 'Ok'
                });
            });
    } catch (error) {
        Swal.fire({
            title: 'Error!',
            text: error,
            icon: 'error',
            confirmButtonText: 'Ok'
        });
    }
}