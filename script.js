let load = document.getElementById("loading");
window.onload = function(){
    setTimeout(function(){
        load.classList.add("loadingtransion");
    }, 2000);
    setTimeout(function(){
        load.style.display = 'none';
    }, 2200);
}
