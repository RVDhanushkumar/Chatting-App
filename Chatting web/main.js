let x = document.querySelector(".note");
let y = document.querySelector(".item");

function n(){
    const f = document.createElement("div");
    f.textContent = document.querySelector("#text").value;
    f.style.position="relative";
    f.style.justifySelf= "start";
    f.style.backgroundColor="lightgreen";
    f.style.margin = "20px";
    f.style.borderRadius = "10px";
    f.style.textAlign = "Center";
    f.style.maxWidth="600px";
    f.style.padding="5px";
    x.appendChild(f);
    document.querySelector("#text").value = "";
}

function g(){
    const f = document.createElement("div");
    f.textContent = document.querySelector("#text").value;
    f.style.position="relative";
    f.style.justifySelf= "end";
    f.style.backgroundColor="green";
    f.style.margin = "20px";
    f.style.borderRadius = "10px";
    f.style.textAlign = "Center";
    f.style.maxWidth="600px";
    f.style.padding="5px";
    x.appendChild(f);
    document.querySelector("#text").value = "";
}