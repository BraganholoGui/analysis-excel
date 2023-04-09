import React, { useState } from 'react';
import { Pie, Bubble } from 'react-chartjs-2';
import {
  Chart as ChartJS, ArcElement, Tooltip, Legend,
  LinearScale,
  PointElement,
} from 'chart.js';
import { Modal, ModalBody } from 'reactstrap';
import { useEffect } from 'react';

const XLSX = require('xlsx');

ChartJS.register(ArcElement, Tooltip, Legend);
ChartJS.register(LinearScale, PointElement, Tooltip, Legend);

function Home() {
  const [json, setJson] = useState(null);
  const [dataOptions, setDataOptions] = useState(null);
  const [dataSelected, setDataSelected] = useState(null);
  const [isOpen, setIsOpen] = useState(null);
  const [isOpenBubble, setIsOpenBubble] = useState(null);
  const [title, setTitle] = useState('');
  let cont = 0;

  const toggle = () => setIsOpen(!isOpen);
  const toggleBubble = () => setIsOpenBubble(!isOpenBubble);

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
    if (table == "Escreva algumas linhas sobre sua história e seus sonhos de vida." || table == "Informe o número do seu RA." || table == "Qual a sua data de nascimento?" || table == "Quais assuntos você pesquisa?" || table == "Quais fontes de entretenimento cultural você usa") {
      createDataInfoBubble(listInfo)
    } else {
      createDataInfo(listInfo)
    }

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

  function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }


  function createDataInfoBubble(list) {
    let qtd = list.length;
    let listAux = groupSames(list);
    let listNames = [];
    let listQtds = [];
    let listData = [];
    listAux = convertObjToArray(listAux)
    listAux.map(item => {
      listNames.push(item[0])
      listQtds.push(item[1])
    })

    const options = {
      scales: { x: { display: false, stepSize: 5, }, y: { display: false, stepSize: 5, } },
      // maintainAspectRatio: false,
      responsive:true,
      plugins: {
        legend: {
          labels: {
              font: {
                  size: 15,
                },
                boxHeight:18
          },
          // maxHeight:500,
          // maxWidth:100,
      }
      }
      
    };

    listAux.map(item => {
      listData.push(
        {
          label: item[0],
          data: Array.from({ length: item[1] }, () => ({
            x: getRandomNumber(0, 20),
            y: getRandomNumber(0, 20),
            r: item[1] * 6,
          })),
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
          pointStyle: 'rectRounded',
          borderColor: 'red',
          borderWidth: 1,
        }
      )
    })

    const data = {
      datasets: listData,

    };

    setDataSelected(data)
    setDataOptions(options)
  }
  function createDataInfo(list) {
    let qtd = list.length;
    let listAux = groupSames(list);
    let listNames = [];
    let listQtds = [];
    listAux = convertObjToArray(listAux)
    listAux.map(item => {
      listNames.push(item[0] + ' ' + (item[1] * 100 / qtd).toFixed(2) + '%')
      listQtds.push(item[1])
    })

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
      <div style={{ display: 'grid', flexDirection: 'column', width: '100%', alignItems: 'center', justifyContent: 'center', gridTemplateColumns: 'auto auto auto' }}>
        {json && json.length > 0 ?
          json.map((item, index) => {
            cont++
            item = convertObjToArray(item)
            return (
              <>
                {
                  cont == 1 ?
                    item.map((subitem, subindex) => (
                      <button style={{ width: '400px', margin: '2%', minHeight: '100px', maxHeight: '100px', backgroundColor: '#40E0D0', border: '1px solid grey', borderRadius: '20px' }} onClick={() => {
                        if (subitem[0] == "Escreva algumas linhas sobre sua história e seus sonhos de vida." || subitem[0] == "Informe o número do seu RA." || subitem[0] == "Qual a sua data de nascimento?" || subitem[0] == "Quais assuntos você pesquisa?" || subitem[0] == "Quais fontes de entretenimento cultural você usa") {
                          toggleBubble();
                        } else {
                          toggle();
                        }
                        setTitle(subitem[0])
                        console.log(subitem[0])
                        getAllInfo(subitem[0])
                      }}>{subitem[0]}
                      </button>
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
        <ModalBody
          style={{ width: '500px' }}>
          <div style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItem: 'center', fontSize: '17px', fontWeight: '700', borderBottom: '1px solid black' }}>
            {title}
          </div>
          <Pie data={dataSelected} />
        </ModalBody>
      </Modal>
      <Modal
        isOpen={isOpenBubble}
        toggle={toggleBubble}
        size="lg" style={{ maxWidth: '900px', width: '100%', minHeight: '900px' }}
      >
        <ModalBody
          size="lg" style={{ maxWidth: '900px', width: '100%', minHeight: '800px' }}>
          <div style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItem: 'center', fontSize: '17px', fontWeight: '700', borderBottom: '1px solid black' }}>
            {title}
          </div>
          <Bubble data={dataSelected} options={dataOptions} />
        </ModalBody>
      </Modal>
    </div >
  );
}

export default Home;
