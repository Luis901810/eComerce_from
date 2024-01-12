import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import {
  FormControl,
  InputLabel,
  Input,
  Button,
  Select,
  MenuItem,
  IconButton,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import axios from 'axios'
import { API_URL } from '../../../utils/constants'
import PhotoUpload from '../../PhotoUpload/PhotoUpload'
import { Box } from '@mui/system'

function FormShoe() {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '0',
    image: '',
    stock: 0,
    discountPercentage: 0,
    size: '',
    color: '',
    brand: '',
    material: '',
    gender: '',
    categoryIds: [],
  })
  const [photo, setPhoto] = useState('')

  const brands = useSelector(state => state.brands)
  const categories = useSelector(state => state.categories)
  const colors = useSelector(state => state.colors)
  const genders = useSelector(state => state.genders)
  const materials = useSelector(state => state.materials)
  const sizes = useSelector(state => state.sizes)

  useEffect(() => {
    setFormData({
      ...formData,
      image: photo,
    })
  }, [photo])

  const handleInputChange = e => {
    const { name, value } = e.target

    // Si es el campo 'price', convierte el valor a un número decimal con dos decimales
    const formattedValue =
      name === 'price' ? parseFloat(value).toFixed(2) : value

    // Si es un campo de categoría, maneja la lógica de selección múltiple
    const updatedCategories =
      name === 'category' ? (Array.isArray(value) ? value : [value]) : undefined

    // Actualiza el estado con el nuevo valor
    setFormData({
      ...formData,
      [name]:
        updatedCategories !== undefined ? updatedCategories : formattedValue,
    })
  }

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      console.log(formData)

      const response = await axios.post(`${API_URL}/shoe/`, formData)

      window.alert(`Producto: ${formData.name} fue creado exitosamente`)
      // Restablecer el formulario
      setFormData({
        name: '',
        description: '',
        price: 0,
        image: '',
        stock: 0,
        discountPercentage: 0,
        size: '',
        color: '',
        brand: '',
        material: '',
        gender: '',
        categoryIds: [],
      })
    } catch (error) {
      console.error('Error creating shoe:', error)
    }
  }

  const formStyle = {
    marginTop: '100px',
    backgroundColor: '#414141',
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'column',
    width: '90vw',
    alignItems: 'center',
    marginLeft: '50px',
  }

  const textStyle = {
    color: '#fff',
    width: '300px',
  }

  const labelStyle = {
    color: '#fff',
  }

  const selectStyle = {
    width: '200px',
    backgroundColor: '#303030',
    border: '1px solid #42e268',
  }

  const boxStyle = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '10px',
    width: '80vw',
  }
  const boxStyle2 = {
    display: 'flex',
    flexDirection: 'column',
    width: '80vw',
  }

  const itemStyle = {
    backgroundColor: '#42e268',
    border: '1px solid #303030 ',
  }

  return (
    <form onSubmit={handleSubmit} style={formStyle}>
      <Box style={boxStyle}>
        <FormControl fullWidth margin='normal'>
          <InputLabel htmlFor='name' style={labelStyle}>
            Nombre:
          </InputLabel>
          <Input
            id='name'
            name='name'
            value={formData.name}
            style={textStyle}
            onChange={handleInputChange}
          />
        </FormControl>

        <FormControl fullWidth margin='normal'>
          <InputLabel htmlFor='description' style={labelStyle}>
            Descripción:
          </InputLabel>
          <Input
            id='description'
            name='description'
            value={formData.description}
            style={textStyle}
            onChange={handleInputChange}
          />
        </FormControl>

        <FormControl fullWidth margin='normal'>
          <InputLabel htmlFor='price' style={labelStyle}>
            Precio:
          </InputLabel>
          <Input
            id='price'
            name='price'
            type='number'
            value={formData.price}
            style={textStyle}
            onChange={handleInputChange}
          />
        </FormControl>
        <IconButton
          color='secondary'
          onClick={() => {
            navigate('/Admin')
          }}
        >
          <CloseIcon />
        </IconButton>
      </Box>
      <Box style={boxStyle}>
        <FormControl fullWidth margin='normal'>
          <PhotoUpload photo={photo} setPhoto={setPhoto} />
        </FormControl>

        <Box style={boxStyle2}>
          <FormControl fullWidth margin='normal' sx={{ marginBottom: 10 }}>
            <InputLabel htmlFor='stock' style={labelStyle}>
              Stock:
            </InputLabel>
            <Input
              id='stock'
              name='stock'
              type='number'
              value={formData.stock}
              style={textStyle}
              onChange={handleInputChange}
            />
          </FormControl>

          <FormControl fullWidth margin='normal'>
            <InputLabel htmlFor='discountPercentage' style={labelStyle}>
              Porcentaje de Descuento:
            </InputLabel>
            <Input
              id='discountPercentage'
              name='discountPercentage'
              type='number'
              value={formData.discountPercentage}
              style={textStyle}
              onChange={handleInputChange}
            />
          </FormControl>
        </Box>
      </Box>
      <Box style={boxStyle}>
        <FormControl fullWidth margin='normal'>
          <InputLabel htmlFor='size' style={labelStyle}>
            Tamaño:
          </InputLabel>
          <Select
            id='size'
            name='size'
            value={formData.size}
            style={selectStyle}
            onChange={handleInputChange}
          >
            {sizes.map(size => (
              <MenuItem key={size.id} value={size.id} style={itemStyle}>
                {size.size}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth margin='normal'>
          <InputLabel htmlFor='color' style={labelStyle}>
            Color:
          </InputLabel>
          <Select
            id='color'
            name='color'
            value={formData.color}
            style={selectStyle}
            onChange={handleInputChange}
          >
            {colors.map(color => (
              <MenuItem key={color.id} value={color.id} style={itemStyle}>
                {color.color}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth margin='normal'>
          <InputLabel htmlFor='brand' style={labelStyle}>
            Marca:
          </InputLabel>
          <Select
            id='brand'
            name='brand'
            value={formData.brand}
            style={selectStyle}
            onChange={handleInputChange}
          >
            {brands.map(brand => (
              <MenuItem key={brand.id} value={brand.id} style={itemStyle}>
                {brand.brand}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <Box style={boxStyle}>
        <FormControl fullWidth margin='normal'>
          <InputLabel htmlFor='material' style={labelStyle}>
            Material:
          </InputLabel>
          <Select
            id='material'
            name='material'
            value={formData.material}
            style={selectStyle}
            onChange={handleInputChange}
          >
            {materials.map(material => (
              <MenuItem key={material.id} value={material.id} style={itemStyle}>
                {material.material}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth margin='normal'>
          <InputLabel htmlFor='gender' style={labelStyle}>
            Genero:
          </InputLabel>
          <Select
            id='gender'
            name='gender'
            value={formData.gender}
            style={selectStyle}
            onChange={handleInputChange}
          >
            {genders.map(gender => (
              <MenuItem key={gender.id} value={gender.id} style={itemStyle}>
                {gender.gender}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth margin='normal'>
          <InputLabel htmlFor='categoryIds' style={labelStyle}>
            Category:
          </InputLabel>
          <Select
            id='categoryIds'
            name='categoryIds'
            multiple
            value={formData.categoryIds}
            style={selectStyle}
            onChange={handleInputChange}
          >
            {categories.map(category => (
              <MenuItem key={category.id} value={category.id} style={itemStyle}>
                {category.category}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <Button
        sx={{ backgroundColor: '#42e268', marginTop: 5, marginRight: 15 }}
        variant='contained'
        color='primary'
        type='submit'
      >
        Crear
      </Button>
    </form>
  )
}

export default FormShoe
