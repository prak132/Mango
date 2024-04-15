let problem_link = ["/problemset/problem/69/A", "/problemset/problem/69/B", "/problemset/problem/69/C", "/problemset/problem/69/D"];
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
            <a href="${problem_link[0]}" target="_blank">
                Problem 1
            </a>
            </span>
    
            <div style="clear: both;"></div>
        </li>
    
        <li>
            <span>
            <a href="${problem_link[1]}" target="_blank">
                Problem 2
            </a>
            </span>
    
            <div style="clear: both;"></div>
        </li>
        <li>
            <span>
            <a href="${problem_link[2]}" target="_blank">
                Problem 3
            </a>
            </span>
    
            <div style="clear: both;"></div>
        </li>
        <li>
            <span>
            <a href="${problem_link[3]}" target="_blank">
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
try {
    var ratingElement = document.querySelector('.tag-box[title="Difficulty"]');
    var ratingText = ratingElement.textContent;
    var rating = parseInt(ratingText.replace('*', ''), 10);
    console.log(rating);
} catch (error) {
    console.log('cant find the rating');
}