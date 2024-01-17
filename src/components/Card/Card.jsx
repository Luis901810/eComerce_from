import React from 'react'
import { Card, Box, CardMedia, Typography } from '@mui/material'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined'
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart'
import IconButton from '@mui/material/IconButton'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { addToShoppingCart } from '../../redux/actions'
import { showErrorAlert, showSuccessAlert } from '../../alerts/alerts'

const CardShoe = ({ product }) => {
  const { stock } = product
  console.log(stock)
  const cardShoeStyle = {
    backgroundColor: 'transparent',
    boxShadow: 'none',
    border: 'none',
    transition: 'box-shadow 0.3s, border 0.3s',
    borderRadius: '50',
    width: '140',
  }
  const dispatch = useDispatch()

  const genders = useSelector(state => state.genders)
  const colors = useSelector(state => state.colors)
  const sizes = useSelector(state => state.sizes)
  const shoes = useSelector(state => state.Shoes)

  const gender = genders.find(item => item.id === product.genderId)
  const color = colors.find(item => item.id === product.colorId)
  const size = sizes.find(item => item.id === product.sizeId)

  const addToCart = idProducto => {
    const selectedShoe = shoes.find(shoe => shoe.id === idProducto)
    dispatch(addToShoppingCart(selectedShoe))
    console.log('Agregado :', selectedShoe.name)
    showSuccessAlert(`Producto ${selectedShoe.name} agregado al carrito`)
  }
  const defaultImage =
    'https://www.dtlr.com/cdn/shop/articles/DZ5485-400-A_905x.jpg?v=1689610057'
  return (
    <Box
      sx={{
        backgroundColor: '#414141',
        padding: 2,
        width: 200,
        height: 350,
        border: '1px solid #42e268',
        borderRadius: 5,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        '&:hover': {
          backgroundColor: '#303030',
          border: '2px solid #42e268',
        },
      }}
    >
      <Link to={`/detail/${product.id}`} style={{ textDecoration: 'none' }}>
        <Card style={cardShoeStyle}>
          <CardMedia
            component='img'
            height='140'
            width='140'
            image={product.image || defaultImage} //!Para que muestre las fotos
            alt={product.name}
          />

          <Typography
            variant={product.name.length < 20 ? 'h5' : 'h7'}
            sx={{ color: '#42e268', textAlign: 'center' }}
          >
            {product.name}
          </Typography>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <Typography
              sx={{
                color: '#fff',
                textAlign: 'center',
                padding: 2,
              }}
            >
              {gender.gender}
            </Typography>
            <Typography
              sx={{
                color: '#fff',
                textAlign: 'center',
                padding: 2,
              }}
            >
              {color.color}
            </Typography>
          </Box>
        </Card>
      </Link>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          marginTop: 'auto',
        }}
      >
        <Typography variant='h4' sx={{ color: '#42e268', textAlign: 'center' }}>
          ${product.price}
        </Typography>

        <IconButton
          aria-label='cart'
          onClick={() =>
            stock === 0
              ? showErrorAlert('No hay stock disponible')
              : addToCart(product.id)
          }
        >
          {stock === 0 ? (
            <RemoveShoppingCartIcon sx={{ color: 'red' }} />
          ) : (
            <ShoppingCartOutlinedIcon
              sx={{
                color: 'white',
                '&:hover': {
                  color: '#42e268',
                },
              }}
            />
          )}
        </IconButton>
      </Box>
    </Box>
  )
}

export default CardShoe
