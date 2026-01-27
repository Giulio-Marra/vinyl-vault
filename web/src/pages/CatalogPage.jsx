import React, { useEffect, useState } from "react";
import { Badge, Col, Dropdown, Form, Row } from "react-bootstrap";
import { IoIosArrowDropdown, IoIosArrowDropleft } from "react-icons/io";
import VinylCard from "../features/vinyl/components/vinylCard";
import { useSearchParams, useNavigate } from "react-router";
import { Slider } from "@mui/material";
import {
  getAllGenres,
  getVinylsByQuery,
} from "../features/vinyl/services/apiVinylService";
import { ScaleLoader } from "react-spinners";

const CatalogPage = () => {
  const navigate = useNavigate();
  const [genres, setGenres] = useState([{ id: 121, name: "All" }]);
  const [modalGenre, setModalGenre] = useState(true);
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [valuePrice, setValuePrice] = useState([0, 1000]);
  const [order, setOrder] = useState("ASC");
  const [page, setPage] = useState(0);
  const [inStock, setInStock] = useState("All Records");
  const [hasMore, setHasMore] = useState(true);
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search") || "";
  const [vinylList, setVinylList] = useState([]);
  const [totalVinyls, setTotalVinyls] = useState(0);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchVinyls = async (pageNum = 0) => {
    setIsLoading(true);
    try {
      const data = await getVinylsByQuery({
        query: searchQuery,
        minPrice: valuePrice[0],
        maxPrice: valuePrice[1],
        inStock: inStock === "In Stock" ? true : undefined,
        genre: selectedGenre !== "All" ? selectedGenre : undefined,
        page: pageNum,
        size: 8,
        sortByPrice: order.toLowerCase(),
      });

      if (pageNum === 0) {
        setVinylList(data.content);
      } else {
        setVinylList((prevList) => [...prevList, ...data.content]);
      }

      setTotalVinyls(data.totalElements);
      setHasMore(data.last);
    } catch (err) {
      if (!err.status) {
        navigate("/error", {
          state: {
            statusCode: "Connection Error",
            message: "Cannot reach server. Please check your connection.",
          },
        });
      } else if (err.status >= 500) {
        navigate("/error", {
          state: {
            statusCode: err.status,
            message: "Server error. Please try again later.",
          },
        });
      } else {
        setError(err.message || "Failed to load records");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const fetchGenres = async () => {
    try {
      const data = await getAllGenres();
      setGenres([{ id: 121, name: "All" }, ...data]);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    setPage(0);
    fetchVinyls(0);
    fetchGenres();
  }, [searchQuery, valuePrice, inStock, order, selectedGenre]);

  useEffect(() => {
    if (page > 0) {
      fetchVinyls(page);
    }
  }, [page]);

  console.log(genres);

  const loadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handleChangePriceValue = (e, newValue = []) => {
    setValuePrice(newValue);
  };
  function valuetext(valuePrice) {
    return `${valuePrice}`;
  }

  return (
    <>
      <div className="heroSection d-flex flex-column justify-content-center align-items-center text-center mt-4 heroSectionCatalog">
        <h1 style={{ fontSize: "3rem", fontWeight: "bold" }}>
          Discover Vinyl Collections
        </h1>
        <p style={{ fontSize: "1.2rem", marginTop: "1rem" }}>
          Find the perfect record for your collection
        </p>
      </div>

      <div className="catalogPageContainer">
        <Row>
          <Col md={2} className="filterCatalogContainer">
            <div className="d-flex flex-column gap-2 pb-4 border-bottom border-secondary">
              <h5>Browse by</h5>
              <button className="btnFilterCatalogActive">All Records</button>
              <button className="btnFilterCatalog">New Arrivals</button>
              <button className="btnFilterCatalog">Sales</button>
            </div>
            <div className="d-flex flex-column border-bottom border-secondary py-4">
              <div className="d-flex align-items-center justify-content-between">
                <h5>Genre</h5>
                {modalGenre ? (
                  <IoIosArrowDropdown
                    className="drpDwnIcon"
                    onClick={() => setModalGenre((prev) => !prev)}
                  />
                ) : (
                  <IoIosArrowDropleft
                    className="drpDwnIcon"
                    onClick={() => setModalGenre((prev) => !prev)}
                  />
                )}
              </div>
              {modalGenre && (
                <div className="menuItem d-flex flex-column">
                  {genres.map((genre) => (
                    <Form.Check
                      key={genre.id}
                      type="radio"
                      name="genre"
                      label={genre.name}
                      value={genre.name}
                      className="checkBox"
                      checked={selectedGenre === genre.name}
                      onChange={() => setSelectedGenre(genre.name)}
                    />
                  ))}
                </div>
              )}
            </div>
            <div className="py-4 d-flex gap-3">
              <Form.Check
                type="radio"
                name="stock"
                label="In Stock"
                checked={inStock === "In Stock"}
                onChange={() => setInStock("In Stock")}
                className="checkBox"
              />
              <Form.Check
                type="radio"
                name="stock"
                label="All Records"
                checked={inStock === "All Records"}
                onChange={() => setInStock("All Records")}
                className="checkBox"
              />
            </div>
            <div className="">
              <h5>Price Range</h5>
              <Slider
                getAriaLabel={() => "Price range"}
                value={valuePrice}
                onChange={handleChangePriceValue}
                valueLabelDisplay="off"
                getAriaValueText={valuetext}
                min={0}
                max={1000}
                sx={{
                  color: "#169db9",
                }}
              />
              <div className="d-flex justify-content-between text-secondary">
                <p>{valuePrice[0]} £</p>
                <p>{valuePrice[1]} £</p>
              </div>
            </div>
          </Col>
          <Col md={10}>
            <div className="d-flex justify-content-between align-items-center">
              <div className="d-flex gap-3 align-items-center">
                <h4 className="m-0 text-white ">Records</h4>
                <p className="m-0 text-secondary">({totalVinyls} result)</p>
              </div>
              <div className="d-flex gap-3 align-items-center">
                <p className="m-0 text-white">Sort by:</p>
                <Dropdown>
                  <Dropdown.Toggle className="drpDwnBtn">
                    {order === "ASC" ? "Ascending price" : "Decreasing price"}
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item
                      active={order === "ASC"}
                      onClick={() => setOrder("ASC")}
                    >
                      Ascending price
                    </Dropdown.Item>

                    <Dropdown.Item
                      active={order === "DESC"}
                      onClick={() => setOrder("DESC")}
                    >
                      Decreasing price
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </div>
            {isLoading && page === 0 ? (
              <div
                className="d-flex justify-content-center align-items-center"
                style={{ minHeight: "400px" }}
              >
                <ScaleLoader color="#169db9" height={"50px"} width={"5px"} />
              </div>
            ) : vinylList.length === 0 ? (
              <div
                className="text-center"
                style={{
                  minHeight: "400px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                }}
              >
                <h5 className="text-secondary mb-3">No records found</h5>
                <p className="text-muted">
                  Try adjusting your filters or search query
                </p>
              </div>
            ) : (
              <>
                <Row className="mt-4 g-4">
                  {vinylList.map((vinyl) => (
                    <Col key={vinyl.id} xs={12} sm={6} md={4} lg={3}>
                      <VinylCard vinyl={vinyl} />
                    </Col>
                  ))}
                </Row>
                <div className="text-center mt-4">
                  {hasMore ? (
                    <p className="text-secondary">No more records to load</p>
                  ) : isLoading ? (
                    <div className="d-flex justify-content-center">
                      <ScaleLoader
                        color="#169db9"
                        height={"20px"}
                        width={"3px"}
                      />
                    </div>
                  ) : (
                    <button
                      className="btnLoadMore mt-3 px-4 py-2"
                      onClick={loadMore}
                    >
                      Load More Records
                    </button>
                  )}
                </div>
              </>
            )}
          </Col>
        </Row>
      </div>
    </>
  );
};

export default CatalogPage;
