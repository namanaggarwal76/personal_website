document.getElementById('analyzeBtn').addEventListener('click', analyzeText);

function analyzeText() {
    const text = document.getElementById('textInput').value;
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';
    
    if (!text.trim()) {
        resultsDiv.innerHTML = '<p>Please enter some text to analyze.</p>';
        return;
    }

    // Basic Text Statistics
    const stats = getTextStatistics(text);
    displayResults('Basic Text Statistics', stats, resultsDiv);

    // Pronouns Analysis
    const pronouns = countPronouns(text);
    displayTableResults('Pronouns Count', pronouns, resultsDiv);

    // Prepositions Analysis
    const prepositions = countPrepositions(text);
    displayTableResults('Prepositions Count', prepositions, resultsDiv);

    // Articles Analysis
    const articles = countArticles(text);
    displayTableResults('Articles Count', articles, resultsDiv);
}

function getTextStatistics(text) {
    const letters = text.replace(/[^a-zA-Z]/g, '').length;
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    const spaces = (text.match(/ /g) || []).length;
    const newlines = (text.match(/\n/g) || []).length;
    const specialChars = text.replace(/[a-zA-Z0-9\s]/g, '').length;

    return [
        { name: 'Letters', value: letters.toLocaleString() },
        { name: 'Words', value: words.toLocaleString() },
        { name: 'Spaces', value: spaces.toLocaleString() },
        { name: 'Newlines', value: newlines.toLocaleString() },
        { name: 'Special Symbols', value: specialChars.toLocaleString() }
    ];
}

function countPronouns(text) {
    const pronouns = [
        'I', 'me', 'my', 'mine', 'myself',
        'you', 'your', 'yours', 'yourself', 'yourselves',
        'he', 'him', 'his', 'himself',
        'she', 'her', 'hers', 'herself',
        'it', 'its', 'itself',
        'we', 'us', 'our', 'ours', 'ourselves',
        'they', 'them', 'their', 'theirs', 'themselves',
        'this', 'that', 'these', 'those',
        'who', 'whom', 'whose', 'which', 'what'
    ];

    const pronounCount = {};
    pronouns.forEach(pronoun => {
        const regex = new RegExp(`\\b${pronoun.toLowerCase()}\\b`, 'g');
        const matches = text.toLowerCase().match(regex);
        pronounCount[pronoun] = matches ? matches.length : 0;
    });
    return Object.entries(pronounCount)
        .filter(([_, count]) => count > 0)
        .sort((a, b) => b[1] - a[1])
        .map(([pronoun, count]) => ({ name: pronoun, value: count }));
}

function countPrepositions(text) {
    const prepositions = [
        'about', 'above', 'across', 'after', 'against', 'along', 'among', 'around',
        'at', 'before', 'behind', 'below', 'beneath', 'beside', 'between', 'beyond',
        'by', 'down', 'during', 'for', 'from', 'in', 'inside', 'into', 'near', 'of',
        'off', 'on', 'out', 'over', 'through', 'to', 'toward', 'under', 'until',
        'up', 'upon', 'with', 'within', 'without'
    ];

    const prepCount = {};
    prepositions.forEach(prep => {
        const regex = new RegExp(`\\b${prep}\\b`, 'g');
        const matches = text.toLowerCase().match(regex);
        prepCount[prep] = matches ? matches.length : 0;
    });
    return Object.entries(prepCount)
        .filter(([_, count]) => count > 0)
        .sort((a, b) => b[1] - a[1])
        .map(([prep, count]) => ({ name: prep, value: count }));
}

function countArticles(text) {
    const articles = ['a', 'an'];
    const articleCount = {};
    articles.forEach(article => {
        const regex = new RegExp(`\\b${article}\\b`, 'g');
        const matches = text.toLowerCase().match(regex);
        articleCount[article] = matches ? matches.length : 0;
    });
    return Object.entries(articleCount)
        .filter(([_, count]) => count > 0)
        .sort((a, b) => b[1] - a[1])
        .map(([article, count]) => ({ name: article, value: count }));
}

function displayResults(title, data, container) {
    const section = document.createElement('div');
    section.className = 'result-section';
    
    const heading = document.createElement('h2');
    heading.textContent = title;
    section.appendChild(heading);
    
    const list = document.createElement('ul');
    data.forEach(item => {
        const li = document.createElement('li');
        li.innerHTML = `<strong>${item.name}:</strong> ${item.value}`;
        list.appendChild(li);
    });
    section.appendChild(list);
    container.appendChild(section);
}

function displayTableResults(title, data, container) {
    const section = document.createElement('div');
    section.className = 'result-section';
    
    const heading = document.createElement('h2');
    heading.textContent = title;
    section.appendChild(heading);
    
    if (data.length === 0) {
        const p = document.createElement('p');
        p.textContent = 'No items found';
        section.appendChild(p);
    } else {
        const table = document.createElement('table');
        const thead = document.createElement('thead');
        const headerRow = document.createElement('tr');
        const th1 = document.createElement('th');
        th1.textContent = 'Item';
        const th2 = document.createElement('th');
        th2.textContent = 'Count';
        headerRow.appendChild(th1);
        headerRow.appendChild(th2);
        thead.appendChild(headerRow);
        table.appendChild(thead);
        
        const tbody = document.createElement('tbody');
        data.forEach(item => {
            const row = document.createElement('tr');
            const td1 = document.createElement('td');
            td1.textContent = item.name;
            const td2 = document.createElement('td');
            td2.textContent = item.value;
            row.appendChild(td1);
            row.appendChild(td2);
            tbody.appendChild(row);
        });
        table.appendChild(tbody);
        section.appendChild(table);
    }
    container.appendChild(section);
}