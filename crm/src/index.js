import React, {useState, useEffect, useRef, useDeferredValue} from 'react'
import ReactDom from 'react-dom'

const root = document.getElementById('root')
// 长列表渲染优化
function App() {
    // 1.分段渲染
    // const list = useRef(new Array(40000).fill(0))
    const [list, setList] = useState([])
    const renderList = () => {
        console.log('开始渲染');
        timeSlice([...new Array(20000)].map((item, index)=> index+1), 100)
    }

    // 总用要渲染的数据 和 每次渲染的数量
    const timeSlice = (totalArr, num) => {
        // 渲染总数
        const total = totalArr.length
        // 渲染次数
        const time = Math.ceil(total / num)
        let count = 0
        const renderFn = (curList) => {
            window.requestAnimationFrame(()=>{
                count++
                const addArr = totalArr.slice(count * 100, count * 100 + num)
                const newArr = curList.concat(addArr)
                setList([...newArr])
                console.log(newArr.length);
                if(count < time) {
                    renderFn(newArr)
                }else{
                    console.log('渲染完成')
                }
            })
        }
        
        renderFn([])
    }
    return (
        <div>
            <button onClick={renderList}>点击</button>
            <button onClick={()=>{console.log('23')}}>点击23</button>
            {
                list.map((item, index)=>{
                    return <p key={index} style={{backgroundColor: 'green'}}>{item}</p>
                })
            }
        </div>
    )
}
// 2.虚拟列表
function App2 () {
    const itemHeight = 20 // ；列表每一行的高度
    const renderCount = 20 // 在页面上渲染20条数据
    const listNode = useRef()
    const listContentNode = useRef()
    const [list, setList] = useState(new Array(10000).fill(0).map((item, index) => index + 1))
    const [renderList, setRenderList] = useState([list.slice(0, renderCount)])
    const [start, setStart] = useState([0])
    const [end, setEnd] = useState([renderCount])
    const handleScroll = (e) => {
        console.log(111);
        const { scrollTop } = listNode.current
        listContentNode.current.style.transform = `translate3d(0, ${scrollTop}px, 0)`
        const currentStart = Math.round(scrollTop / itemHeight)
        const currentEnd =  currentStart + itemHeight
        setStart(currentStart)
        setEnd(currentEnd)
    }

    useEffect(()=>{
        console.log('222');
        setRenderList(list.slice(start, end))
    }, [start, end])
    return (
        <div className="list-wrap" ref={listNode} onScroll={handleScroll} style={{height: itemHeight * renderCount, overflow: 'scroll', border: '1px solid #ccc', position: 'relative'}}>
            {/* 占位用的 div*/}
            <div style={{height: list.length * 20}}/>
            {/* 展示内容的div*/}
            <div ref={listContentNode} style={{position: 'absolute', top: 0, left: 0}}>
                {
                    renderList.map(item=><p style={{height: 20, padding: 0, margin: 0}} key={item}>{item}</p>)
                }
            </div>
        </div>
    )
}

function App3 () {
    const [text, setText] = useState('hello')
    return (
        <div>
            {text}
        </div>

    )
}
ReactDom.render(<App3 /> ,root)