document.addEventListener("DOMContentLoaded", function() {
  const gridRow = document.querySelector('.grid-row');
  if (!gridRow) return;

  const recipes = Array.from(gridRow.querySelectorAll('.recipe'));

  // 1. Copy the data-date string and wrap it cleanly inside your requested angle brackets
  recipes.forEach(recipe => {
    const dateValue = recipe.getAttribute('data-date');
    const timestampElement = recipe.querySelector('.timestamp');
    
    if (timestampElement) {
      if (dateValue && dateValue.trim() !== "") {
        // Injects the exact characters: >Last made: Your Date Here<
        timestampElement.textContent = `>Last made: ${dateValue}<`; 
      } else {
        timestampElement.textContent = ">Last made: Never<";
      }
    }
  });

  // 2. Sort your recipe cards chronologically by comparing the date values
  recipes.sort((recipeA, recipeB) => {
    const dateStrA = recipeA.getAttribute('data-date') || "";
    const dateStrB = recipeB.getAttribute('data-date') || "";

    if (!dateStrA) return 1;
    if (!dateStrB) return -1;

    // Convert strings to a timestamp value solely for sorting calculations
    const timeA = new Date(dateStrA).getTime() || 0;
    const timeB = new Date(dateStrB).getTime() || 0;

    return timeB - timeA; // Newest dates at the top
  });

  // 3. Update the layout display order
  gridRow.innerHTML = '';
  recipes.forEach(recipe => {
    gridRow.appendChild(recipe);
  });
});