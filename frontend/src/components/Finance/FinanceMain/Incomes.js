import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import PageTitle from "./PageTitle";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import Modal from "react-bootstrap/Modal";
import Card from "react-bootstrap/Card";
import { CusAuthContext } from "../../../context/cus-authcontext";
import html2pdf from "html2pdf.js";

const Incomes = ({toggleLoading}) => {
  const navigate = useNavigate();
  const cusauth = useContext(CusAuthContext);
  const [incomes, setIncomes] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [incomeToDelete, setIncomeToDelete] = useState(null);
  const [totalIncome, setTotalIncome] = useState(0);
  const [filterDate, setFilterDate] = useState("");
  const [filteredIncomes, setFilteredIncomes] = useState([]);
  const [downloadingPDF, setDownloadingPDF] = useState(false);

  useEffect(() => {
    fetchIncomes();
  }, []);

  const fetchIncomes = async () => {
    try {
      toggleLoading(true)
        const response = await fetch(`${process.env.React_App_Backend_URL}/api/finance/incomes`);
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setIncomes(data);
        calculateTotalIncome(data);
    } catch (error) {
        console.error("Error fetching incomes:", error);
    }finally {
      toggleLoading(false)
    }
};


  const calculateTotalIncome = (incomes) => {
    const currentDate = new Date().toISOString().split("T")[0];
    let total = 0;
    incomes.forEach((income) => {
      if (formatDate(income.date) === currentDate) {
        total += income.amount;
      }
    });
    setTotalIncome(total);
  };

  const handleAddIncomeClick = () => {
    navigate("add-income");
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split("T")[0];
  };

  const handleEditIncome = (id) => {
    navigate(`edit-income/${id}`);
  };

  const handleDeleteIncome = (id) => {
    setIncomeToDelete(id);
    setShowDeleteModal(true);
  };

  const confirmDeleteIncome = () => {
    fetch(`${process.env.React_App_Backend_URL}/api/finance/incomes/delete-income/${incomeToDelete}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then(() => {
        setIncomes(incomes.filter((inc) => inc._id !== incomeToDelete));
        setShowDeleteModal(false);
        calculateTotalIncome(incomes.filter((inc) => inc._id !== incomeToDelete));
      })
      .catch((error) => console.error("Error deleting income:", error));
  };

  const handleCloseModal = () => {
    setShowDeleteModal(false);
  };

  const generateIncomeID = (index) => {
    return `IN${(index + 1).toString().padStart(4, "0")}`;
  };

  const handleFilterChange = (e) => {
    setFilterDate(e.target.value);
    if (e.target.value === "") {
      setFilteredIncomes([]);
      calculateTotalIncome(incomes);
    } else {
      const filtered = incomes.filter((income) => formatDate(income.date) === e.target.value);
      setFilteredIncomes(filtered);
      calculateTotalIncome(filtered);
    }
  };

  const handleDownloadPDF = () => {
    setDownloadingPDF(true);
    const element = document.getElementById("income-table");
    html2pdf().from(element).save().then(() => setDownloadingPDF(false));
  };

  return (
    <main id="main" className="main">
      <PageTitle path="Finance / Incomes & Funds" title="Incomes & Funds " />
      <div>
        <Button variant="primary" onClick={handleAddIncomeClick} disabled={downloadingPDF}>
          Add Funds
        </Button>
        <br /><br />
        <input type="date" value={filterDate} onChange={handleFilterChange} disabled={downloadingPDF} />
        <br /><br />
        <Card>
          <Card.Body>
            <Card.Title>Total Income for the Day</Card.Title>
            <Card.Text>Rs. {totalIncome}</Card.Text>
          </Card.Body>
        </Card>
        <br /><br />
        <Table id="income-table" striped bordered hover>
          <thead>
            <tr>
              <th>Income/Fund ID</th>
              <th>Title</th>
              <th>Reference</th>
              <th>Amount</th>
              <th>Type</th>
              <th>Date</th>
              <th>Time</th>
              <th>Status</th>
              {!downloadingPDF && <th>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {(filterDate !== "" ? filteredIncomes : incomes).map((income, index) => (
              <tr key={income._id}>
                <td>{generateIncomeID(index)}</td>
                <td>{income.title}</td>
                <td>{income.serviceInvoiceId}</td>
                <td>Rs.{income.amount}</td>
                <td>{income.type}</td>
                <td>{formatDate(income.date)}</td>
                <td>{income.time}</td>
                <td>{income.status}</td>
                {!downloadingPDF && (
                  <td>
                    <Button variant="dark" onClick={() => handleEditIncome(income._id)} disabled={downloadingPDF}>
                      Edit
                    </Button>{" "}
                    <Button variant="danger" onClick={() => handleDeleteIncome(income._id)} disabled={downloadingPDF}>
                      Delete
                    </Button>{" "}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </Table>
        <Button variant="success" onClick={handleDownloadPDF} disabled={downloadingPDF}>
          Download as PDF
        </Button>
      </div>
      {/* Delete confirmation modal */}
      <Modal show={showDeleteModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this income?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal} disabled={downloadingPDF}>
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmDeleteIncome} disabled={downloadingPDF}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </main>
  );
};

export default Incomes;
