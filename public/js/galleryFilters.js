let sortFilterForm = document.getElementById("sorts_filter");
let sortby = document.getElementById("sorts");
let filterby = document.getElementById("filters");

if (sortFilterForm) {
    sortFilterForm.addEventListener('submit', (event) => {
        event.preventDefault();
        alert(sortby.value.trim());

    });
}