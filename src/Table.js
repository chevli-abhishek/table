import React, { useState } from "react";
import { useTable } from "react-table";
import { v4 as uuidv4 } from "uuid";
import classes from "./Table.module.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

const Table = () => {
  const [startTime, setStartTime] = useState("");

  const [endTime, setEndTime] = useState("");

  const [Des, setDes] = useState("");

  const [selectedItem, setSelectedItem] = useState({});

  const saveClickHandler = () => {
    const updatedData = [...tempData];
    updatedData[selectedItem.id] = { ...selectedItem };
    setTempData(updatedData);
    setShow(false);
  };

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = (id) => {
    setShow(true);
    const index = tempData.findIndex((t) => t.id === id);
    setSelectedItem({ ...tempData[index] });
  };

  const [tempData, setTempData] = useState([
    {
      id: uuidv4(),

      StartTime: "Hello",

      EndTime: "World",

      Minutes: "360",

      TaskDescription: "sfadgxxgsdfgsgsdg",
    },
    {
      id: uuidv4(),

      StartTime: "Hello",

      EndTime: "World",

      Minutes: "360",

      TaskDescription: "sfadgxxgsdfgsgsdg",
    },
    {
      id: uuidv4(),
      StartTime: "Hello",

      EndTime: "World",

      Minutes: "360",

      TaskDescription: "sfadgxxgsdfgsgsdg",
    },
    {
      id: uuidv4(),
      StartTime: "Hello",

      EndTime: "World",

      Minutes: "360",

      TaskDescription: "sfadgxxgsdfgsgsdg",
    },
  ]);
  const handleClick = () => {
    setTempData([
      ...tempData,
      {
        id: uuidv4(),

        StartTime: startTime,

        EndTime: endTime,

        Minutes: "360",

        TaskDescription: Des,
      },
    ]);
  };
  const deleteHandler = (delet) => {
    // alert("DeleteClicked:" + delet);
    const filteredData = [...tempData].filter((t) => t.id !== delet);
    setTempData(filteredData);
  };
  const data = React.useMemo(
    () =>
      tempData.map((t) => ({
        ...t,
        EditDelete: (
          <div>
            <button onClick={() => handleShow(t.id)}>Edit</button>
            <button onClick={() => deleteHandler(t.id)}>Delete</button>
          </div>
        ),
      })),

    [tempData]
  );
  console.log(selectedItem);
  const columns = React.useMemo(
    () => [
      {
        Header: "Start Time",

        accessor: "StartTime", // accessor is the "key" in the data
      },

      {
        Header: "End Time",

        accessor: "EndTime",
      },
      {
        Header: "Minutes",

        accessor: "Minutes", // accessor is the "key" in the data
      },
      {
        Header: "Task Description",

        accessor: "TaskDescription", // accessor is the "key" in the data
      },
      {
        Header: "Edit Delete",

        accessor: "EditDelete", // accessor is the "key" in the data
      },
    ],

    []
  );

  const {
    getTableProps,

    getTableBodyProps,

    headerGroups,

    rows,

    prepareRow,
  } = useTable({ columns, data });

  return (
    <>
      <div className={classes.main}>
        <p>Start Time:</p>
        <input
          type="datetime-local"
          onChange={(e) => {
            setStartTime(e.target.value);
          }}
          value={startTime}
        />
        <p>End Time:</p>
        <input
          placeholder="End Time"
          type="datetime-local"
          value={endTime}
          onChange={(e) => {
            setEndTime(e.target.value);
          }}
        ></input>
        <p>Start Description:</p>
        <input
          placeholder="Task Description"
          value={Des}
          onChange={(e) => {
            setDes(e.target.value);
          }}
        ></input>
        <button onClick={handleClick}>Add</button>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Start Time:</Form.Label>
              <Form.Control
                type="datetime-local"
                onChange={(e) => {
                  setSelectedItem({
                    ...selectedItem,
                    startTime: e.target.value,
                  });
                }}
                value={selectedItem.startTime}
                autoFocus
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>End Time :</Form.Label>
              <Form.Control
                placeholder="End Time"
                type="datetime-local"
                value={selectedItem.endTime}
                onChange={(e) => {
                  setSelectedItem({ ...selectedItem, endTime: e.target.value });
                }}
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Description</Form.Label>
              <Form.Control
                placeholder="Task Description"
                value={selectedItem.Des}
                onChange={(e) => {
                  setSelectedItem({
                    ...selectedItem,
                    Des: e.target.value,
                  });
                }}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={saveClickHandler}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      <table {...getTableProps()} style={{ border: "solid 1px blue" }}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps()}
                  style={{
                    borderBottom: "solid 3px red",

                    background: "aliceblue",

                    color: "black",

                    fontWeight: "bold",
                  }}
                >
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);

            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td
                      {...cell.getCellProps()}
                      style={{
                        padding: "10px",

                        border: "solid 1px gray",

                        background: "papayawhip",
                      }}
                    >
                      {cell.render("Cell")}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default Table;
