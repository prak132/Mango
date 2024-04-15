window.onload = function() {
    var rating = document.getElementById('rating');
    rating.onchange = function() {
      document.getElementById('value').innerHTML = this.value;
    }
    document.getElementById('value').innerHTML = rating.value;
}