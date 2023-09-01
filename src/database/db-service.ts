import { enablePromise, openDatabase, SQLiteDatabase } from 'react-native-sqlite-storage';
import { foodItem, restaurantItem } from './models';

const restaurantTableName = 'restaurantData';
const foodItemsTableName = 'foodItemData';

enablePromise(true);

export const getDBConnection = async () => {
  return openDatabase({ name: 'restaurant-data.db', location: 'default' });
};


// Restaurants Section //

export const createTable = async (db: SQLiteDatabase) => {
  // create table if not exists
  const query = `CREATE TABLE IF NOT EXISTS ${restaurantTableName}(
        name TEXT NOT NULL,
        rating TEXT NOT NULL,
        price_delivery TEXT NOT NULL,
        price_delivery_usual TEXT NOT NULL,
        menu_discount TEXT NOT NULL,
        image TEXT NOT NULL
    );`;

  await db.executeSql(query);
};

export const getRestaurantItems = async (db: SQLiteDatabase): Promise<restaurantItem[]> => {
  try {
    const restaurantItems: restaurantItem[] = [];
    const results = await db.executeSql(`SELECT rowid as id, name, rating, price_delivery as priceDelivery, price_delivery_usual as priceDeliveryUsual, menu_discount as menuDiscount, image FROM ${restaurantTableName}`);
    results.forEach(result => {
      for (let index = 0; index < result.rows.length; index++) {
        restaurantItems.push(result.rows.item(index))
      }
    });
    return restaurantItems;
  } catch (error) {
    console.error(error);
    throw Error('Failed to get restaurantItems !!!');
  }
};

export const saveRestaurantItems = async (db: SQLiteDatabase, restaurantItems: restaurantItem[]) => {
  try{
    const insertQuery =
    `INSERT OR REPLACE INTO ${restaurantTableName}(rowid, name, rating, price_delivery, price_delivery_usual, menu_discount, image) values` +
    restaurantItems.map(i => `(${i.id}, '${i.name}', '${i.rating}', '${i.priceDelivery}', '${i.priceDeliveryUsual}', '${i.menuDiscount}', '${i.image}')`).join(',');
    return db.executeSql(insertQuery);

  } catch (error) {
    console.log(error);
    throw Error('Failed to insert restaurantItems !!!');
  }
};

export const deleteRestaurantItem = async (db: SQLiteDatabase, id: number) => {
  const deleteQuery = `DELETE from ${restaurantTableName} where rowid = ${id}`;
  await db.executeSql(deleteQuery);
};

export const deleteTable = async (db: SQLiteDatabase) => {
  const query = `drop table ${restaurantTableName}`;

  await db.executeSql(query);
};


// Restaurant Food Items Section //

export const createFoodItemTable = async (db: SQLiteDatabase) => {
  // create table if not exists
  const query = `CREATE TABLE IF NOT EXISTS ${foodItemsTableName}(
        restaurant_id INT NOT NULL
        category_id INTEGER NOT NULL
        name TEXT NOT NULL,
        price INTEGER NOT NULL,
        description TEXT NOT NULL,
        discount INTEGER NOT NULL,
        image TEXT NOT NULL,
        popular BOOLEAN NOT NULL CHECK (popular IN (0, 1)),
        available BOOLEAN NOT NULL CHECK (available IN (0, 1))
    );`;

  await db.executeSql(query);
};

export const getFoodItemsByRestaurantId = async (db: SQLiteDatabase, restaurantId: number): Promise<foodItem[]> => {
  try {
    const foodItems: foodItem[] = [];
    const results = await db.executeSql(`
        SELECT rowid as id, restaurant_id as restaurantId, category_id as categoryId, name, price, description, discount, image, popular, available
        FROM ${foodItemsTableName}
        WHERE restaurantId = ${restaurantId}
    `);
    results.forEach(result => {
      for (let index = 0; index < result.rows.length; index++) {
        foodItems.push(result.rows.item(index))
      }
    });
    return foodItems;
  } catch (error) {
    console.error(error);
    throw Error(`Failed to get foodItems for restaurant ${restaurantId} !!!`);
  }
};