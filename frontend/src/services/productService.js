import api from './api'

export const getProducts = ()=> api.get('/api/products/')
export const addProduct = (data)=> api.post('/api/products/', data)
