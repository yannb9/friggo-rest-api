const fs = require('fs');

function generateItemID(){
  return Math.floor(Math.random()*90000) + 10000;
}

function save(data){
  return new Promise((resolve, reject) => {
    fs.writeFile('data.json', JSON.stringify(data, null, 2), (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

/**
 * Gets all products
 * @param None
 */
function getJSONFile() {
  return new Promise((resolve, reject) => {
    fs.readFile('data.json', 'utf8', (err, data) => {
      if (err) {
        reject(err);
      } else {
        const json = JSON.parse(data);
        resolve(json);
      }
    });
  })
}

/**
 * Gets a specific quote by ID
 * @param {number} id - Accepts the ID of the specified quote.
 */
async function getItem(id) {
  const items = await getInventoryItems();
  return items.find(item => item.id == id);
}


/**
 * Creates a new quote record 
 * @param {Object} newRecord - Object containing info for new quote: the quote text, author and year 
 */
async function createItem(newItem) {
  const json = await getJSONFile(); 
  newItem.id = generateItemID();
  json.inventory.push(newItem)
  await save(json); 
  return newItem; 
}


module.exports = {
  getJSONFile,
  getItem,
  createItem
}