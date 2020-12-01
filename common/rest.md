# Resources

## Product

Description: General product defintion

Fields:

- name
- description
- characteristics
- images
- category (FK)
- options (FK)
- brand (FK)

## Option category (not now)

Description: Group of related option types

Fields:

- name
- options-types (FK)

## Option group

Description: Group of related options (e.g. color)

Fields:

- name
- options (FK)

## Option

Description: Option type value (e.g. color - red)

Fields:

- name
- group (FK)

## User

Description: Buyer

Fields:

- name
- email
- password
- phone
- avatar
- is-verified (not now)
- address (not now)

## Brand

Description: Product's manufacturer brand

Fields:

- name
- logo

## Category

Description: Products category

Fields:

- name
- icon
- parent (FK)
- option-groups (FK)
- brands (FK)

## Order

Fields:

- user (FK)
- contact-name
- contact-phone
- shipment-address
- payment-type
- comment
- items (FK)

## Order item

Fields:

- offer (FK)
- quantity

## Question (not now)

Description: Question about a product

Fields:

- product
- body
- me

## Answer (not now)

Description: Answer to specific product's question

Fields:

- question
- seller
- body

## Review

Description: Product's review

Fields:

- offer
- user
- rating
- body

## Seller

Description: Company that sells products

Fields:

- name
- description
- logo
- phone
- email
- rating

## Offers

Description: Available products in a company with specific options

Fields:

- product (FK)
- options (FK)
- seller (FK)
- quantity
- price

API ichida options yo'q <br>
http://mplace.zetsoft.uz/rest/shop-catalog/index?select=id,title,price,amount,user_company_id

