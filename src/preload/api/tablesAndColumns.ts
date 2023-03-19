/* --------------------------------- Tables --------------------------------- */
export const USERS = 'users' as const;
export const CATEGORIES = 'categories' as const;
export const ITEMS = 'items' as const;
export const TAXES = 'taxes' as const;
export const SALES = 'sales' as const;
export const SALE_ITEMS = 'sale_items' as const;
export const SALE_TAXES = 'sale_taxes' as const;
export const TAGS = 'tags' as const;
export const REFUNDS = 'refunds' as const;
export const REFUND_ITEMS = 'refund_items' as const;
export const REFUND_TAXES = 'refund_taxes' as const;

export const TABLES = [
  USERS,
  CATEGORIES,
  ITEMS,
  TAXES,
  SALES,
  SALE_ITEMS,
  SALE_TAXES,
  TAGS,
  REFUNDS,
  REFUND_ITEMS,
  REFUND_TAXES
];

/* ------------------------------ Table columns ----------------------------- */
export const COLUMN = {
  [USERS]: {
    id: 'id' as const,
    username: 'username' as const,
    password: 'password' as const,
    language: 'language' as const,
    ui_size: 'text_size' as const,
    color_theme: 'color_theme' as const,
    is_archived: 'is_archived' as const,
    access_level: 'access_level' as const,
    last_login: 'last_login' as const
  },
  [CATEGORIES]: {
    id: 'id' as const,
    name: 'name' as const
  },
  [ITEMS]: {
    id: 'id' as const,
    category_id: 'category_id' as const,
    name: 'name' as const,
    price: 'price' as const,
    wholesale_price: 'wholesale_price' as const,
    is_archived: 'is_archived' as const
  },
  [TAXES]: {
    id: 'id' as const,
    name: 'name' as const,
    percent: 'percent' as const,
    is_archived: 'is_archived' as const
  },
  [SALES]: {
    id: 'id' as const,
    user_id: 'user_id' as const,
    date: 'date' as const,
    is_whole_sale: 'is_whole_sale' as const
  },
  [SALE_ITEMS]: {
    id: 'id' as const,
    sales_id: 'sales_id' as const,
    item_id: 'item_id' as const,
    quantity: 'quantity' as const,
    price: 'price' as const,
    discount_percent: 'discount_percent' as const,
    discount_amount: 'discount_amount' as const
  },
  [SALE_TAXES]: {
    id: 'id' as const,
    sale_item_id: 'sale_item_id' as const,
    tax_id: 'tax_id' as const
  },
  [TAGS]: {
    id: 'id' as const,
    name: 'name' as const
  },
  [REFUNDS]: {
    id: 'id' as const,
    sales_id: 'sales_id' as const,
    user_id: 'user_id' as const,
    date: 'date' as const
  },
  [REFUND_ITEMS]: {
    id: 'id' as const,
    refund_id: 'refund_id' as const,
    item_id: 'item_id' as const,
    quantity: 'quantity' as const,
    price: 'price' as const
  },
  [REFUND_TAXES]: {
    id: 'id' as const,
    refund_item_id: 'refund_item_id' as const,
    tax_id: 'tax_id' as const
  }
};
