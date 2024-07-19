import Chip from "@mui/material/Chip";
import { FC } from "react";
import { filterProps } from "../types/componentsTypes/Filter";
import { handleFilterClick } from "../store/features/farmer/HomeSlice";
import { useAppDispatch } from "../store/store";
import { useNavigate } from "react-router-dom";
import { ThemeProvider } from "@emotion/react";
import theme from "../theme";

const Filter: FC<filterProps> = ({ filters }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  return (
    <ThemeProvider theme={theme}>
      <>
        {filters.map((filter) => {
          return (
            <div key={filter}>
              <Chip
                label={filter}
                variant="outlined"
                onClick={() =>
                  dispatch(handleFilterClick({ navigate, filter }))
                }
              />
            </div>
          );
        })}
      </>
    </ThemeProvider>
  );
};

export default Filter;
