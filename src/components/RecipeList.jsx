import { Container, Header, Grid } from "semantic-ui-react";
import RecipeListItem from "./RecipeListItem";
import { useState } from "react";
import "./style.css";

const RecipeList = ({ recipes, searchedQuery }) => {
  const [page, setPage] = useState(1);
  const len = recipes.length;
  const len2 = Math.ceil(len / 5);
  const selectPageHandler = (selectedPage) => {
    if (selectedPage >= 1 && selectedPage <= len2 && selectedPage !== page) {
      setPage(selectedPage);
    }
  };
  return (
    <Container>
      <Header
        size="huge"
        content={`RECIPE LIST FOR ${searchedQuery}`}
        textAlign="center"
      />
      <Grid columns={3} doubling>
        {recipes &&
          recipes.slice(page * 5 - 5, page * 5).map((recipe, index) => (
            <Grid.Column key={index}>
              <RecipeListItem recipe={recipe} />
            </Grid.Column>
          ))}
      </Grid>
      {len > 0 && (
        <div className="pagination">
          <span
            className={page > 1 ? "" : "pagination__disable"}
            onClick={() => selectPageHandler(page - 1)}
          >
            ◀
          </span>

          {[...Array(len2)].map((_, i) => {
            return (
              <span
                key={i}
                className={page === i + 1 ? "pagination__selected" : ""}
                onClick={() => selectPageHandler(i + 1)}
              >
                {i + 1}
              </span>
            );
          })}

          <span
            className={page < len2 ? "" : "pagination__disable"}
            onClick={() => selectPageHandler(page + 1)}
          >
            ▶
          </span>
        </div>
      )}
    </Container>
  );
};

export default RecipeList;
