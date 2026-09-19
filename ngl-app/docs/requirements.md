# NGL [anonymous-messaging-app]
* send anonymous Message or public message
* view a profile with related with message
* hnadle mongoose messages

- tech stack:
  - express
  - javaScript
  - mongodb/mongoose
  - redis [caching]
  - jwt [authentaction]
  - bcrypt [password hash]
  - nodemialer [email]
  - oauth2 [Google]
  - validation [Zad,Joi,Yup,class-validator]

- Features:
  - Authentaction Flow:
    - register
    - verifying email using otp
    - login
    - reset password
    - send otp
    - login with google
    - logout

  - Messages Flow:
    - send messge
    - view message
    - delet message [soft Dlet - archive]

  - User Flow[me]:
    - view profile [me]
    - Edit profile [me]
    - delete profile [me]

  - gurads:
    - authentication [tocken]