import "./style.css"
import html2pdf from "html2pdf.js"

window.addField=function(container,className){

const textarea=document.createElement("textarea")
textarea.className=className

document.getElementById(container).appendChild(textarea)

}

window.clearFields=function(container,className){

const containerDiv=document.getElementById(container)

const fields=containerDiv.querySelectorAll("."+className)

if(fields.length>1){

containerDiv.removeChild(fields[fields.length-1])

}else{

fields[0].value=""

}

}

document.querySelector("#app").innerHTML=`

<h1>Resume Builder</h1>

<h3>Profile Photo</h3>
<input type="file" id="photo" accept="image/*">

<h3>Signature Upload</h3>
<input type="file" id="signature" accept="image/*">

<br><br>

<input id="name" placeholder="Full Name"><br><br>
<input id="email" placeholder="Email"><br><br>
<input id="phone" placeholder="Phone"><br><br>

<h3>Education</h3>

<div id="educationContainer">
<textarea class="education"></textarea>
</div>

<button onclick="addField('educationContainer','education')">+ Add</button>
<button onclick="clearFields('educationContainer','education')">Clear</button>

<h3>Experience</h3>

<div id="experienceContainer">
<textarea class="experience"></textarea>
</div>

<button onclick="addField('experienceContainer','experience')">+ Add</button>
<button onclick="clearFields('experienceContainer','experience')">Clear</button>

<h3>Skills</h3>

<div id="skillsContainer">
<textarea class="skills"></textarea>
</div>

<button onclick="addField('skillsContainer','skills')">+ Add</button>
<button onclick="clearFields('skillsContainer','skills')">Clear</button>

<h3>Languages</h3>

<div id="languagesContainer">
<textarea class="languages"></textarea>
</div>

<button onclick="addField('languagesContainer','languages')">+ Add</button>
<button onclick="clearFields('languagesContainer','languages')">Clear</button>

<h3>Personal Details</h3>

<input id="dob" placeholder="Date of Birth"><br><br>
<input id="sex" placeholder="Sex"><br><br>
<input id="marital" placeholder="Marital Status"><br><br>
<input id="religion" placeholder="Religion"><br><br>

<textarea id="address" placeholder="Address"></textarea>

<input id="place" placeholder="Place"><br><br>

<button id="generate">Generate Resume</button>
<button id="download">Download PDF</button>

<hr>

<div id="resume"></div>

`

document.getElementById("generate").onclick=()=>{

const name=document.getElementById("name").value
const email=document.getElementById("email").value
const phone=document.getElementById("phone").value

const dob=document.getElementById("dob").value
const sex=document.getElementById("sex").value
const marital=document.getElementById("marital").value
const religion=document.getElementById("religion").value

const address=document.getElementById("address").value
const place=document.getElementById("place").value

const today=new Date().toLocaleDateString()

function listHTML(className){

const fields=document.querySelectorAll("."+className)

let html=""

fields.forEach(f=>{
if(f.value.trim()!==""){
html+=`<p>• ${f.value}</p>`
}
})

return html

}

const educationHTML=listHTML("education")
const experienceHTML=listHTML("experience")
const skillsHTML=listHTML("skills")
const languagesHTML=listHTML("languages")

const photoInput=document.getElementById("photo")
let photoURL=""

if(photoInput.files[0]){
photoURL=URL.createObjectURL(photoInput.files[0])
}

const signInput=document.getElementById("signature")
let signURL=""

if(signInput.files[0]){
signURL=URL.createObjectURL(signInput.files[0])
}

document.getElementById("resume").innerHTML=`

<div class="resume">

<h1>RESUME</h1>

<div class="top-header">

<div>

<p><b>NAME:</b> ${name}</p>
<p><b>Email:</b> ${email}</p>
<p><b>Phone:</b> ${phone}</p>

</div>

${photoURL?`<img src="${photoURL}" class="photo">`:""}

</div>

<div class="section">

<h3>OBJECTIVE</h3>

<p>
To secure a challenging position in a reputable organization where I can utilize my skills and contribute to the growth of the company.
</p>

</div>

${educationHTML?`<div class="section"><h3>EDUCATIONAL QUALIFICATION</h3>${educationHTML}</div>`:""}

${experienceHTML?`<div class="section"><h3>EXPERIENCE</h3>${experienceHTML}</div>`:""}

${skillsHTML?`<div class="section"><h3>SKILLS</h3>${skillsHTML}</div>`:""}

${languagesHTML?`<div class="section"><h3>LANGUAGES</h3>${languagesHTML}</div>`:""}

<div class="section">

<h3>PERSONAL DETAILS</h3>

${dob?`<p>Date of Birth: ${dob}</p>`:""}
${sex?`<p>Sex: ${sex}</p>`:""}
${marital?`<p>Marital Status: ${marital}</p>`:""}
${religion?`<p>Religion: ${religion}</p>`:""}

<p>Nationality: Indian</p>

</div>

${address?`<div class="section"><h3>ADDRESS</h3><p>${address}</p></div>`:""}

<div class="section declaration">

<h3>DECLARATION</h3>

<p>
I hereby declare that the information provided above is true and correct to the best of my knowledge and belief.
</p>

<div class="signature-row">

<div>
<p>Place: ${place}</p>
<p>Date: ${today}</p>
</div>

<div class="signature">

<p><b>Signature</b></p>

${signURL?`<img src="${signURL}" class="sign-img">`:""}

</div>

</div>

</div>

</div>
`

}

document.getElementById("download").onclick=()=>{

const element=document.querySelector(".resume")

html2pdf().set({

margin:0,

filename:"resume.pdf",

image:{type:'jpeg',quality:0.98},

html2canvas:{
scale:2,
useCORS:true
},

jsPDF:{
unit:'mm',
format:'a4',
orientation:'portrait'
},

pagebreak:{
mode:['css','avoid-all']
}

}).from(element).save()

}
