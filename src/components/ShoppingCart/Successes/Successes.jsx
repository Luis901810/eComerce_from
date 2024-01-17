import { useEffect, useState } from 'react'
import { updatePurchaseTicket } from '../../../redux/actions'
import { useDispatch, useSelector } from 'react-redux'
import Reviews from '../../Review/Review'
import { API_URL } from '../../../redux/actions-type'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { showSuccessAlert } from '../../../alerts/alerts'
import { Box } from '@mui/system'
import {
  Button,
  Typography,
  Select,
  MenuItem,
  List,
  ListItem,
} from '@mui/material'

const ID_APPROVED = "0d5362bd-31dd-4f54-bab3-70cf33e28188" //! Descontar STOCK

const Successes = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [purchaseDetails, setPurchaseDetails] = useState(null)
  const [purchaseTicket, setPurchaseTicket] = useState(null)

  const updateStockArray = async ({ shoeId, updatedStock }) => {
    try {
      const response = await axios.put(`${API_URL}/shoe/${shoeId}`, {
        stock: updatedStock,
      })
      console.log(response.data)
      return response.data
    } catch (error) {
      console.error(`Error al actualizar el stock del zapato ${shoeId}:`, error)
      throw error
    }
  }

  const updateStock = async purchaseTicket => {
    try {
      const response = await axios.get(`${API_URL}/shoe`)
      const shoesArray = response.data //Traer Shoes
      //! Filtra shoesArray para buscar su id y el stock
      const updatedStockArray = purchaseTicket.lines.map(line => {
        const { shoeId, quantity } = line

        const shoe = shoesArray.find(shoe => shoe.id === shoeId) //! Busca los zapatos con los "shoeId"
        if (shoe) {
          const stock = shoe.stock - quantity
          return { shoeId: shoe.id, updatedStock: stock } //! Objetico con los datos para el la Actualización
        }
        return null //! Si no se encuentra ningún Zapato
      })
      const results = await Promise.all(updatedStockArray.map(updateStockArray))

      console.log('Resultados de la actualización de stock:', results)

      const filteredUpdatedStockArray = updatedStockArray.filter(Boolean)
      console.log(filteredUpdatedStockArray)
      return filteredUpdatedStockArray
    } catch (error) {
      console.error('Error al actualizar el stock:', error)
      throw error
    }
  }

  const handleUnload = () => {
    localStorage.setItem('PurchaseTicket', JSON.stringify(null))
    console.log('Limpieza de PurchaseTicket del LocalStorage')
  }

  useEffect(() => {
    //! Y AL USUARIO REGISTRARLE SU COMPRA COMO APROBADA Y NOTIFICAR

    //! Recuperar la cadena JSON del localStorage
    const jsonString = localStorage.getItem('PurchaseTicket')
    const PurchaseTicket = JSON.parse(jsonString)
    if(PurchaseTicket===null) return navigate('/')
    localStorage.setItem('shoppingCart', JSON.stringify([]));//! Vaciar localStorage
    
    setPurchaseTicket(PurchaseTicket)
    // Ahora puedes acceder a las propiedades del objeto
    console.log('Orden Completa del LocalHost:', PurchaseTicket)

    //! Y AL USUARIO REGISTRARLE SU COMPRA COMO APROBADA
    updatePurchaseTicket(PurchaseTicket.idOrder, ID_APPROVED) //!(idOrder, idStatusTicket) //Traer el IDORDER Storage

    //! Y AL USUARIO  ************NOTIFICARLE SU COMPRA***********

    const details = {
      totalAmount: PurchaseTicket.totalAmount,
      items: PurchaseTicket.lines.map(line => ({
        shoeId: line.shoeId,
        quantity: line.quantity,
        unitPrice: line.unitPrice,
      })),
    }
    setPurchaseDetails(details)

    if (PurchaseTicket) updateStock(PurchaseTicket)
    showSuccessAlert('ORDEN APROBADA :D')

    window.addEventListener('beforeunload', handleUnload)
    return () => {
      //! Borrar el Ticket del Local Storage
      window.removeEventListener('beforeunload', handleUnload)
    }
  }, [ID_APPROVED])

  const Shoes = useSelector(state => state.Shoes)
  const getNameShoeById = shoeId => {
    const foundShoe = Shoes.find(shoe => shoe.id === shoeId)

    if (foundShoe) {
      console.log('found SHOE', foundShoe)
      return foundShoe
    } else {
      // Si no se encuentra el zapato con el ID dado, puedes devolver un objeto con valores predeterminados o manejarlo según tus necesidades.
      return { name: 'Shoe Not Found', image: 'default-image-url' }
    }
  }

  const textStyle = {
    color: 'white',
    marginTop: 3,
  }

  const imgStyle = {
    width: '200px',
    marginTop: 7,
    marginBottom: 7,
    borderRadius: 3,
  }

  return (
    <Box sx={{ mt: 10 }}>
      <Typography style={textStyle} variant='h4'>
        Tu compra ha sido exitosa!
      </Typography>
      {/* //! Se pone esto porque la barra de navegacion no deja ver debajo */}

      {purchaseDetails && (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography sx={{ mb: 5 }} style={textStyle} variant='h5'>
            Precio total: ${purchaseDetails.totalAmount}
          </Typography>
          <Typography style={textStyle} variant='h4'>
            Detalles de los Artículos Comprados:
          </Typography>
          <Box
            sx={{
              mt: 3,
              backgroundColor: '#414141',
              display: 'flex',
              flexWrap: 'wrap',
              padding: 5,
              border: '2px solid #42e268',
              borderRadius: 3,
            }}
          >
            {purchaseDetails.items.map((item, index) => {
              const shoe = getNameShoeById(item.shoeId)
              return (
                <List key={index}>
                  {/* //!Buscar el nombre en el back*/}
                  <img
                    src={getNameShoeById(item.shoeId).image}
                    alt={getNameShoeById(item.shoeId).name}
                    style={imgStyle}
                  />
                  <Typography style={textStyle} variant='h5'>
                    {' '}
                    Zapato: {getNameShoeById(item.shoeId).name}
                  </Typography>
                  <Typography style={textStyle} variant='h6'>
                    Quantity: {item.quantity}
                  </Typography>
                  <Typography style={textStyle} variant='h6'>
                    Unit Price: ${item.unitPrice}
                  </Typography>
                </List>
              )
            })}
          </Box>
          <Reviews
            idOrder={purchaseTicket && purchaseTicket.idOrder}
            userId={purchaseTicket && purchaseTicket.userId}
          />
        </Box>
      )}
      <Box>
      <Button
        variant='contained'
        size='large'
        sx={{
          backgroundColor: '#42e268',
          '&:hover': {
            backgroundColor: '#00ff3d',
          },
        }}
        onClick={() => navigate('/Catalogue') }
      >
        Regresar al catalogo
      </Button>
      </Box>
    </Box>
  )
}

export default Successes
