-- Enable necessary extensions
create extension if not exists "uuid-ossp";

-- Create enum types
create type order_status as enum ('New', 'Pending', 'Shipped', 'Delivered', 'Cancelled');
create type product_category as enum ('Seeds', 'Fertilizers', 'Equipment', 'Tools', 'Accessories', 'Irrigation', 'Pesticides', 'Others');

-- Create profiles table
create table profiles (
  id uuid references auth.users on delete cascade,
  email text unique,
  full_name text,
  phone_number text,
  business_name text,
  gst_number text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  primary key (id)
);

-- Create addresses table
create table addresses (
  id uuid default uuid_generate_v4() primary key,
  profile_id uuid references profiles(id) on delete cascade,
  address_line1 text not null,
  address_line2 text,
  city text not null,
  state text not null,
  postal_code text not null,
  is_default boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create products table
create table products (
  id uuid default uuid_generate_v4() primary key,
  seller_id uuid references profiles(id) on delete cascade,
  name text not null,
  description text,
  price decimal(10,2) not null,
  stock_quantity integer not null default 0,
  category product_category not null,
  image_url text,
  is_listed boolean default true,
  is_best_priced boolean default false,
  is_high_priced boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create orders table
create table orders (
  id uuid default uuid_generate_v4() primary key,
  order_number text unique not null,
  seller_id uuid references profiles(id) on delete cascade,
  customer_name text not null,
  customer_email text,
  customer_phone text,
  status order_status not null default 'New',
  total_amount decimal(10,2) not null,
  shipping_address_id uuid references addresses(id),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create order_items table
create table order_items (
  id uuid default uuid_generate_v4() primary key,
  order_id uuid references orders(id) on delete cascade,
  product_id uuid references products(id),
  quantity integer not null,
  unit_price decimal(10,2) not null,
  total_price decimal(10,2) not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create todos table
create table todos (
  id uuid default uuid_generate_v4() primary key,
  profile_id uuid references profiles(id) on delete cascade,
  title text not null,
  description text,
  is_completed boolean default false,
  due_date timestamp with time zone,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create seller_metrics table
create table seller_metrics (
  id uuid default uuid_generate_v4() primary key,
  profile_id uuid references profiles(id) on delete cascade,
  total_sales decimal(10,2) default 0,
  total_orders integer default 0,
  completed_orders integer default 0,
  pending_orders integer default 0,
  cancelled_orders integer default 0,
  average_rating decimal(3,2) default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create daily_sales table
create table daily_sales (
  id uuid default uuid_generate_v4() primary key,
  profile_id uuid references profiles(id) on delete cascade,
  date date not null,
  total_sales decimal(10,2) default 0,
  total_orders integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create notifications table
create table notifications (
  id uuid default uuid_generate_v4() primary key,
  profile_id uuid references profiles(id) on delete cascade,
  title text not null,
  message text not null,
  is_read boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create seller_tips table
create table seller_tips (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  content text not null,
  category text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create RLS policies

-- Profiles policies
alter table profiles enable row level security;

create policy "Users can view their own profile"
  on profiles for select
  using ( auth.uid() = id );

create policy "Users can update their own profile"
  on profiles for update
  using ( auth.uid() = id );

-- Products policies
alter table products enable row level security;

create policy "Sellers can view their own products"
  on products for select
  using ( auth.uid() = seller_id );

create policy "Sellers can insert their own products"
  on products for insert
  with check ( auth.uid() = seller_id );

create policy "Sellers can update their own products"
  on products for update
  using ( auth.uid() = seller_id );

create policy "Sellers can delete their own products"
  on products for delete
  using ( auth.uid() = seller_id );

-- Orders policies
alter table orders enable row level security;

create policy "Sellers can view their own orders"
  on orders for select
  using ( auth.uid() = seller_id );

create policy "Sellers can update their own orders"
  on orders for update
  using ( auth.uid() = seller_id );

-- Order items policies
alter table order_items enable row level security;

create policy "Sellers can view their order items"
  on order_items for select
  using ( 
    exists (
      select 1 from orders
      where orders.id = order_items.order_id
      and orders.seller_id = auth.uid()
    )
  );

-- Todos policies
alter table todos enable row level security;

create policy "Users can CRUD their own todos"
  on todos for all
  using ( auth.uid() = profile_id );

-- Seller metrics policies
alter table seller_metrics enable row level security;

create policy "Sellers can view their own metrics"
  on seller_metrics for select
  using ( auth.uid() = profile_id );

-- Daily sales policies
alter table daily_sales enable row level security;

create policy "Sellers can view their own daily sales"
  on daily_sales for select
  using ( auth.uid() = profile_id );

-- Notifications policies
alter table notifications enable row level security;

create policy "Users can view their own notifications"
  on notifications for select
  using ( auth.uid() = profile_id );

create policy "Users can update their own notifications"
  on notifications for update
  using ( auth.uid() = profile_id );

-- Seller tips policies
alter table seller_tips enable row level security;

create policy "Everyone can view seller tips"
  on seller_tips for select
  to authenticated
  using ( true );

-- Functions and Triggers

-- Function to update seller metrics
create or replace function update_seller_metrics()
returns trigger as $$
begin
  -- Update or insert seller metrics
  insert into seller_metrics (profile_id)
  values (NEW.seller_id)
  on conflict (profile_id) do nothing;

  -- Update metrics based on order status
  update seller_metrics
  set
    total_orders = (select count(*) from orders where seller_id = NEW.seller_id),
    completed_orders = (select count(*) from orders where seller_id = NEW.seller_id and status = 'Delivered'),
    pending_orders = (select count(*) from orders where seller_id = NEW.seller_id and status in ('New', 'Pending')),
    cancelled_orders = (select count(*) from orders where seller_id = NEW.seller_id and status = 'Cancelled'),
    total_sales = (select coalesce(sum(total_amount), 0) from orders where seller_id = NEW.seller_id and status = 'Delivered'),
    updated_at = now()
  where profile_id = NEW.seller_id;

  return NEW;
end;
$$ language plpgsql security definer;

-- Trigger for updating seller metrics
create trigger on_order_update
  after insert or update
  on orders
  for each row
  execute procedure update_seller_metrics();

-- Function to update daily sales
create or replace function update_daily_sales()
returns trigger as $$
begin
  -- Update or insert daily sales record
  insert into daily_sales (profile_id, date, total_sales, total_orders)
  values (
    NEW.seller_id,
    date_trunc('day', NEW.created_at),
    NEW.total_amount,
    1
  )
  on conflict (profile_id, date)
  do update set
    total_sales = daily_sales.total_sales + NEW.total_amount,
    total_orders = daily_sales.total_orders + 1;

  return NEW;
end;
$$ language plpgsql security definer;

-- Trigger for updating daily sales
create trigger on_order_create
  after insert
  on orders
  for each row
  execute procedure update_daily_sales();

-- Create profile on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email)
  values (new.id, new.email);
  return new;
end;
$$ language plpgsql security definer;

-- Trigger for creating profile on signup
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
