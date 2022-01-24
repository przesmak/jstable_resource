import React, { useRef, useEffect, useState } from "react";
import jspreadsheet from "jspreadsheet-ce";
import './jexcel.css'
import { colorPicker, humanReadableMonths, setColumns, setDataTable, setMonths, sortNamesResource } from "./utils";
import styled from "styled-components";
import { activity_employee_period } from "./data";

export default function Jspreadsheet(props) {
    const { options } = props
    const jRef = useRef(null);
    const [inputSheet, setInputSheet] = useState(null);
    const [numOfRows, setNumOfRows] = useState(null);
    const [numOfColumns, setNumOfColumns] = useState(null);

    const onUpdate = (instance, cell, col, row, val, label, cellName) => {
        cell.style.backgroundColor = colorPicker(val);
    }

    const optionsCustom = {
        ...options,
        updateTable: onUpdate,
        data: activity_employee_period.sort(sortNamesResource).map(v => { return setDataTable("2020-10-12", "2022-04-12", v.ActivityEmployee.resource_plan) }),
        columns: setColumns("2020-10-12", "2022-04-12"),
    }

    function valuesArray(length, value) {
        let array_val = []
        for (let i = 0; i < length; i++) {
            array_val.push(value)
        }
        return array_val
    }

    const funRow = (e) => {
        if (inputSheet !== null) {
            inputSheet.setRowData(Number(e.target.id), valuesArray(numOfColumns, e.target.value));
        }
    }


    useEffect(() => {
        if (!jRef.current.jspreadsheet) {
            console.log('tutaj');
            setInputSheet(jspreadsheet(jRef.current, optionsCustom));
        }
        if (inputSheet !== null) {
            inputSheet.hideIndex();
            setNumOfRows(inputSheet.getColumnData([0]).length)
            setNumOfColumns(inputSheet.getHeaders().split(',').length)
            setMonths("2020-10-12", "2022-09-12")
            console.log(setMonths("2022-1-12", "2022-11-12").map(v => humanReadableMonths(v)))
        }
    }, [inputSheet, optionsCustom]);

    const addRow = () => {
        jRef.current.jexcel.insertRow();
        const currentRowNum = numOfRows
        setNumOfRows(currentRowNum + 1)
        inputSheet.setRowData(currentRowNum, valuesArray(numOfColumns, '0'))
    };

    const handleSubmit = () => {
        console.log('On Submit: ', inputSheet.getHeaders().split(','), inputSheet.getData());
    }

    return (
        <>
            <Container>
                <ContainerUni>
                    <NamesContainer>
                        {activity_employee_period.sort(sortNamesResource).map(v => {
                            return (
                                <Names>
                                    {v.Employee.name}
                                </Names>)
                        })}
                    </NamesContainer>
                </ContainerUni>
                <ContainerUni>
                    <input type="button" onClick={addRow} value="Add new row" />
                    {valuesArray(numOfRows, 0).map((item, index) => {
                        return (<UniInput key={index}><input id={index} onChange={funRow} type='number' min={0} max={100} step={5} /></UniInput>)
                    }
                    )
                    }
                </ContainerUni>
                <TableContainer ref={jRef} />
            </Container>
            <input type="button" onClick={handleSubmit} value="Submit" />
        </>
    );
}

const Container = styled.div`
    display: inline-grid;
    grid-template-columns: 170px 100px auto;
`

const ContainerUni = styled.div`
    padding-top: 8px;
`

const TableContainer = styled.div`
    width: 800px;
    padding-top: 8px;
    overflow: auto;
`

const UniInput = styled.div`
    padding-top: 5.25px;
`

const NamesContainer = styled.div`
    padding-top: 25px;
`

const Names = styled.div`
    padding-top: 8px;
`