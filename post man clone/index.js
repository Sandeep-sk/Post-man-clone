// hide the json data insert field first as default
document.querySelector('.json').style.display = 'none'; 

// hide json data filed or custom parameter field on check json or custom radio button respectively
let jsonChoose = document.querySelector('#json');
let customChoose = document.querySelector('#custom');
jsonChoose.addEventListener('click', () => {
    if (jsonChoose.checked) {
        document.querySelector('.json').style.display = 'block';
        document.querySelector('.field').style.display = 'none';
        document.querySelector('.parameterBox').style.display = 'none';
    }
})
customChoose.addEventListener('click', () => {
    if (customChoose.checked) {
        document.querySelector('.json').style.display = 'none';
        document.querySelector('.field').style.display = 'flex';
        document.querySelector('.parameterBox').style.display = 'flex';
    }
})

// utility function to get element form the string
function getElementFromString(string) {
    let div = document.createElement('div');
    div.innerHTML = string;
    return div.firstElementChild;
}

let onClickPlus = document.getElementById('plus');
let parameterBox = document.querySelector('.parameterBox');
let parameterCount = 0;
let collection;
onClickPlus.addEventListener('click', (event) => {
    let increaseParameter = `<div class="field">
                                Parameter${parameterCount + 2}
                                <div class="parameterfield">
                                    <div class="parameter">
                                        <input type="text" class="input" id="parameterKey${parameterCount + 2}" placeholder="key">
                                        <input type="text" class="input" id="parameterValue${parameterCount + 2}" placeholder="value">
                                    </div>
                                    <div> <button class="minus">-</button></div>
                                </div>
                            </div>`;
    let element = getElementFromString(increaseParameter);
    parameterBox.appendChild(element);
    // deleting on click minus button
    collection = document.getElementsByClassName('minus');
    for (item of collection) {
        item.addEventListener('click', (event) => {
            event.target.parentElement.parentElement.parentElement.remove();
        });
    }
    parameterCount++;
})


// on submit collect all deatils 
let submit = document.getElementById('submit');
submit.addEventListener('click', (event) => {
    console.log('submit button click');
     let responseField=document.querySelector('.response');
    responseField.innerHTML=`<div><textarea name="responsedata" class="responsedata" id="responsedata" cols="50" rows="20"></textarea></div>`;

    //  document.getElementById('responsedata').value="Please wait data show here...";
     document.getElementById('responsedata').innerHTML="Please wait data show here...";
    let url = document.getElementById('url').value;
    let request = document.querySelector("input[name='request']:checked").value;
    // on GET Request
    if (request == 'get') {
        fetch(url, { method: 'GET' }).then(response => response.text()).then(text => {
            document.getElementById('responsedata').value = text;
        });
    } 
    // on Post Request
    if (request == 'post') {
        let content = document.querySelector("input[name='contentType']:checked").value;
        let data = {};

            // if data is json
            if (content == 'json') {
                    let jsondata =document.getElementById('jsondata').value;
                    console.log(jsondata);
             }
            else {  // if data is custom type
                    for (let i = 0; i < parameterCount + 1; i++) {
                        let key = document.getElementById(`parameterKey${i + 1}`).value;
                        let value = document.getElementById(`parameterValue${i + 1}`).value;
                        data[key] = value;
                    }
                    console.log(data);
            }

            fetch(url, {
                method: 'POST', body: (content=='json')? JSON.stringify(jsondata): JSON.stringify(data), headers: { 'Content-type': 'application/json; charset=UTF-8' }
                }).then(response => response.text()).then(text => {
                    // document.getElementById('responsedata').value =text;
                    document.getElementById('responsedata').innerHTML =text;
            });
    }
    
})