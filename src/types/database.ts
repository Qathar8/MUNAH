export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      app_users: {
        Row: {
          id: string
          auth_uid: string | null
          email: string | null
          role: string | null
          created_at: string | null
        }
        Insert: {
          id?: string
          auth_uid?: string | null
          email?: string | null
          role?: string | null
          created_at?: string | null
        }
        Update: {
          id?: string
          auth_uid?: string | null
          email?: string | null
          role?: string | null
          created_at?: string | null
        }
      }
      brands: {
        Row: {
          id: string
          name: string
          description: string | null
          logo_url: string | null
          created_at: string | null
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          logo_url?: string | null
          created_at?: string | null
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          logo_url?: string | null
          created_at?: string | null
        }
      }
      categories: {
        Row: {
          id: string
          name: string
          description: string | null
          created_at: string | null
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          created_at?: string | null
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          created_at?: string | null
        }
      }
      products: {
        Row: {
          id: string
          name: string
          slug: string | null
          description: string | null
          key_ingredients: string | null
          price: number | null
          stock: number | null
          category_id: string | null
          brand_id: string | null
          featured: boolean | null
          image_url: string | null
          gallery: Json | null
          created_at: string | null
        }
        Insert: {
          id?: string
          name: string
          slug?: string | null
          description?: string | null
          key_ingredients?: string | null
          price?: number | null
          stock?: number | null
          category_id?: string | null
          brand_id?: string | null
          featured?: boolean | null
          image_url?: string | null
          gallery?: Json | null
          created_at?: string | null
        }
        Update: {
          id?: string
          name?: string
          slug?: string | null
          description?: string | null
          key_ingredients?: string | null
          price?: number | null
          stock?: number | null
          category_id?: string | null
          brand_id?: string | null
          featured?: boolean | null
          image_url?: string | null
          gallery?: Json | null
          created_at?: string | null
        }
      }
      orders: {
        Row: {
          id: string
          product_id: string | null
          customer_name: string | null
          phone: string | null
          quantity: number | null
          total_price: number | null
          status: string | null
          created_at: string | null
        }
        Insert: {
          id?: string
          product_id?: string | null
          customer_name?: string | null
          phone?: string | null
          quantity?: number | null
          total_price?: number | null
          status?: string | null
          created_at?: string | null
        }
        Update: {
          id?: string
          product_id?: string | null
          customer_name?: string | null
          phone?: string | null
          quantity?: number | null
          total_price?: number | null
          status?: string | null
          created_at?: string | null
        }
      }
    }
  }
}

export type Product = Database['public']['Tables']['products']['Row'];
export type Brand = Database['public']['Tables']['brands']['Row'];
export type Category = Database['public']['Tables']['categories']['Row'];
export type Order = Database['public']['Tables']['orders']['Row'];
export type AppUser = Database['public']['Tables']['app_users']['Row'];