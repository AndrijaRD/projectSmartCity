import { useEffect, useState } from 'react';
import './css/AdminDashboard.css'
import request from '../../global/request';
import { api } from '../../global/const';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';
import {CategoryScale} from 'chart.js'; 
ChartJS.register(CategoryScale);

type tablesType = {
    status: "Success" | "Failed Login" | "Failed Auth", 
    tableData: { [key: string]: string | number }[][], 
    tableDescriptions: {
        Field: string,
        Type: string,
        Null: 'YES' | 'NO',
        Key: '' | 'PRI' | 'MUL',
        Default: null | 'curdate()' | 'curtime()' | string | number,
        Extra: 'auto_increment' | string
    }[][],
    tableAboutTexts: string[],
    tableNames: string[]
}
function AdminDashboard2(): JSX.Element {
    //document.body.classList.add("lightmode")
    const [getTables, setGetTables] = useState<boolean>(true)
    const [ATI, setATI] = useState<number>(0); // active table index
    const [tables, setTables] = useState<tablesType>({status: "Failed Login", tableData: [], tableAboutTexts: [], tableNames: [], tableDescriptions: []});

    useEffect(() => {
        if(getTables){
            setGetTables(false);
            request(api+"/admin/getTables", "POST", {token: localStorage.getItem("token")}).then((res: tablesType) => {
                if(res.status==="Success") return setTables(res)
                else if(res.status==="Failed Login") return location.href="/account/login?redirect=/admin"
                return window.alert("Neovlascen pristup molim vas vratite se na pocetnu stranicu")
            })
        }
    })

    const handleChange = (element: EventTarget & HTMLDivElement) => element.classList.contains("active")?
        ()=>{}:
        ()=>{
            document.querySelector("main.AdminDashboard .active")?.classList.remove("active");
            element.classList.add("active");
            const id = document.getElementsByClassName("active")[0].id
            setATI(tables.tableNames.findIndex(table => table ===  id))
        }

    const flipCheckbox = (e: HTMLElement | null | undefined, realInput: boolean = false) => {
        if(e===null || e===undefined) return
        const cb: any = e.children[0].children[0]
        realInput ? "" : cb.checked = !cb.checked
        cb.checked ? e.classList.add("selected") : e.classList.remove("selected")
    }
    return !(tables.status==="Success") ? (<div>Loading...</div>) : (
        <main className="AdminDashboard">
            <div className="primary-list">
                {
                    tables.tableNames.map((table, i) =>
                        <div className={"option " + (i===0?"active":"")} key={table} id={table} onClick={e => handleChange(e.currentTarget)()}>
                            <img src={`/admin/tableIcons/${table}.png`} alt="" />
                            <h3>{table}</h3>
                        </div>
                    )
                }
            </div>
            <div className="panel">
                <h1>{tables.tableNames[ATI]}</h1>
                <h3>{tables.tableAboutTexts[ATI]}</h3>

                <div className="datatable-container">
                    <div className="header-tools">
                        <div className="tools">
                            <button><img src="/admin/create.png" alt="" /></button>
                            <button><img src="/admin/edit.png" alt="" /></button>
                            <button><img src="/admin/delete.png" alt="" /></button>
                        </div>
                        <div className="search"> <input type="search" className="search-input" placeholder="Search..." /> </div>
                    </div>
                    <table className='datatable'>
                        <thead>
                            <tr>
                                <th style={{width: "50px"}}>Select</th>
                                {tables.tableDescriptions[ATI].map(column => <th key={column.Field}>{column.Field}</th>)}
                            </tr>
                        </thead>
                        <tbody>
                            {
                            tables.tableData[ATI].map(row => 
                                <tr key={Math.random()} onClick={(e:any) => e.target.localName==="input"?"":flipCheckbox(e.currentTarget)}>
                                    <td><input type="checkbox" name="" id="" onChange={e => flipCheckbox(e.currentTarget.parentElement?.parentElement, true)} /></td>
                                    {
                                    tables.tableDescriptions[ATI].map(column => {
                                        let text = row[column.Field].toString()
                                        if(text.toLocaleString().length > 16) text = text.slice(0, 16) + "..."
                                        return <td key={column.Field}>{text}</td>
                                    }) 
                                    }
                                </tr>)
                            }
                        </tbody>
                    </table>
                </div>
                <div className="create">
                    {
                        tables.tableDescriptions[ATI].map(column => {
                            const ic = column.Extra==="auto_increment"
                            return (
                                <div className="column">
                                    <h3><b>{column.Field}</b> - {column.Type} {column.Key!==""?` - (${column.Key})`:""}:</h3>
                                    <input type="text" disabled={ic} placeholder={ic?"auto_increment":column.Default?.toString()} />
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </main>
    )
}
const Data: {year: number, userGain: number, userLost: number}[] = [
    {
        year: 2020,
        userGain: 471,
        userLost: 23
    },
    {
        year: 2021,
        userGain: 439,
        userLost: 13
    },
    {
        year: 2022,
        userGain: 829,
        userLost: 34
    },
    {
        year: 2023,
        userGain: 622,
        userLost: 58
    },
    {
        year: 2024,
        userGain: 285,
        userLost: 98
    }
]

export default function AdminDashboard(): JSX.Element {
    const [mode, setMode] = useState<string>("stats");
    const [userStatData, setUserStatData] = useState({
        labels: Data.map(point => point.year),
        datasets: [{
            label: "User Gain",
            data: Data.map(point => point.userGain),
            backgroundColor: Data.map(() => "#0ec084a0"),
            fill: true
        }]
    });

    const changeMode = (e: HTMLElement) => {
        document.querySelector("nav.sidebar .top button.active")?.classList.remove("active")
        e.classList.add("active");
        setMode(e.id)
    }
    return (
        <main className="AdminDashboard">
            <nav className="topbar">
                <div className="icon">
                    <img src="/icon.png" alt="" />
                </div>
                <div className="content">
                    <div className="leftside">
                        <button>
                            <img src="/admin/theme.svg" alt="" />
                        </button>
                        <button>
                            <img src="/admin/notification.svg" alt="" />
                        </button>
                        <button>
                            <img src="/admin/chat.svg" alt="" />
                        </button>
                    </div>
                    <div className="rightside">
                        <img src="/admin/admin.svg" alt="" />
                        <div className="info">
                            <h3 className="name">Andrija Radivojev</h3>
                            <hr />
                            <h3 className="pl">Premision Level: 15</h3>
                        </div>
                    </div>
                </div>
            </nav>
            <div className="bottom">
                <nav className="sidebar">
                    <div className="top">
                        <button id='stats' onClick={e => changeMode(e.currentTarget)} className='active'><img src="/admin/stats.svg" alt="" /></button>
                        <button id='tables' onClick={e => changeMode(e.currentTarget)}><img src="/admin/table.svg" alt="" /></button>
                        <div className="devider" />
                        <button><img src="/admin/settings.svg" alt="" /></button>
                        <button><img src="/admin/report.svg" alt="" /></button>
                    </div>
                    <div className="bottom">
                        <button><img src="/admin/logout.svg" alt="" /></button>
                    </div>
                </nav>
                <div className="mainWindow">
                {
                    mode==="stats"? (
                    <div className='stats'>
                        <div className="row">
                            <div className="section s1">
                                <Line data={userStatData} />
                            </div>
                            <div className="section s2"></div>
                        </div>
                    </div>) : (
                    <div className='tables'>
                        Tables
                    </div>
                    )
                }
                </div>
            </div>
        </main>
    )
}