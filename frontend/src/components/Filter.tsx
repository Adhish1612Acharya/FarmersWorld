import Chip from "@mui/material/Chip";
import { FC } from "react";
import { filterProps } from "../types/componentsTypes/Filter";
import { handleFilterClick } from "../store/features/farmer/HomeSlice";
import { useAppDispatch, useAppSelector } from "../store/store";
import { useNavigate } from "react-router-dom";
import { ThemeProvider } from "@emotion/react";
import theme from "../theme";
import { Avatar } from "@mui/material";

const Filter: FC<filterProps> = ({ filters }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  let filterClicked = useAppSelector((state) => state.home.clickedFilter);
  let filterIdentifier = useAppSelector((state) => state.home.filterIdentifier);

  return (
    <ThemeProvider theme={theme}>
      <>
        {filters.map((filter) => {
          return (
            <div key={filter}>
              {filterClicked && filterIdentifier === filter ? (
                <Chip
                  variant="outlined"
                  color="primary"
                  avatar={<Avatar>S</Avatar>}
                  label={filter}
                />
              ) : (
                <Chip
                  label={filter}
                  variant="outlined"
                  onClick={() =>
                    dispatch(handleFilterClick({ navigate, filter }))
                  }
                />
              )}
            </div>
          );
        })}
      </>
    </ThemeProvider>
  );
};

export default Filter;
