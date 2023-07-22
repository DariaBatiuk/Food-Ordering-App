class Api {
  constructor({ url, headers }) {
    this.url = url
    this.headers = headers
  }

  getProducts = async () => {
    try {
      const response = await fetch(`${this.url}/api/products`, {
        method: 'GET',
        headers: this.headers
      })

      if (response.ok) {
        return await response.json()
      }

      throw response.json()
    } catch(err) {
      throw err
    }
  }

  getProductsByCategory = async () => {
    try {
      const response = await fetch(`${this.url}/api/products-by-categories`, {
        method: 'GET',
        headers: this.headers
      })

      if (response.ok) {
        return await response.json()
      }

      throw response.json()
    } catch(err) {
      throw err
    }
  }

  createUser = async (user) => {
    try {
      const response = await fetch(`${this.url}/api/create-user`, {
        method: 'POST',
        headers: this.headers,
        body: JSON.stringify(user)
      })

      if (response.ok) {
        return await response.json()
      }

      throw response.json()
    } catch(err) {
      throw err
    }
  }
}

export const api = (params = {}) => new Api({
  url: process.env.REACT_APP_API_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  ...params,
})
