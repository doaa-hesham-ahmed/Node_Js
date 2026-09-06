//products

● Create a product.
url: /
method: post
request-body: json
Request-query-params: none
response-body -> [success case (201)]: { 'message': 'done' , 'success': true , data : products }
response-body -> [success case (500)]: { 'message': error.message , 'success': false}
response-header: content-type: application/json

● Retrieve all products.
url: /
method: get
request-body: non
Request-query-params: ?page=2&limit=4
response-body -> [success case (200)]: { 'message': 'done' , 'success': true , data : products }
response-body -> [success case (500)]: { 'message': error.message , 'success': false}
response-header:content-type: application/json

● Retrieve a product by ID.
url: /:id
method :get
request-body: non
Request-query-params: id
response-body -> [success case (200)]: { 'message': 'done' , 'success': true , data : products }
response-body -> [success case (500)]: { 'message': error.message , 'success': false}
response-header: content-type: application/json

● Update a  product.
url: /:id
method :put
request-body: data
Request-query-params: id
response-body -> [success case (200)]: { 'message': 'done' , 'success': true , data : products }
response-body -> [success case (500)]: { 'message': error.message , 'success': false}
response-header: content-type: application/json

● Delete all product.
url: /
method :Delete
request-body: non
Request-query-params: non
response-body -> [success case (200)]: { 'message': 'done' , 'success': true , data : products }
response-body -> [success case (500)]: { 'message': error.message , 'success': false}
response-header: content-type: application/json

● Delete a product by id.
url: /:id
method :Delete
request-body: non
Request-query-params: non
Path Parameter: :id
response-body -> [success case (200)]: { 'message': 'done' , 'success': true , data : products }
response-body -> [success case (500)]: { 'message': error.message , 'success': false}
response-header: content-type: application/json


//=====================================================================================================

//suppliers
● Create a supplier.
url: /
method: post
request-body: json
Request-query-params: none
response-body -> [success case (201)]: { 'message': 'done' , 'success': true , data : suppliers }
response-body -> [success case (500)]: { 'message': error.message , 'success': false}
response-header: content-type: application/json


● Retrieve all suppliers.
url: /
method: get
request-body: non
Request-query-params: ?page=2&limit=4
response-body -> [success case (200)]: { 'message': 'done' , 'success': true , data : suppliers }
response-body -> [success case (500)]: { 'message': error.message , 'success': false}
response-header:content-type: application/json

● Retrieve by id suppliers.
url: /:id
method :get
request-body: non
Request-query-params: id
response-body -> [success case (200)]: { 'message': 'done' , 'success': true , data : suppliers }
response-body -> [success case (500)]: { 'message': error.message , 'success': false}
response-header: content-type: application/json


● Update supplier information.
url: /:id
method :put
request-body: data
Request-query-params: id
response-body -> [success case (200)]: { 'message': 'done' , 'success': true , data : suppliers }
response-body -> [success case (500)]: { 'message': error.message , 'success': false}
response-header: content-type: application/json

● Delete a supplier by id.
url: /:id
method :Delete
request-body: non
Request-query-params: non
Path Parameter: :id
response-body -> [success case (200)]: { 'message': 'done' , 'success': true , data : suppliers }
response-body -> [success case (500)]: { 'message': error.message , 'success': false}
response-header: content-type: application/json


● Delete All a supplier.
url: /
method :Delete
request-body: non
Request-query-params: non
response-body -> [success case (200)]: { 'message': 'done' , 'success': true , data : suppliers }
response-body -> [success case (500)]: { 'message': error.message , 'success': false}
response-header: content-type: application/json

//==================================================================================================

//sales
● Create a sales. or
● Record a sale.
url: /
method: post
request-body: json
Request-query-params: none
response-body -> [success case (201)]: { 'message': 'done' , 'success': true , data : sales }
response-body -> [success case (500)]: { 'message': error.message , 'success': false}
response-header: content-type: application/json


● Retrieve all sales.
url: /
method: get
request-body: non
Request-query-params: ?page=2&limit=4
response-body -> [success case (200)]: { 'message': 'done' , 'success': true , data : sales }
response-body -> [success case (500)]: { 'message': error.message , 'success': false}
response-header:content-type: application/json

● Retrieve by id sales.
url: /:id
method :get
request-body: non
Request-query-params: id
response-body -> [success case (200)]: { 'message': 'done' , 'success': true , data : sales }
response-body -> [success case (500)]: { 'message': error.message , 'success': false}
response-header: content-type: application/json


● Update sales information.
url: /:id
method :put
request-body: data
Request-query-params: id
response-body -> [success case (200)]: { 'message': 'done' , 'success': true , data : sales }
response-body -> [success case (500)]: { 'message': error.message , 'success': false}
response-header: content-type: application/json

● Delete a sales by id.
url: /:id
method :Delete
request-body: non
Request-query-params: non
Path Parameter: :id
response-body -> [success case (200)]: { 'message': 'done' , 'success': true , data : sales }
response-body -> [success case (500)]: { 'message': error.message , 'success': false}
response-header: content-type: application/json


● Delete All a sales.
url: /
method :Delete
request-body: non
Request-query-params: non
response-body -> [success case (200)]: { 'message': 'done' , 'success': true , data : sales }
response-body -> [success case (500)]: { 'message': error.message , 'success': false}
response-header: content-type: application/json