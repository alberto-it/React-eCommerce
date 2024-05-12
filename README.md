# Mini Project: React E-commerce Web Application

This is a front-end of an e-commerce application making API calls to my e-commerce Flask ORM API (see https://github.com/alberto-it/E-commerce-API)

The code consists of several React components that manage an e-commerce application.
Here is a breakdown of the functionalities:

### Components:

* <b>Home & NavBar:</b> These components handle the application's main layout and navigation between different sections (Customers, Products, Orders).
* <b>CreateCustomer:</b> This component allows users to create new customers by taking their name, email, and phone number as input. It uses a modal and form to capture this information and sends it to the server using axios.post.
* <b>CustomerList:</b> This component displays a list of all customers retrieved from the server using axios.get. It also provides a button to open the CreateCustomer modal.
* <b>CustomerDetails:</b> This component displays details of a specific customer retrieved based on the customerId from the URL using useParams. It allows editing customer information and deleting the customer.
* <b>UpdateCustomer:</b> This component is used within CustomerDetails when editing a customer. It pre-fills the form with existing data and sends the updated information to the server using axios.put.
* <b>CreateProduct:</b> Similar to CreateCustomer, this component handles creating a new product.
* <b>ProductList:</b> This component display a list of products retrieved from the server. It allows navigation to the product details page.
* <b>ProductDetails:</b> This component displays details of a specific product retrieved based on the productId from the URL using useParams. It includes functionalities like editing or deleting.
* <b>ProductSelection & CustomerSelection:</b> These components are used within CreateOrder to allow users to select a customer and product for the new order. They fetch product and customer data from the server and provide a dropdown for selection.
* <b>CreateOrder:</b> This componenet uses the two Selection components directly above to create a new order.
* <b>OrdersList:</b> This components displays a list of orders retrieved from the server. It allows navigation to the order details page.
* <b>OrderDetails:</b> This components displays details of a specific order retrieved based on the orderId from the URL using useParams.

### Overall Functionality:

The application allows managing an e-commerce store with features to:

* Create new customers, products, and orders.
* View a list of customers, products, and orders.
* View details of a specific customer, product, or order.
* Edit customer and product information.
* Delete customers and products.

### Additional Notes:

* The code utilizes libraries like react-bootstrap for UI components, react-router-dom for routing, and axios for making API calls.
* Error handling and user feedback are implemented using toast.
