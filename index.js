var btncreaNegocio = document.getElementById('btncreaNegocio');
var btncreaImagenes = document.getElementById('btncreaImagenes');
var btncreaOfertas = document.getElementById('btncreaOfertas');


var btncerrar = document.getElementById('btncerrar');

var snack = document.getElementById("snackbar");

var token;

var modal = document.getElementById('mod');
var efect = document.getElementById('efect');


var url = `https://placescr.azurewebsites.net`



function sesion() {


    if (localStorage.getItem('correoUser') !== '0' &&
        localStorage.getItem('passUser') !== '0') {
        localStorage.setItem('correoUser', localStorage.getItem('correoUser'))
        localStorage.setItem('passUser', localStorage.getItem('passUser'))
    }
    localStorage.removeItem('idNegocio');
    localStorage.removeItem(`token`)
    location.href = 'login.html'
}


//////////////////////////////////////// LOAD
window.addEventListener('load', async () => {


    token = localStorage.getItem('token')

    let idNegocio = localStorage.getItem('idNegocio');

    if (typeof (idNegocio) === 'null' || typeof (idNegocio) === 'undefined' || idNegocio === null) {
        await consultarPlace();
    }



    if (typeof token === undefined ||
        typeof token === null ||
        token === '' ||
        token === 'null'
        || token === null) {

        location.href = "login.html"
    } else {

        container.style.gridColumn = '5/9';
        container.style.gridRow = '2/4';


    }



});

//////////////////////////////////

document.addEventListener('DOMContentLoaded', () => {
    var elems = document.querySelectorAll('select');
    var instances = M.FormSelect.init(elems);
});



//////////////////////////////////HTML


var htmlNegocio = `
    
    <input placeholder="Título" id="tituloid" type="text" class="validate">
    
    <input placeholder="Subtítulo" id="subtituloid" type="text" class="validate">
    <textarea name="desc" placeholder="Descripción" id="textareaid"  rows="9"></textarea>
    <input placeholder="Teléfono" id="telefonoid" type="text" class="validate">
    <input placeholder="Link de google maps" id="linkid" type="text" class="validate">
    <a class="waves-effect waves-light btn" id="negociobtn">Guardar</a>`;


var htmlImagenes = `
    <style>
    .fileUpload {
        background: rgb(28,165,234);
        -webkit-border-radius: 15px;
        -moz-border-radius: 15px;
        border-radius: 15px;
        color: #fff;
        font-size: 1em;
        font-weight: bold;
        margin: 1.25em auto;/*20px/16px 0*/
        overflow: hidden;
        padding: 0.875em;/*14px/16px*/
        position: relative;
        text-align: center;
        width: 120px;
       cursor: pointer;
    }
    .fileUpload:hover, .fileUpload:active, .fileUpload:focus {
        background: #00a2a4;
      cursor: pointer;
    }
    .fileUpload input.upload {
        position: absolute;
        top: 0;
        right: 0;
        margin: 0;
        padding: 0;
        font-size: 20px;
        cursor: pointer;
        opacity: 0;
        filter: alpha(opacity=0);
        width: 148px;
        height: 46px;
      cursor: pointer;
    }
    
    input[type="file"] {
        position: fixed;
        right: 100%;
        bottom: 100%;
    }
    .custom-file-upload {
        border: 1px solid #ccc;
        display: inline-block;
        padding: 6px 12px;
        cursor: pointer;
    }
    </style>
    <div class="fileUpload">
    <input type="file" class="upload"  id="input" accept="image/jpeg,image/png,image/jpg"/>
    <span>Buscar</span>

</div>

<div >
<h5 id="ruta"><h5>
<a class="waves-effect waves-light btn" id="btncargar">Cargar imagen</a>

<p id="resultados"></p>
</div>
    `



var htmlOferta = `
    <input placeholder="Título" id="tituloinput" type="text" class="validate">
    <input placeholder="Inicio" id="iniciooferta" type="date" class="validate" >
    <input placeholder="Fin de la oferta" id="finoferta" type="date" class="validate" >
    <textarea name="desc" placeholder="Descripción" id="textareaid"  rows="9"></textarea>
    <a class="waves-effect waves-light btn" id="ofertabtn">Crear</a>`;




///////////////////////////////////////////


///////////////////////////////LISTENERS



btncerrar.addEventListener('click', () => {

    localStorage.setItem('correoUser', '0');
    localStorage.setItem('passUser', '0');

    localStorage.removeItem('idNegocio');
    localStorage.removeItem(`token`);
    location.href = 'login.html'
})



/* crear un negocio */
btncreaNegocio.addEventListener('click', (e) => {
    e.preventDefault();
    container.innerHTML = htmlNegocio;
    container.style.gridColumn = '5/9';
    container.style.gridRow = '2/7';


    let patch = '0';
    let stringyfi = '';
    let tituloid = document.getElementById('tituloid');
    let subtituloid = document.getElementById('subtituloid');
    let textareaid = document.getElementById('textareaid');
    let telefonoid = document.getElementById('telefonoid');
    let linkid = document.getElementById('linkid');

    let negociobtn = document.getElementById('negociobtn');

    if ((localStorage.getItem('idNegocio') ?? "").includes('id')) {


        stringyfi = JSON.parse(localStorage.getItem('idNegocio'));

        tituloid.value = stringyfi[0].titulo;
        subtituloid.value = stringyfi[0].subtitulo;
        textareaid.value = stringyfi[0].descripcion;
        telefonoid.value = stringyfi[0].telefono;
        linkid.value = stringyfi[0].link;

        patch = '1';
    }

    negociobtn.addEventListener('click', async (e) => {
        e.preventDefault();
        e.stopPropagation();


        if (patch === '1') {

            var raw = JSON.stringify({
                "id": stringyfi[0].id,
                "titulo": tituloid.value,
                "subtitulo": subtituloid.value,
                "descripcion": textareaid.value,
                "telefono": telefonoid.value,
                "linkMaps": linkid.value
            });

            await patchPlace(raw);

        } else {

            var raw = JSON.stringify({
                "login": localStorage.getItem('correoUser'),
                "titulo": tituloid.value,
                "subtitulo": subtituloid.value,
                "descripcion": textareaid.value,
                "telefono": telefonoid.value,
                "linkMaps": linkid.value
            });

            await crearPlace(raw);
        }


    });

});


/* crear una imagen */
btncreaImagenes.addEventListener('click', (e) => {

    e.preventDefault();
    container.innerHTML = htmlImagenes;
    container.style.gridColumn = '5/9';
    container.style.gridRow = '2/4';


    let input = document.getElementById('input');

    let ruta = document.getElementById('ruta');

    let selectedFile;

    input.addEventListener('change', (e) => {
        selectedFile = e.target.files[0];
        ruta.innerHTML = e.target.files[0].name;
    });


    let carga = document.getElementById('btncargar');

    carga.addEventListener('click', async (e) => {
        e.preventDefault();

        if (selectedFile) {
            let fileReader = new FileReader();

            fileReader.readAsDataURL(selectedFile);

            fileReader.onload = async(event) => {

                let data = event.target.result;
                let databytes=data.replace(/^data:image\/[a-z]+;base64,/, "");
                let nego=JSON.parse(localStorage.getItem('idNegocio'));
                let id=nego[0].id;
                await crearImagen(id,databytes);
                

            }
        } else {
            this.mostrarMensaje('Debe  seleccionar una imagen  por favor', `warning`);
        }

    });

});


btncreaOfertas.addEventListener('click', () => {

    container.innerHTML = htmlOferta;
    container.style.gridColumn = '5/9';
    container.style.gridRow = '2/4';


    let tituloinput = document.getElementById('tituloinput');
    let iniciooferta = document.getElementById('iniciooferta');
    let textareaid = document.getElementById('textareaid');
    let finoferta = document.getElementById('finoferta');

    let ofertabtn = document.getElementById('ofertabtn');

    ofertabtn.addEventListener('click', async (e) => {
        e.preventDefault();

        var raw = JSON.stringify({
            "titulo": tituloinput.value,
            "inicio": iniciooferta.value,
            "fin": finoferta.value,
            "descripcion": textareaid.value
        });
    });

});



//////////////////////////////////////////


async function consultarPlace() {
    try {


        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${this.token}`);

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        await fetch(`${this.url}/web?correo=${localStorage.getItem('correoUser')}`, requestOptions)
            .then(response => response.text())
            .then(result => {

                if (result.includes('id')) {

                    let parse = JSON.parse(result);

                    let desparce = JSON.stringify(parse);

                    localStorage.setItem('idNegocio', desparce);
                }


            })
            .catch(error => location.href('login.html'));
    } catch (error) {
        location.href('login.html');
    }


}


async function crearPlace(raw) {
    try {


        var myHeaders = new Headers();

        myHeaders.append("Authorization", `Bearer ${this.token}`);
        myHeaders.append("Content-Type", "application/json");

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        await fetch(`${this.url}/api/places`, requestOptions)
            .then(response => response.text())
            .then(result => {
                console.log(result);
                this.mostrarMensaje('realizado', `success`);
            })
            .catch(error => {
                this.mostrarMensaje(error, `success`);
            });
    } catch (error) {
        this.mostrarMensaje(error, `error`)
    }


}



async function patchPlace(raw) {
    try {

        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${this.token}`);
        myHeaders.append("Content-Type", "application/json");


        var requestOptions = {
            method: 'PATCH',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        await fetch(`${this.url}/api/places`, requestOptions)
            .then(response => response.text())
            .then(result => {
                console.log(result);
                this.mostrarMensaje('realizado', `success`);

            })
            .catch(error => this.mostrarMensaje(error, `error`));


    } catch (error) {
        this.mostrarMensaje(error, `error`);
    }


}


async function crearImagen(id,data) {
    try {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
     
        var raw = JSON.stringify({
            "id": id,
            "data": data
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("https://placescr.azurewebsites.net/api/Imagenes", requestOptions)
            .then(response => response.text())
            .then(result => {
                console.log(result);
                this.mostrarMensaje('realizado', `success`);
            })
            .catch(error => {
                this.mostrarMensaje(error, `error`);
            });
    } catch (error) {
        this.mostrarMensaje(error, `error`);
    }
}


async function mostrarMensaje(body, type) {
    await Swal.fire({
        title: 'Atención!',
        text: body,
        icon: type,
        confirmButtonText: 'Ok'
    });
}

function mostrarMensaje(body, type) {
    Swal.fire({
        title: 'Atención!',
        text: body,
        icon: type,
        confirmButtonText: 'Ok'
    });
}









