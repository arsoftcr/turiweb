var email=document.getElementById('emailbox');
var envio=document.getElementById('envio');

envio.addEventListener('click',(e)=>{

    e.preventDefault();

    try {
    
        if (typeof(email.value)!=='undefined'&&typeof(email.value)!=='null'&&email.value!=='') {
            let reg = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
                
            if (email.value.match(reg)) {
                alert('ok')
            } else {
                alert('no ok')
            }
        } else {
            alert('no ok')
        }
    } catch (error) {
        alert(error)
    }
    
});


