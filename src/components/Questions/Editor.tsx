import React, { useState, useMemo } from "react";
import { useRouteMatch, Switch, Route } from "react-router";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";

import { useTypedSelector } from "../../reducers";
import QuestionListElement from "../common/QuestionListElement/QuestionListElement";
import StyledDiv from "./EditorStyle";
import Button from "../common/Button/Button";
import SearchBar from "../common/SearchBar/SearchBar";
import EditQuestion from "./EditQuestion";

// Optimize it
const Editor: React.FC = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const pageLength = 10;
  let pageCount = 1;
  const questions = useTypedSelector(({ questions }) => {
    const newQuestions = questions
      .filter(
        ({ question }) =>
          question.toLowerCase().indexOf(search.toLowerCase()) >= 0
      )
      .sort((a, b) =>
        a.question.toLowerCase() < b.question.toLowerCase() ? -1 : 1
      );
    pageCount = Math.ceil(newQuestions.length / pageLength)
    const firstElementIdx = (page - 1) * pageLength;
    let lastElementIdx = (page - 1) * pageLength + pageLength;
    lastElementIdx =
      lastElementIdx <= newQuestions.length
        ? lastElementIdx
        : newQuestions.length;
    return newQuestions.slice(firstElementIdx, lastElementIdx);
  });
  const match = useRouteMatch();

  const updateSearch = (text: string) => {
    setSearch(() => text);
  };

  const handlePageChange = ({ selected }: { selected: number }) => {
    setPage(() => selected + 1);
  };

  return (
    <Switch>
      <Route path={`${match.path}/addQuestion`}>
        <EditQuestion />
      </Route>
      <Route path={`${match.path}/:questionId`}>
        <EditQuestion />
      </Route>
      <Route path={match.path}>
        <StyledDiv>
          <SearchBar
            value={search}
            onChange={(e) => updateSearch(e.target.value)}
          />
          <Link to={`${match.url}/addQuestion`}>
            <Button
              backgroundIcon="add"
              width="17.5rem"
              height="9.6rem"
              backgroundIconSize="7rem"
            >
              Add New Question
            </Button>
          </Link>
          {questions.map(({ question, id }) => (
            <Link className="questionLink" key={id} to={`${match.url}/${id}`}>
              <QuestionListElement>{question}</QuestionListElement>
            </Link>
          ))}
          <ReactPaginate
            pageCount={pageCount}
            pageRangeDisplayed={pageLength}
            marginPagesDisplayed={2}
            onPageChange={handlePageChange}
            containerClassName="paginationContainer"
            pageLinkClassName="paginationLink"
            previousClassName="paginationMove"
            nextClassName="paginationMove"
            previousLabel={<i className="material-icons">keyboard_arrow_left</i>}
            nextLabel={<i className="material-icons">keyboard_arrow_right</i>}
          />
        </StyledDiv>
      </Route>
    </Switch>
  );
};

export default Editor;
