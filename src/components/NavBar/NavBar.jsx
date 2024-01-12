import { useNavigate } from 'react-router-dom'
import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Menu from '@mui/material/Menu'
import MenuIcon from '@mui/icons-material/Menu'
import Avatar from '@mui/material/Avatar'
import Tooltip from '@mui/material/Tooltip'
import MenuItem from '@mui/material/MenuItem'
import AdbIcon from '@mui/icons-material/Adb'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined'
import Search from './Search'
import Pages from './Pages'
import { Link } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setCurrentUser } from '../../redux/actions'
import { cleanUserData } from '../../redux/actions'
import { useDispatch } from 'react-redux'
import logo from './digishoeslogo.png'

// const settings = ['Profile', 'Account', 'Dashboard', 'Logout']

const NavBar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null)
  const [anchorElUser, setAnchorElUser] = React.useState(null)
  const [error, setError] = useState('')
  const { user, logout, loading } = useAuth()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleOpenNavMenu = event => {
    setAnchorElNav(event.currentTarget)
  }
  const handleOpenUserMenu = event => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  const handleLogout = async () => {
    try {
      dispatch(cleanUserData())
      await logout()
      dispatch(setCurrentUser({
        roleId: 'fc7dd551-c681-488d-9d17-955cad4c16a5'
      }))
      navigate('/')
    } catch (error) {
      setError(error.message)
    }
  }

  if (loading) {
    return <h1>Cerrando seccion....</h1>
  }

  const logoStyle={
    width: '80px',
    height: '50px'
  }

  return (
    <>
      {error && <p>{error}</p>}

      <AppBar
        position='fixed'
        color='primary'
        sx={{
          width: '100%',
          marginTop: '10px',
          backgroundColor: '#414141',
        }}
      >
        <Toolbar disableGutters sx={{ paddingLeft: 2, paddingRight: 2 }}>
          <img src={logo} style={logoStyle} />
          <Typography
            variant='h6'
            noWrap
            component='a'
            href='/'
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: '#42e268',
              textDecoration: 'none',
            }}
          >
            DIGISHOES
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size='large'
              aria-label='account of current user'
              aria-controls='menu-appbar'
              aria-haspopup='true'
              onClick={handleOpenNavMenu}
              color='inherit'
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id='menu-appbar'
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              <Pages />
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant='h5'
            noWrap
            component='a'
            href='/'
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            DIGISHOES
          </Typography>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: 'none', md: 'flex' },
              justifyContent: 'space-evenly',
            }}
          >
            <Pages />
            <Search />
            <IconButton aria-label='cart' onClick={() => navigate('/ShoppingCart')} >
              <ShoppingCartOutlinedIcon sx={{ color: 'white' }} />
            </IconButton>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title='Open settings'>
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                {user ? (
                  <Avatar alt='User Avatar' src={user.photoURL} />
                ) : (
                  <Avatar alt='Remy Sharp' src='https://lippianfamilydentistry.net/wp-content/uploads/2015/11/user-default-300x300.png' />
                )}
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id='menu-appbar'
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {user ? (
                <>
                  <MenuItem onClick={() => navigate(`/UserProfile/${user.email}`)}>
                    <Typography textAlign='center'>Perfil</Typography>
                  </MenuItem>
                  <MenuItem key='logout' onClick={handleLogout}>
                    <Typography textAlign='center'>Cerrar Sesión</Typography>
                  </MenuItem>
                </>
              ) : (
                <MenuItem onClick={() => navigate('/Login')}>
                  <Typography textAlign='center'>Iniciar Sesión</Typography>
                </MenuItem>
              )}
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
    </>
  )

  //  return (
  //     <div>
  //       <img src ={require('./Logo Temporal.jpg')} alt='Logo Temporal' style={{ width: '25px', height: '25px', borderRadius: 15}}  />
  //       <h3>SearchBar</h3>
  //       <Link to="/Catalogue"> <button>| Catalogo |</button> </Link>
  //       <Link to="/ShoppingCart"> <button>| Carrito |</button> </Link>

  //       {/* //! Al dar click en el siguiente botón,
  //       * si es usuario: poder modificar el usuario
  //       * si es Admin: ingrsar a la dash board */}

  //       <button>| Rol: Cliente / Admind |</button>
  //       {/* //! Nombre del usuario */}
  //        <button>| Nombre de Usuario |</button>
  //       <Link to="/Login"> <button>| Login |</button> </Link>

  //     </div>
  //   );
}
export default NavBar
