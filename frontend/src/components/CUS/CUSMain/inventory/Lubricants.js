import React, { useState, useEffect, useContext } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Modal from "react-bootstrap/Modal";
import Table from "react-bootstrap/Table";
import { useNavigate } from "react-router-dom";
import { CusAuthContext } from "../../../../context/cus-authcontext";

function Lubricants({ toggleLoading }) {
  const navigate = useNavigate();
  const [Products, setProducts] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState("");
  const [quantities, setQuantities] = useState({});
  const [cart, setcart] = useState([]);
  const [show, setShow] = useState(false);
  const cusauth = useContext(CusAuthContext);

  useEffect(() => {
    function getProducts() {
      toggleLoading(true);
      axios
        .get(`${process.env.React_App_Backend_URL}/Product/lubricantstock`)
        .then((res) => {
          const initialQuantities = {};
          res.data.forEach((product) => {
            initialQuantities[product._id] = 0;
            product.initialQuantity = product.Quantity;
          });
          setProducts(res.data);
          setQuantities(initialQuantities);
        })
        .catch((err) => {
          alert("error");
        })
        .finally(() => {
          toggleLoading(false);
        });
    }
    getProducts();
  }, []);

  const handleBrandChange = (event) => {
    setSelectedBrand(event.target.value);
  };

  const increment = (productId, initialQuantity) => {
    if (
      quantities[productId] < initialQuantity ||
      initialQuantity > 0 ||
      (quantities[productId] === 0 && initialQuantity > 0)
    ) {
      setQuantities((prevQuantities) => ({
        ...prevQuantities,
        [productId]: prevQuantities[productId] + 1,
      }));
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product._id === productId
            ? { ...product, Quantity: product.Quantity - 1 }
            : product
        )
      );
    }
  };

  const decrement = (productId, initialQuantity) => {
    if (quantities[productId] > 0) {
      setQuantities((prevQuantities) => ({
        ...prevQuantities,
        [productId]: prevQuantities[productId] - 1,
      }));
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product._id === productId
            ? { ...product, Quantity: product.Quantity + 1 }
            : product
        )
      );
    }
  };

  const addToCart = (
    productId,
    productName,
    unitPrice,
    quantity,
    image,
    pquantity,
    brand
  ) => {
    const newquantity = pquantity - quantity;
    toggleLoading(true);
    const updateLub = {
      Product_name: productName,
      Product_brand: brand,
      Quantity: newquantity,
      Unit_price: unitPrice,
      image: image,
    };

    axios
      .put(
        `${process.env.React_App_Backend_URL}/Product/updatelubricant/${productId}`,
        updateLub
      )
      .then((response) => {
        console.log(response);
        window.location.reload();
      })
      .catch((error) => {
        console.error(error);
      });

    axios
      .get(`${process.env.React_App_Backend_URL}/Product/getcart`)
      .then((res) => {
        const cartData = res.data;
        console.log(cartData);
        const productToUpdate = cartData.find(
          (item) => item.Product_name === productName
        );
        const pastItemId = productToUpdate ? productToUpdate._id : null;
        console.log("productto update", pastItemId);
        if (productToUpdate) {
          const updatedQuantity = productToUpdate.Quantity + quantity;
          console.log(productToUpdate.Product_name);
          axios
            .put(
              `${process.env.React_App_Backend_URL}/Product/updatecart/${pastItemId}`,
              {
                Quantity: updatedQuantity,
              }
            )
            .then((response) => {
              console.log(response.data);
              window.location.reload();
            })
            .catch((error) => {
              console.error(error);
            })
            .finally(() => {
              toggleLoading(false);
            });
        } else {
          const cartItem = {
            product_name: productName,
            unit_price: unitPrice,
            quantity: quantity,
            image: image,
          };
          axios
            .post(
              `${process.env.React_App_Backend_URL}/Product/addcart`,
              cartItem
            )
            .then((response) => {
              console.log(response.data);
              window.location.reload();
              setcart([...cart, response.data]);
            })
            .catch((error) => {
              console.error(error);
            })
            .finally(() => {
              toggleLoading(false);
            });
        }
      })
      .catch((err) => {
        alert("Error occurred while fetching cart data");
      });
  };

  const emptycart = () => {
    toggleLoading(true);
    axios
      .get(`${process.env.React_App_Backend_URL}/Product/getcart`)
      .then((cartRes) => {
        const cartItems = cartRes.data;
        axios
          .get(`${process.env.React_App_Backend_URL}/Product/lubricantstock`)
          .then((lubStockRes) => {
            const lubStockItems = lubStockRes.data;
            axios
              .get(`${process.env.React_App_Backend_URL}/Product/Tirestock`)
              .then((tireStockRes) => {
                const tireStockItems = tireStockRes.data;

                cartItems.forEach((cartItem) => {
                  const matchingLubStockItem = lubStockItems.find(
                    (lubStockItem) =>
                      lubStockItem.Product_name === cartItem.Product_name
                  );
                  if (matchingLubStockItem) {
                    const newLubQuantity =
                      cartItem.Quantity + matchingLubStockItem.Quantity;

                    const updateLub = {
                      Product_name: matchingLubStockItem.Product_name,
                      Product_brand: matchingLubStockItem.Product_brand,
                      Quantity: newLubQuantity,
                      Unit_price: matchingLubStockItem.Unit_price,
                      image: matchingLubStockItem.image,
                    };

                    axios
                      .put(
                        `${process.env.React_App_Backend_URL}/Product/updatelubricant/${matchingLubStockItem._id}`,
                        updateLub
                      )
                      .then((response) => {
                        console.log(response);
                      })
                      .catch((error) => {
                        console.error(error);
                      });
                  } else {
                    console.log(
                      "No matching lubricant stock item found for cart item:",
                      cartItem
                    );
                  }
                  const matchingTireStockItem = tireStockItems.find(
                    (tireStockItem) =>
                      tireStockItem.Product_name === cartItem.Product_name
                  );
                  if (matchingTireStockItem) {
                    const newTireQuantity =
                      cartItem.Quantity + matchingTireStockItem.Quantity;

                    const updateTire = {
                      Product_name: matchingTireStockItem.Product_name,
                      Product_brand: matchingTireStockItem.Product_brand,
                      vehicle_Type: matchingTireStockItem.vehicle_Type,
                      Quantity: newTireQuantity,
                      Unit_price: matchingTireStockItem.Unit_price,
                      image: matchingTireStockItem.image,
                    };

                    axios
                      .put(
                        `${process.env.React_App_Backend_URL}/Product/updateTire/${matchingTireStockItem._id}`,
                        updateTire
                      )
                      .then((response) => {
                        console.log(response);
                      })
                      .catch((error) => {
                        console.error(error);
                      });
                  } else {
                    console.log(
                      "No matching tire stock item found for cart item:",
                      cartItem
                    );
                  }
                });

                axios
                  .delete(
                    `${process.env.React_App_Backend_URL}/Product/emptycart`
                  )
                  .then(() => {
                    console.log("Cart emptied successfully.");
                    window.location.reload();
                  })
                  .catch((error) => {
                    console.error("Error emptying cart:", error);
                  })
                  .finally(() => {
                    toggleLoading(false);
                  });
              })
              .catch((tireStockErr) => {
                console.error("Error fetching tire stock data:", tireStockErr);
              });
          })
          .catch((lubStockErr) => {
            console.error("Error fetching lubricant stock data:", lubStockErr);
          });
      })
      .catch((cartErr) => {
        console.error("Error fetching cart data:", cartErr);
      });
  };

  useEffect(() => {
    function getcart() {
      toggleLoading(true);
      axios
        .get(`${process.env.React_App_Backend_URL}/Product/getcart`)
        .then((res) => {
          setcart(res.data);
        })
        .catch((err) => {
          alert("error");
        })
        .finally(() => {
          toggleLoading(false);
        });
    }
    getcart();
  }, []);

  const Delete = (id, pname, quantity) => {
    toggleLoading(true);
    axios
      .get(`${process.env.React_App_Backend_URL}/Product/lubricantstock`)
      .then((lubStockRes) => {
        const lubStockItems = lubStockRes.data;

        axios
          .get(`${process.env.React_App_Backend_URL}/Product/Tirestock`)
          .then((tireStockRes) => {
            const tireStockItems = tireStockRes.data;
            const matchingLubStockItem = lubStockItems.find(
              (lubStockItem) => lubStockItem.Product_name === pname
            );
            if (matchingLubStockItem) {
              const newLubQuantity = quantity + matchingLubStockItem.Quantity;

              const updateLub = {
                Product_name: matchingLubStockItem.Product_name,
                Product_brand: matchingLubStockItem.Product_brand,
                Quantity: newLubQuantity,
                Unit_price: matchingLubStockItem.Unit_price,
                image: matchingLubStockItem.image,
              };

              axios
                .put(
                  `${process.env.React_App_Backend_URL}/Product/updatelubricant/${matchingLubStockItem._id}`,
                  updateLub
                )
                .then((response) => {
                  console.log(response);
                })
                .catch((error) => {
                  console.error(error);
                });
            } else {
              console.log(
                "No matching lubricant stock item found for cart item:",
                pname
              );
            }
            const matchingTireStockItem = tireStockItems.find(
              (tireStockItem) => tireStockItem.Product_name === pname
            );
            if (matchingTireStockItem) {
              const newTireQuantity = quantity + matchingTireStockItem.Quantity;

              const updateTire = {
                Product_name: matchingTireStockItem.Product_name,
                Product_brand: matchingTireStockItem.Product_brand,
                vehicle_Type: matchingTireStockItem.vehicle_Type,
                Quantity: newTireQuantity,
                Unit_price: matchingTireStockItem.Unit_price,
                image: matchingTireStockItem.image,
              };

              axios
                .put(
                  `${process.env.React_App_Backend_URL}/Product/updateTire/${matchingTireStockItem._id}`,
                  updateTire
                )
                .then((response) => {
                  console.log(response);
                })
                .catch((error) => {
                  console.error(error);
                });
            } else {
              console.log(
                "No matching tire stock item found for cart item:",
                pname
              );
            }

            axios
              .delete(
                `${process.env.React_App_Backend_URL}/Product/deletecart/${id}`
              )
              .then((response) => {
                console.log(response);
                window.location.reload();
              })
              .catch((error) => {
                console.error(error);
              })
              .finally(() => {
                toggleLoading(false);
              });
          })
          .catch((tireStockErr) => {
            console.error("Error fetching tire stock data:", tireStockErr);
          });
      })
      .catch((lubStockErr) => {
        console.error("Error fetching lubricant stock data:", lubStockErr);
      });
  };

  const checkout = () => {
    toggleLoading(true);
    axios
      .get(`${process.env.React_App_Backend_URL}/Product/lubricantstock`)
      .then((lubStockRes) => {
        const lubStockItems = lubStockRes.data;
        console.log(lubStockItems);
        axios
          .get(`${process.env.React_App_Backend_URL}/Product/Tirestock`)
          .then((tireStockRes) => {
            const tireStockItems = tireStockRes.data;
            console.log(tireStockItems);
            const itemsToUpdate = [];

            lubStockItems.forEach((lubItem) => {
              if (lubItem.Quantity < 5) {
                itemsToUpdate.push({
                  product_name: lubItem.Product_name,
                  product_type: "lubricant",
                });
              }
            });

            tireStockItems.forEach((tireItem) => {
              if (tireItem.Quantity < 5) {
                itemsToUpdate.push({
                  product_name: tireItem.Product_name,
                  product_type: "tire",
                });
              }
            });
            axios
              .get(`${process.env.React_App_Backend_URL}/Product/getquantity`)
              .then((quantityRes) => {
                const quantityCollection = quantityRes.data;
                console.log(quantityCollection);

                itemsToUpdate.forEach((item) => {
                  const existingProduct = quantityCollection.find(
                    (product) => product.Product_name === item.product_name
                  );

                  if (!existingProduct) {
                    axios
                      .post(
                        `${process.env.React_App_Backend_URL}/Product/addquantity`,
                        {
                          product_name: item.product_name,
                          product_type: item.product_type,
                        }
                      )
                      .then((response) => {
                        console.log(response.data);
                      });
                  } else {
                    console.log(
                      "Product already in collection:",
                      item.product_name
                    );
                  }
                });
              })
              .catch((error) => {
                console.error("Error fetching Quantity collection:", error);
              });

            const allProducts = [];
            let total = 0;
            axios
              .get(`${process.env.React_App_Backend_URL}/Product/getcart`)
              .then((res) => {
                const cart = res.data;
                total = cart.reduce(
                  (acc, item) => acc + item.Unit_price * item.Quantity,
                  0
                );

                cart.forEach((item) => {
                  allProducts.push({
                    product_name: item.Product_name,
                    unit_price: item.Unit_price,
                    quantity: item.Quantity,
                  });
                });

                console.log(allProducts);

                const currentDateUTC = new Date();
                currentDateUTC.setHours(currentDateUTC.getHours() + 5);
                currentDateUTC.setMinutes(currentDateUTC.getMinutes() + 30);
                const formattedDate = currentDateUTC.toISOString();

                const order = {
                  date: formattedDate,
                  email: cusauth.email,
                  products: allProducts,
                  total: total,
                  status: "pending",
                };

                console.log(order);
                axios
                  .post(
                    `${process.env.React_App_Backend_URL}/Product/addorder`,
                    order
                  )
                  .then((response) => {
                    const orderId = response.data.orderId;
                    console.log(orderId);

                    const emailData = {
                      to: cusauth.email,
                      subject: `Your Cart Details : orderID :${orderId}`,
                      text: `Thank you for shopping with us !!!
                      You will receive your bill number and the invoice shortly, From that you can easily make payment through online or physical
                    Here are your cart details: `,
                      html: null,
                      orderId: orderId,
                    };

                    axios
                      .post(
                        `${process.env.React_App_Backend_URL}/Product/sendinventoryemail`,
                        emailData
                      )
                      .then((response) => {
                        console.log(response.data);

                        axios
                          .delete(
                            `${process.env.React_App_Backend_URL}/Product/clear-cart`
                          )
                          .then((response) => {
                            console.log("Cart cleared successfully");
                            navigate("/customer/products/myorders");
                          })
                          .catch((error) => {
                            console.error("Error clearing cart:", error);
                          })
                          .finally(() => {
                            toggleLoading(false);
                          });
                      })
                      .catch((error) => {
                        console.error("Error sending email:", error);
                      });
                  })
                  .catch((error) => {
                    console.error("Error adding order:", error);
                  });
              })
              .catch((error) => {
                console.error("Error fetching cart:", error);
                alert("error");
              });
          })
          .catch((tireStockErr) => {
            console.error("Error fetching tire stock data:", tireStockErr);
          });
      })
      .catch((lubStockErr) => {
        console.error("Error fetching lubricant stock data:", lubStockErr);
      });
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const filteredProducts =
    selectedBrand === ""
      ? Products
      : Products.filter((product) => product.Product_brand === selectedBrand);

  if (filteredProducts.length === 0) {
    return (
      <div style={{ marginTop: "1%", marginLeft: "3%" }}>
        <h1 style={{ textAlign: "center" }}>GET FIRST CLASS LUBRICANTS </h1>
        <div style={{ display: "flex", marginTop: "4%" }}>
          <Form.Label
            style={{ marginLeft: "15%", fontWeight: "bold", fontSize: "20px" }}
          >
            Brand
          </Form.Label>
          <Form.Select
            aria-label="Default select example"
            style={{ marginLeft: "2%", width: "20%" }}
            onChange={handleBrandChange}
            value={selectedBrand}
          >
            <option value="">All</option>
            <option value="Valvoline">Valvoline</option>
            <option value="Mobil">Mobil</option>
            <option value="Castrol">Castrol</option>
            <option value="Caltex">Caltex</option>
            <option value="Servo">Servo</option>
          </Form.Select>
          <Button
            variant="outline-dark"
            style={{ marginLeft: "45%" }}
            size="lg"
            onClick={handleShow}
          >
            Cart <i class="bi bi-cart"></i>
          </Button>
        </div>
        <h1
          style={{ marginTop: "2%", textAlign: "center", marginBottom: "3%" }}
        >
          No any products available
        </h1>
      </div>
    );
  }

  return (
    <div style={{ marginTop: "1%", marginLeft: "3%" }}>
      <h1 style={{ textAlign: "center" }}>GET FIRST CLASS LUBRICANTS </h1>
      <div style={{ display: "flex", marginTop: "4%" }}>
        <Form.Label
          style={{ marginLeft: "15%", fontWeight: "bold", fontSize: "20px" }}
        >
          Brand
        </Form.Label>
        <Form.Select
          aria-label="Default select example"
          style={{ marginLeft: "2%", width: "20%" }}
          onChange={handleBrandChange}
          value={selectedBrand}
        >
          <option value="">All</option>
          <option value="Valvoline">Valvoline</option>
          <option value="Mobil">Mobil</option>
          <option value="Castrol">Castrol</option>
          <option value="Caltex">Caltex</option>
          <option value="Servo">Servo</option>
        </Form.Select>
        <Button
          variant="outline-dark"
          style={{ marginLeft: "45%" }}
          size="lg"
          onClick={handleShow}
        >
          Cart <i class="bi bi-cart"></i>
        </Button>
      </div>
      <div
        style={{
          display: "flex",
          marginTop: "7%",
          flexWrap: "wrap",
          justifyContent: "space-between",
          marginRight: "3%",
        }}
      >
        {filteredProducts.map((product) => (
          <Card style={{ width: "27%", height: "70%" }}>
            <center>
              <Card.Img
                variant="top"
                src={`${product.image}`}
                style={{
                  marginTop: "3%",
                  width: "200px",
                  height: "200px",
                  alignContent: "center",
                }}
              />
            </center>
            <Card.Body>
              <Card.Title style={{ textAlign: "center" }}>
                {product.Product_name}
              </Card.Title>
              <Card.Text style={{ textAlign: "center" }}>
                {product.Product_brand}
              </Card.Text>
              <hr />
              <Card.Text style={{ textAlign: "center" }}>
                Unit price : Rs.{product.Unit_price}
              </Card.Text>
              <hr />
              <Row>
                <Col md={7}>
                  <Card.Text>Available Quantity : {product.Quantity}</Card.Text>
                  <div style={{ display: "flex" }}>
                    <Button
                      variant="light"
                      onClick={() => decrement(product._id, product.Quantity)}
                    >
                      <i class="bi bi-dash-circle-fill" />
                    </Button>
                    <Form.Control
                      className="remove-spinner"
                      type="number"
                      style={{ width: "30%" }}
                      value={quantities[product._id]}
                    />
                    <Button
                      variant="light"
                      onClick={() => increment(product._id, product.Quantity)}
                    >
                      <i class="bi bi-plus-circle-fill" />
                    </Button>
                  </div>
                </Col>
                <Col md={4}>
                  <Button
                    variant="secondary"
                    style={{ marginTop: "15%" }}
                    onClick={() =>
                      addToCart(
                        product._id,
                        product.Product_name,
                        product.Unit_price,
                        quantities[product._id],
                        product.image,
                        product.initialQuantity,
                        product.Product_brand
                      )
                    }
                    disabled={quantities[product._id] === 0}
                  >
                    Add to cart <i className="bi bi-cart-plus-fill"></i>
                  </Button>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        ))}
      </div>
      <div
        className="modal show"
        style={{ display: "block", position: "initial" }}
      >
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Your Cart</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Table>
              <thead>
                <tr>
                  <th></th>
                  <th>prodcut</th>
                  <th>price</th>
                  <th>quantity</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {cart.map((cartItem) => (
                  <tr key={cartItem._id}>
                    <td
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <img
                        src={`${cartItem.image}`}
                        alt={cartItem.Product_name}
                        style={{ width: "40%", height: "40%" }}
                      />
                    </td>
                    <td style={{ textAlign: "center" }}>
                      {cartItem.Product_name}
                    </td>
                    <td style={{ textAlign: "center" }}>
                      {cartItem.Unit_price}
                    </td>
                    <td style={{ textAlign: "center" }}>{cartItem.Quantity}</td>
                    <td>
                      <Button
                        variant="danger"
                        onClick={() => {
                          Delete(
                            cartItem._id,
                            cartItem.Product_name,
                            cartItem.Quantity
                          );
                          handleClose();
                        }}
                      >
                        remove
                      </Button>
                    </td>
                  </tr>
                ))}
                <tr>
                  <td colSpan={4}>
                    <b>Total</b>
                  </td>
                  <td>
                    Rs.
                    {cart.reduce(
                      (total, item) => total + item.Unit_price * item.Quantity,
                      0
                    )}
                  </td>
                </tr>
              </tbody>
            </Table>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => {
                emptycart();
                handleClose();
              }}
            >
              Empty cart
            </Button>
            <Button
              variant="success"
              onClick={() => {
                checkout();
                handleClose();
              }}
            >
              Check out
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}

export default Lubricants;
