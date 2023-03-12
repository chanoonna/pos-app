import { DatabaseTable } from './types';

export const usersTableSchema = `
  CREATE TABLE ${DatabaseTable.Users} (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_name TEXT NOT NULL,
    password TEXT NOT NULL,
    language TEXT DEFAULT 'eng',
    text_size TEXT DEFAULT 'M',
    is_archived INTEGER NOT NULL DEFAULT 0,
    UNIQUE(user_name)
  )
`;
export const categoriesSchema = `
  CREATE TABLE ${DatabaseTable.Categories} (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL
  )
`;
export const itemsSchema = `
  CREATE TABLE ${DatabaseTable.Items} (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    category_id INTEGER,
    name TEXT NOT NULL,
    price INTEGER,
    wholesale_price INTEGER,
    is_archived INTEGER NOT NULL DEFAULT 0,
    FOREIGN KEY(category_id) REFERENCES categories(id)
  )
`;
export const taxesSchema = `
  CREATE TABLE ${DatabaseTable.Taxes} (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    percent INTEGER NOT NULL,
    is_archived INTEGER NOT NULL
  )
`;
export const salesSchema = `
  CREATE TABLE ${DatabaseTable.Sales} (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    date TEXT NOT NULL,
    is_whole_sale INTEGER NOT NULL DEFAULT 0,
    FOREIGN KEY(user_id) REFERENCES users(id)
  )
`;
export const saleItemsSchema = `
  CREATE TABLE ${DatabaseTable.SaleItems} (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    sales_id INTEGER NOT NULL,
    item_id INTEGER NOT NULL,
    quantity INTEGER NOT NULL,
    price INTEGER NOT NULL,
    discount_percent INTEGER DEFAULT 0,
    discount_amount INTEGER DEFAULT 0,
    FOREIGN KEY(sales_id) REFERENCES sales(id),
    FOREIGN KEY(item_id) REFERENCES items(id)
  )
`;
export const saleTaxesSchema = `
  CREATE TABLE ${DatabaseTable.SaleTaxes} (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    sale_item_id INTEGER NOT NULL,
    tax_id INTEGER NOT NULL,
    FOREIGN KEY(sale_item_id) REFERENCES sale_items(id),
    FOREIGN KEY(tax_id) REFERENCES taxes(id)
  )
`;
export const tagsSchema = `
  CREATE TABLE ${DatabaseTable.Tags} (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL
  )
`;
export const refundsSchema = `
  CREATE TABLE ${DatabaseTable.Refunds} (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    sales_id INTEGER,
    user_id INTEGER,
    date TEXT NOT NULL,
    FOREIGN KEY(sales_id) REFERENCES sales(id),
    FOREIGN KEY(user_id) REFERENCES users(id)
  )
`;
export const refundItemsSchema = `
  CREATE TABLE ${DatabaseTable.RefundItems} (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    refund_id INTEGER,
    item_id INTEGER NOT NULL,
    quantity INTEGER NOT NULL,
    price INTEGER NOT NULL,
    FOREIGN KEY(refund_id) REFERENCES refunds(id),
    FOREIGN KEY(item_id) REFERENCES items(id)
  )
`;
export const refundTaxesSchema = `
  CREATE TABLE ${DatabaseTable.RefundTaxes} (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    refund_item_id INTEGER NOT NULL,
    tax_id INTEGER NOT NULL,
    FOREIGN KEY(refund_item_id) REFERENCES refund_items(id),
    FOREIGN KEY(tax_id) REFERENCES taxes(id)
  )
`;
