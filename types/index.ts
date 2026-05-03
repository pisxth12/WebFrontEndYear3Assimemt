export interface Product {
    id: number;
    slug: string;
    name: string;
    price: number;
    sale_price: number | null;
    stock: number;
    description: string;
    image: string;
}

export interface ProductDetail {
    id: number;
    name: string;
    slug: string;
    price: string;
    sale_price: string;
    stock: number;
    description: string;
    image: string;
    category: {
        id: number;
        name: string;
        slug: string;
    };
    brand: {
        id: number;
        name: string;
        slug: string;
    };
}
export interface Category {
    id: number;
    name: string;
    slug: string;
}

export interface Banner {
    id: number;
    title: string;
    subtitle: string | null;
    image: string;
    button_text: string | null;
}

export interface CartItem {
    id: number;
    name: string;
    price: number;
    quantity: number;
    subtotal: number;
}

export interface CartResponse {
    cart: CartItem[];
    total: number;
    count: number;
}

export interface Order {
    id: number;
    order_number: string;
    total: number;
    status: string;
    created_at: string;
}

export interface Settings {
    site_name: string;
    phone: string;
    email: string;
    address: string;
    facebook: string;
    telegram: string;
    copyright: string;
    location: string;
}