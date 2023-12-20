import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ThemeProvider } from "@mui/material";
import Loading from "../../components/Loading/loading";
import ShoeList from "./ShoeList";
import theme from "../../theme";
import { filter } from "../../redux/actions";
import { Box } from "@mui/material";
import Filters from "./Filters";

function Catalogue() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [noProducts, setNoProducts] = useState(false);

  const dispatch = useDispatch();
  const shoes = useSelector((state) => state.Shoes);

  useEffect(() => {
    if (shoes.length) {
      setProducts(shoes);
      setLoading(false);
    }
  }, [shoes]);

  useEffect(() => {
    if (!shoes.length) {
      dispatch(filter({}));
    }
  }, []);

  return (
    <ThemeProvider theme={theme}>
      {noProducts && !loading ? <h1>Productos no encontrados</h1> : null}
      {loading ? (
        <Loading loading={loading} />
      ) : (
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            marginTop: 10,
            padding: 2,
          }}
        >
          <Box>
            <Filters />
          </Box>
          <ShoeList products={products} />
        </Box>
      )}
    </ThemeProvider>
  );
}

export default Catalogue;
