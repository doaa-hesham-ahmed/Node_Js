# DATABASE DESIGN
* User

  - name -> [string - required - minlength:3 - maxlength:20 - trim:true]
  - email ->  [string - required - unique:true - trim:true - lowercase:true]
  - password ->  [string - required(in case provider = 'local') - trim:true]
  - provider -> [string - ENUM['google','facebook','local (by default)']]
  - isDeleted -> [Boolean - default:false]
  - isVerify -> [Boolean - default:false]
  - gender -> [string - ENUM['female','male (by default)']]
  - dop -> [Data]
  - createdAt -> [Data]
  - updateAt -> [Data]

* Message
  - content -> [string - required - minlength:1 - maxlength:200 - trim:true]
  - receiver -> [objectId - required - ref:'User']
  - sender -> [objectId - ref:'User']
  - isDeleted -> [Boolean - default:false]
  - createdAt -> [Data]
  - updateAt ->  [Data]

* Otp
  - code -> [string - required - legth:6]
  - email -> [string - required - trim:true - lowercase:true]
  - expiredAt -> [Date , required - expires:0]
  - createdAt -> [Date]
  - attempts -> [number - bydefault:true]