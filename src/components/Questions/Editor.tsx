import React, { useState, useMemo, useRef, useEffect } from "react";
import { useRouteMatch, Switch, Route } from "react-router";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";

import { useTypedSelector } from "../../reducers";
import QuestionListElement from "../common/QuestionListElement/QuestionListElement";
import StyledEditor from "./EditorStyle";
import Button from "../common/Button/Button";
import SearchBar from "../common/SearchBar/SearchBar";
import EditQuestion from "./EditQuestion";

const Editor: React.FC = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const pageLength = 10;
  let pageCount = useRef(1);
  const questions = useTypedSelector(({ questions }) => questions);
  const questionsAfterSearch = useMemo(
    () =>
      questions
        .filter(
          ({ question }) =>
            question.toLowerCase().indexOf(search.toLowerCase()) >= 0
        )
        .sort((a, b) =>
          a.question.toLowerCase() < b.question.toLowerCase() ? -1 : 1
        ),
    [questions, search]
  );
  const questionsToDisplay = useMemo(() => {
    pageCount.current = Math.ceil(questionsAfterSearch.length / pageLength);

    const firstElementIdx = (page - 1) * pageLength;
    let lastElementIdx = (page - 1) * pageLength + pageLength;
    lastElementIdx =
      lastElementIdx <= questionsAfterSearch.length
        ? lastElementIdx
        : questionsAfterSearch.length;

    return questionsAfterSearch.slice(firstElementIdx, lastElementIdx);
  }, [questionsAfterSearch, page]);
  const match = useRouteMatch();

  const updateSearch = (text: string) => {
    setSearch(() => text);
  };

  const handlePageChange = ({ selected }: { selected: number }) => {
    setPage(() => selected + 1);
  };

  useEffect(() => {
    const lastPage = Math.ceil(questionsAfterSearch.length / pageLength);
    if (page > lastPage && lastPage > 0) {
      setPage(() => lastPage || 1);
    }
  }, [questionsAfterSearch, page]);

  return (
    <Switch>
      <Route path={`${match.path}/addQuestion`}>
        <EditQuestion />
      </Route>
      <Route path={`${match.path}/:questionId`}>
        <EditQuestion />
      </Route>
      <Route path={match.path}>
        <StyledEditor>
          <SearchBar
            value={search}
            onChange={(e) => updateSearch(e.target.value)}
          />
          <Link to={`${match.url}/addQuestion`} tabIndex={-1}>
            <Button
              backgroundIcon="add"
              width="17.5rem"
              height="9.6rem"
              backgroundIconSize="7rem"
            >
              Add New Question
            </Button>
          </Link>
          {questionsToDisplay.map(({ question, id }) => (
            <Link
              className="questionLink"
              key={id}
              to={`${match.url}/${id}`}
              tabIndex={-1}
            >
              <QuestionListElement>{question}</QuestionListElement>
            </Link>
          ))}
          <p>
            {questionsAfterSearch.length > 0 ? (page - 1) * pageLength + 1 : 0} -{" "}
            {(page - 1) * pageLength + pageLength <=
            questionsAfterSearch.length - 1
              ? (page - 1) * pageLength + pageLength + 1
              : questionsAfterSearch.length}{" "}
            / {questionsAfterSearch.length} questions
          </p>
          <ReactPaginate
            pageCount={pageCount.current}
            pageRangeDisplayed={pageLength}
            marginPagesDisplayed={2}
            onPageChange={handlePageChange}
            forcePage={page - 1}
            containerClassName="paginationContainer"
            pageLinkClassName="paginationLink"
            previousClassName="paginationMove"
            nextClassName="paginationMove"
            previousLabel={
              <i className="material-icons">keyboard_arrow_left</i>
            }
            nextLabel={<i className="material-icons">keyboard_arrow_right</i>}
          />
        </StyledEditor>
      </Route>
    </Switch>
  );
};

export default Editor;
