var targetElement = document.querySelector('div.roundbox.sidebox.sidebar-menu.borderTopRound');
if (targetElement) {
    var newElement = document.createElement('div');
    newElement.innerHTML = `
    <div class="roundbox sidebox sidebar-menu borderTopRound " style="">
        <div class="caption titled">
        → Similar Problems
        <div class="top-links"></div>
        </div>
        <ul>
        <li>
            <span>
            <a href="/problemset/problem/69/A" target="_blank">
                Problem 1
            </a>
            </span>
    
            <div style="clear: both;"></div>
        </li>
    
        <li>
            <span>
            <a href="/problemset/problem/69/A" target="_blank">
                Problem 2
            </a>
            </span>
    
            <div style="clear: both;"></div>
        </li>
        <li>
            <span>
            <a href="/problemset/problem/69/A" target="_blank">
                Problem 3
            </a>
            </span>
    
            <div style="clear: both;"></div>
        </li>
        <li>
            <span>
            <a href="/problemset/problem/69/A" target="_blank">
                Problem 4
            </a>
            </span>
    
            <div style="clear: both;"></div>
        </li>
        </ul>
    </div>
    `;
    targetElement.parentNode.insertBefore(newElement, targetElement.nextSibling);
} else {
    console.log('Target element not found.');
}

var ratingElement = document.querySelector('.tag-box[title="Difficulty"]');
var ratingText = ratingElement.textContent;
var rating = parseInt(ratingText.replace('*', ''), 10);
console.log(rating);