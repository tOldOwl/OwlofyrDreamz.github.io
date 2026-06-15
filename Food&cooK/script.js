// Open 'mytextfile.txt' and extract the words inside it
fetch('blueberry_muffins.txt')
  .then(response => {
    if (!response.ok) throw new Error('Could not find the text file');
    return response.text();
  })
  .then(text => {
    // Put the text inside your <p> tag
    document.getElementById('recipe-text').textContent = text;
  })
  .catch(error => {
    console.error('Error:', error);
    document.getElementById('recipe-text').textContent = 'Failed to load recipe text.';
  });