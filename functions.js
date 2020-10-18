const fs = require('fs');

function generateItemID() {
  return Math.floor(Math.random() * 90000) + 10000;
}

function save(data) {
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
 * Get Backup Data from backup.json
 * @param None
 */
function getBackupData() {
  return new Promise((resolve, reject) => {
    fs.readFile('backup.json', 'utf8', (err, data) => {
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
 * Gets Data from data.json
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
 * Gets a specific item by ID
 * @param {number} id - Accepts the ID of the specified item.
 */
async function getItem(id) {
  const items = await getInventoryItems();
  return items.find(item => item.id == id);
}

/**
 * Creates a new product
 * @param {Object} newProduct - Object containing info for new product
 */
async function addProduct(newProduct) {
  const json = await getJSONFile();
  json.products.push(newProduct)
  await save(json);
  return newProduct;
}

/**
 * Creates a new item
 * @param {Object} newItem - Object containing info for new item
 */
async function createItem(newItem) {
  const json = await getJSONFile();
  newItem.id = generateItemID();
  json.inventory.push(newItem)
  await save(json);
  return newItem;
}

/**
 * Updates a single item 
 * @param {Object} newItem - An object containing the changes to item
 */
async function updateItem(newItem) {
  const json = await getJSONFile();
  let item = json.inventory.find(item => item.id == newItem.id)
  item.price = newItem.price
  item.quantity = newItem.quantity
  item.aisle = newItem.aisle,
    await save(json);
}

/**
 * Deletes a single item
 * @param {Object} item - Accepts item to be deleted. 
 */

async function deleteItem(item) {
  const products = await getJSONFile();
  products.inventory = products.inventory.filter(product => product.id != item.id);
  await save(products)
}

async function resetData() {
  const backup = await getBackupData();
  await save(backup);
}

module.exports = {
  getJSONFile,
  addProduct,
  getItem,
  createItem,
  updateItem,
  deleteItem,
  resetData
}