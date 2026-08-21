//products

● Create a product.
url: /
method: post
request-body: json
Request-query-params: none
response-body: { 'message': 'done' , 'success': true , data : products }
response-header: content-type: application/json

● Retrieve all products.
url: /
method: get
request-body: non
Request-query-params: ?page=5&limit=0
response-body: { 'message': 'done' , 'success': true , data : products }
response-header:content-type: application/json

● Retrieve a product by ID.
url: /:id
method :get
request-body: non
Request-query-params: non
Path Parameter: :id
response-body: { 'message': 'done' , 'success': true , data : products }
response-header: content-type: application/json

● Update a product.
url: /:id
method :patch
request-body: data
Request-query-params: non
Path Parameter: :id
response-body: { 'message': 'done' , 'success': true , data : products }
response-header: content-type: application/json

● Delete a product.
url: /:id
method :Delete
request-body: non
Request-query-params: non
Path Parameter: :id
response-body: { 'message': 'done' , 'success': true , data : products }
response-header: content-type: application/json