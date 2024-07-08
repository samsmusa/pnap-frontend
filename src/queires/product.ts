import {gql} from "@apollo/client";

export const ALL_PRODUCTS = gql`query {
    products {
        id
        title
        description
        published
        price
        rent
        categories {
            id
            name
        }
    }
}`
export const PRODUCT = (_id: number) => gql`query {
    product(id: ${_id}) {
        id
        title
        description
        published
        price
        rent
        categories {
            id
            name
        }
    }
}
`
export const CREATE_PRODUCT = gql`
    mutation AddProduct($title: String!, $description: String!, $price: Float, $rent: Float, $categoryIds: [ID!]!) {
        createProduct(
            title: $title,
            description: $description,
            price: $price,
            rent: $rent,
            categoryIds: $categoryIds
        ) {
            id
            title
        }
    }
`
export const UPDATE_PRODUCT = gql`
    mutation UpdateProduct(
        $id: ID!,
        $title: String!,
        $description: String,
        $published: DateTime!,
        $price: Float!,
        $rent: Float!
        $categoryIds: [ID!]
    ) {
        updateProduct(
            id: $id,
            title: $title,
            description: $description,
            published: $published,
            price: $price,
            rent: $rent,
            categoryIds: $categoryIds
        ) {
            id
            title
        }
    }
`;
export const DELETE_PRODUCT = gql`
    mutation DeleteProduct(
        $id: ID!
    ) {
        deleteProduct(id: $id) {
            id
            title
        }
    }
`;
export const USER_OWN_PRODUCTS = gql`query {
    userProducts {
        id
        title
        price
        rent
        description
        published
        categories {
            id
            name
        }
    }
}`

export const USER_RENTS = gql`query {
    userRents {
        id
        product {
            id
            title
        }
    }
}`
export const USER_BOUGHT = gql`query {
    boughtProducts {
        id
        quantity
        product {
            id
        title
        price
        rent
        description
        published
        categories {
            id
            name
        }
        }
    }
}`
export const USER_SOLD = gql`  query {
    soldProducts {
        id
        quantity
        product {
            id
            title
            price
            rent
            description
            published
            categories {
                id
                name
            }
        }
        user {
            id
            email
        }
    }
}
`
export const USER_BORROWED = gql`query {
    borrowedProducts {
        id
        quantity
        product {
            id
        title
        price
        rent
        description
        published
        categories {
            id
            name
        }
        }
        startDate
        endDate
    }
}
`
export const USER_LENT = gql`query {
    lentProducts {
        id
        quantity
        product {
            id
        title
        price
        rent
        description
        published
        categories {
            id
            name
        }
        }
        user {
            id
            email
        }
        startDate
        endDate
    }
}
`

export const CREATE_RENT_ITEM = gql`
  mutation CreateRentItem($userId: Int!, $productId: Int!, $quantity: Int!, $startDate: DateTime!, $endDate: DateTime!) {
    createRentItem(userId: $userId, productId: $productId, quantity: $quantity, startDate: $startDate, endDate: $endDate) {
      id
      quantity
      startDate
      endDate
      product {
        id
        title
        description
        price
        rent
      }
      user {
        id
        email
        name
      }
    }
  }
`;

export const DELETE_RENT_ITEM = gql`
  mutation DeleteRentItem($id: ID!) {
    deleteRentItem(id: $id) {
      id
    }
  }
`;