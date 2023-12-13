product table
product_id (primary), product_name, product_cost

customer table
customer_id, customer_name, customer_address, customer_email (primary), customer_phone

order table
order_id (primary), order_date, order_cost, payment_status, customer_id

order_details table
order_id, product_id, quantity, price

routes

1. /add_order
   input: eg:
   {
   customer_email: "soemthing@something.com",
   customer_phone: "1234567890",
   customer_address: "some address",
   customer_name: "some name",
   products_ordered: [
   {
   product_id: 1,
   quantity: 2,
   cost: 100,
   },
   {
   product_id: 2,
   quantity: 1,
   cost: 200,
   }
   ]
   order_cost: 400,
   }
   output:
   {
   order_id: 1,
   order_cost: 400,
   payment_status: "pending",
   message: "success"
   }
   else:
   {
   message: "failure"
   }

2. /get_customers
   input:
   {
   password: something
   }
   output:
   [
   {
   customer_id: 1,
   customer_name: "some name",
   customer_address: "some address",
   customer_email: "some email",
   customer_phone: "some phone"
   },
   {
   customer_id: 2,
   customer_name: "some name",
   customer_address: "some address",
   customer_email: "some email",
   customer_phone: "some phone"
   },
   ]

3. /get_products
   input:
   {
   password: something
   }
   output
   [
   {
   product_id: 1,
   product_name: "some name",
   product_cost: 100,
   },
   {
   product_id: 2,
   product_name: "some name",
   product_cost: 200,
   },
   ]
4. /get_orders

   input:
   {
   password: something
   }

   output:
   [
   {
   order_id: 1,
   order_date: "some date",
   order_cost: 400,
   products: [product1, product2]
   payment_status: "pending",
   customer_id: 1,
   customer_name: "some name",
   customer_address: "some address",
   customer_email: "some email",
   customer_phone: "some phone"
   },
   {
   order_id: 2,
   order_date: "some date",
   order_cost: 400,
   products: [product1]
   payment_status: "pending",
   customer_id: 2,
   customer_name: "some name",
   customer_address: "some address",
   customer_email: "some email",
   customer_phone: "some phone"
   },
   ]

5. /change_payment_status
   input:
   {
   password: something,
   order_id: 1,
   payment_status: "paid"
   }
   output:
   {
   message: "success"
   }
   else:
   {
   message: "failure"
   }