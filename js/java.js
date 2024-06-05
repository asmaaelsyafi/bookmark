var siteName = document.getElementById('siteName');
var siteUrl = document.getElementById('siteUrl');
var submitBtn = document.getElementById('submitBtn');
// var delBtn = document.getElementById('delBtn');

submitBtn.onclick = addSite;


var list=[];

if(localStorage.getItem('sites')!==null){
    list=JSON.parse(localStorage.getItem('sites'));
    display()
}
else{
    list=[];
}


function addSite() {
  var site = {
    sName: siteName.value,
    sUrl: siteUrl.value,
  }
  list.push(site);
  localStorage.setItem('sites',JSON.stringify(list))
  display();
  reset();
}

function display(){
var container=``;
for(var i=0;i<list.length;i++){
    container+=`  
    <tbody class="text-center">
                            <tr>
                                <td class="py-3">${i}</td>
                                <td class="text-uppercase">${list[i].sName}</td>
                                <td><a href="${list[i].sUrl}" target="_blank" class="rounded px-4 py-2">
                                        <i class="fa-solid fa-eye"></i>
                                        Visit
                                    </a></td>
                                <td><button id="delBtn" onclick=del(${i}) class="rounded px-3 py-2">
                                        <i class="fa-solid fa-trash"></i>
                                        Delete
                                    </button></td>
                            </tr>
                        </tbody>
                        `   
}
document.getElementById('tableBody').innerHTML=container;

}

function reset(){
    siteName.value=null;
    siteUrl.value=null;
}

function del(index){
    list.splice(index,1)
    display()
    localStorage.setItem('sites',JSON.stringify(list))
    console.log(list)
}


var selectedInput =document.querySelectorAll('.selectedInput')

for( var i=0 ; i<selectedInput.length ; i++){
    selectedInput[i].addEventListener('input',function(e){
        var inputId =e.target.id;
        var inputValue=e.target.value;

        validationInput(inputId,inputValue);

    })
}

var inputAlert=document.querySelector('.bgAlert');

function validationInput(id,value){
    var regex={
        siteName:/^[a-z]{3,}$/,
        siteUrl:/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)/
    }
    // console.log(value)
    console.log(regex[id])
    var elm=document.getElementById(id)
    if(regex[id].test(value)==true){
        // console.log('match');
        elm.classList.add('is-valid');
        elm.classList.remove('is-invalid')
        inputAlert.classList.replace('d-flex','d-none')

    }
    else{
        // console.log('nomatch');
        elm.classList.add('is-invalid');
        elm.classList.remove('is-valid')
        inputAlert.classList.replace('d-none','d-flex')
    }

}

// for alert 
var closeAlert =document.getElementById('closeAlert')
closeAlert.addEventListener('click',closeBtn);

function closeBtn(){
    inputAlert.classList.replace('d-flex','d-none') 
}
