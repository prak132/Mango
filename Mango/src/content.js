const API_URL_PREFIX = "https://codeforces.com/api/problemset.problems";

const allWordsUnique = [
    '2-sat',
    'binary search',
    'bitmasks',
    'brute force',
    'combinatorics',
    'constructive algorithms',
    'data structures',
    'dfs and similar',
    'divide and conquer',
    'dp',
    'dsu',
    'expression parsing',
    'fft',
    'flow',
    'games',
    'geometry',
    'graph matchings',
    'graphs',
    'greedy',
    'hashing',
    'implementation',
    'interactive',
    'math',
    'matrices',
    'number theory',
    'probabilities',
    'schedules',
    'shortest paths',
    'sortings',
    'strings',
    'ternary search',
    'trees',
    'two pointers',
];

function countTokenizer(sWords) {
    return allWordsUnique.map(w => (sWords.includes(w) ? 1 : 0));
}

function cosineSimilarity(vec1, vec2) {
  const dotProduct = vec1.map((val, i) => val * vec2[i]).reduce((accum, curr) => accum + curr, 0);
  const vec1Size = calcVectorSize(vec1);
  const vec2Size = calcVectorSize(vec2);

  return dotProduct / (vec1Size * vec2Size);
};

function calcVectorSize(vec) {
  return Math.sqrt(vec.reduce((accum, curr) => accum + Math.pow(curr, 2), 0));
};

async function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

async function fetch_problems(input_tags) {
    const url = new URL(API_URL_PREFIX)
    if(input_tags.length !== 0) {
        // TODO: make search for 2 random tags
        url.searchParams.append("tags", input_tags[await getRandomInt(input_tags.length)])
        // url.searchParams.append("tags", "brute forces;strings;two pointers")
    }
    console.log(url.toString())
    const resp = await fetch(url)
    const text = await resp.text();
    if (resp.status !== 200) {
        throw new Error(`CF API: HTTP error ${resp.status}: ${text}`)
    }
    let json;
    try {
        json = JSON.parse(text);
    } catch (_) {
        throw new Error(`CF API: Invalid JSON: ${text}`);
    }
    if (json.status !== 'OK' || json.result === undefined) {
        throw new Error(`CF API: Error: ${text}`);
    }
    return json.result.problems;
}

function weight(score, delta) {
    return score / (Math.pow(Math.abs(delta - 50) / 250, 10/Math.abs(delta/100)) + 1);
}

async function find_similar_problems(prob) {
    let input_tags, input_rating
    problems = await fetch_problems([]);
    for(problem of problems) {
        if(problem.contestId == prob.contestId && problem.index == prob.index) {
            input_tags = problem.tags
            input_rating = problem.rating ? problem.rating : 800 + 200 * (problem.index.charCodeAt() - 65);
            break;
        }
    }
    problems = await fetch_problems(input_tags);
    problem_tags = problems.map(p => p.tags);
    problem_vectors = problem_tags.map((p) => { return countTokenizer(p)})
    input_tag_vector = countTokenizer(input_tags);
    cosine_similarities = problem_vectors.map(v => cosineSimilarity(v, input_tag_vector));
    similarity_scores = cosine_similarities.map((s, i) => {
        o = problems[i].rating ? problems[i].rating : 0;
        return weight(s, o - input_rating);
    })
    top_indices = similarity_scores.map((s, i) => [s, i]).sort().map(s => s[1]).slice(-6).reverse()
    top_problems = top_indices.map(i => problems[i])
    for(let i = 0; i < top_problems.length; i++) {
        if(top_problems[i].contestId == prob.contestId && top_problems[i].index == prob.index) {
            [top_problems[i], top_problems[5]] = [top_problems[5], top_problems[i]]
        }
    }
    return top_problems
}
async function main() {
    var targetElement = document.querySelector('div.roundbox.sidebox.sidebar-menu.borderTopRound');
    if (targetElement) {
        let matches = location.pathname.match(/contest\/(\d*)\/problem\/([A-Z]*\d*)/)
        if(!matches) {
            matches = location.pathname.match(/problemset\/problem\/(\d*)\/([A-Z]*\d*)/)
        }
        matches = matches ? {contestId: matches[1], index: matches[2]} : null
        if(!matches) {
            console.log("no problem found");
            return;
        }
        problems = await find_similar_problems(matches);
        problems = problems.map(p => [`https://codeforces.com/problemset/problem/${p.contestId}/${p.index}`, `${p.name} (${p.rating ? p.rating : "No Rating Yet"})`])
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
                <a href="${problems[0][0]}" target="_blank">
                    ${problems[0][1]}
                </a>
                </span>
        
                <div style="clear: both;"></div>
            </li>
        
            <li>
                <span>
                <a href="${problems[1][0]}" target="_blank">
                    ${problems[1][1]}
                </a>
                </span>
        
                <div style="clear: both;"></div>
            </li>
            <li>
                <span>
                <a href="${problems[2][0]}" target="_blank">
                    ${problems[2][1]}
                </a>
                </span>
        
                <div style="clear: both;"></div>
            </li>
            <li>
                <span>
                <a href="${problems[3][0]}" target="_blank">
                    ${problems[3][1]}
                </a>
                </span>
        
                <div style="clear: both;"></div>
            </li>
            <li>
                <span>
                <a href="${problems[4][0]}" target="_blank">
                    ${problems[4][1]}
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
}

main()