import React, { useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Modal, ModalBody } from 'reactstrap';
import { useEffect } from 'react';

const XLSX = require('xlsx');

ChartJS.register(ArcElement, Tooltip, Legend);

function Home() {
  const [json, setJson] = useState(null);
  const [dataSelected, setDataSelected] = useState(null);
  const [isOpen, setIsOpen] = useState(null);
  let cont = 0;

  const toggle = () => setIsOpen(!isOpen);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      const data = new Uint8Array(event.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(sheet);
      setJson(jsonData);
    };
    reader.readAsArrayBuffer(file);
  };

  function getAllInfo(table) {
    let list = jsonToJsonArray();
    let listInfo = [];
    list.map(item => {
      item.map(subitem => {
        if (subitem[0] == table) {
          listInfo.push(subitem[1])
        }
      })
    })
    createDataInfo(listInfo)

  }
  function groupSames(list) {
    const counts = list.reduce((acc, curr) => {
      if (curr in acc) {
        acc[curr]++;
      } else {
        acc[curr] = 1;
      }
      return acc;
    }, {});

    return counts
  }
  function createDataInfo(list) {
    let qtd = list.length;
    let listAux = groupSames(list);
    let listNames = [];
    let listQtds = [];
    console.log(listAux);
    listAux = convertObjToArray(listAux)
    console.log(listAux);
    listAux.map(item =>{
      listNames.push(item[0])
      listQtds.push(item[1])
    })
    console.log('name', listNames)

    let final = {
      labels: listNames,
      datasets: [
        {
          label: '# of Votes',
          data: listQtds,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
          ],
          borderWidth: 1,
        },
      ],
    }

    setDataSelected(final)
  }

  function jsonToJsonArray() {
    let list = [];
    if (json && json.length > 0) {
      json.map((item, index) => {
        item = convertObjToArray(item)
        list.push(item)
      })
    }
    return list
  }

  function convertObjToArray(obj) {
    var result = Object.keys(obj).map(function (key) {

      return [key, obj[key]];
    });
    return result
  }

  useEffect(() => {
    // jsonToJsonArray();
  }, [json])

  return (
    <div>
      <div style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '2%' }}>
        <input type="file" onChange={handleFileChange} />
      </div>
      <div>
        {json && json.length > 0 ?
          json.map((item, index) => {
            cont++
            item = convertObjToArray(item)
            return (
              <>
                {
                  cont == 1 ?
                    item.map((subitem, subindex) => (
                      <button style={{ width: '750px', minHeight: '100px', maxHeight: '100px', backgroundColor: '#40E0D0', border: '1px solid grey', borderRadius: '20px' }} onClick={() => {
                        toggle();
                        getAllInfo(subitem[0])
                      }}>{subitem[0]}</button>
                    ))
                    : null
                }
              </>
            )
          }) : null
        }

      </div>
      <Modal
        isOpen={isOpen}
        toggle={toggle}
      >
        <ModalBody>
          <Pie data={dataSelected} />
        </ModalBody>
      </Modal>
    </div >
  );
}

export default Home;
