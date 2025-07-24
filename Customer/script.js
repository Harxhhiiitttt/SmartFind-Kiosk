let aisleTimeouts = { A: null, B: null, C: null, D: null, E: null, F: null };
const defaultColor = '#efefef';
const API_URL = 'http://localhost:3000/api/products';

async function fetchProducts() {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error.message);
    return [];
  }
}

async function searchItem(kioskId) {
  const query = document.getElementById(`searchBox${kioskId}`).value.toLowerCase().trim();
  const resultElement = document.getElementById(`result${kioskId}`);
  const kioskColors = ['#a4eda4', '#fac0d7', '#fcfda2'];
  const kioskColorNames = ['green', 'pink', 'yellow'];
  const kioskColor = kioskColors[kioskId - 1];
  const kioskColorName = kioskColorNames[kioskId - 1];
  

  if (!query) {
    resultElement.innerHTML = '<br>Please enter an item to search.';
    fadeIn(resultElement);
    setTimeout(() => resetKiosk(kioskId), 5000);
    return;
  }

  const products = await fetchProducts();
//   const product = products.find(p => p.name.toLowerCase() === query);
  const product = products.find(p => p.name.toLowerCase().includes(query));

  if (product && product.aisle) {
    const now = Date.now();
    if (aisleTimeouts[product.aisle] && now < aisleTimeouts[product.aisle].endTime) {
      displayWaitMessage(kioskId);
      return;
    }

    if (aisleTimeouts[product.aisle]) clearTimeout(aisleTimeouts[product.aisle].timeoutId);

    updateAisleButtons(kioskColor, product.aisle);

    resultElement.innerHTML = `
      <br><strong>Aisle: ${product.aisle}</strong><br><br>
      Look for the highlighted aisle board in <strong>${kioskColorName}</strong>.<br><br>
      Thank you for shopping with us!
    `;
    fadeIn(resultElement);

    document.getElementById(`searchBox${kioskId}`).value = '';

    aisleTimeouts[product.aisle] = {
      timeoutId: setTimeout(() => {
        resetAisleColors();
        updateAisleButtons(defaultColor, product.aisle);
        aisleTimeouts[product.aisle] = null;
      }, 5000),
      endTime: now + 5000
    };

    setTimeout(() => resetKiosk(kioskId), 5000);
  } else {
    resultElement.innerHTML = `
      <br>Item "<strong>${query}</strong>" not found.<br>
      Try searching for a similar category or ask a staff member.
    `;
    fadeIn(resultElement);

    document.getElementById(`searchBox${kioskId}`).value = '';

    setTimeout(() => resetKiosk(kioskId), 5000);
  }
}

function displayWaitMessage(kioskId) {
  const resultElement = document.getElementById(`result${kioskId}`);
  resultElement.innerHTML = '<br><br>Please wait 5 seconds before trying again.';
  fadeIn(resultElement);
  setTimeout(() => fadeOut(resultElement), 5000);
}

function updateAisleButtons(color, aisle) {
  const aisleElement = document.getElementById(`aisle${aisle}`);
  if (aisleElement) {
    aisleElement.style.backgroundColor = color;
    aisleElement.style.transition = 'background-color 0.5s ease-in-out';
  }
}

function resetAisleColors() {
  document.querySelectorAll('.aisle-buttons button').forEach(button => {
    button.style.backgroundColor = defaultColor;
  });
}

function resetKiosk(kioskId) {
  const resultElement = document.getElementById(`result${kioskId}`);
  fadeOut(resultElement, () => {
    resultElement.innerHTML = '';
  });
}

function fadeIn(element) {
  element.classList.remove('fade-out');
  element.classList.add('fade-in');
}

function fadeOut(element, callback) {
  element.classList.remove('fade-in');
  element.classList.add('fade-out');
  setTimeout(() => {
    if (callback) callback();
  }, 500);
}

function lightUpAisle(aisle) {
  const now = Date.now();
  if (aisleTimeouts[aisle] && now < aisleTimeouts[aisle].endTime) {
    return;
  }

  if (aisleTimeouts[aisle]) clearTimeout(aisleTimeouts[aisle].timeoutId);

  updateAisleButtons('#ffcc00', aisle);

  aisleTimeouts[aisle] = {
    timeoutId: setTimeout(() => {
      resetAisleColors();
      updateAisleButtons(defaultColor, aisle);
      aisleTimeouts[aisle] = null;
    }, 5000),
    endTime: now + 5000
  };
}