'use client'
import { Grid,Button, ButtonGroup,Stack, IconButton, Tooltip, Divider} from '@mui/material'
import { useRef, useState } from 'react'
import {History as HistoryIcon} from '@mui/icons-material'

const InputChar = (props)=> {
  const {sym , data , opColor} = props
  const textColor =sym==="Error !" 
    ?  'text-red-600' 
    :  data[sym].binaryOperator 
      ?  (opColor || "text-green-600") : ""
  return (
    <span className={`${textColor} mx-[1px] `}>
      {sym}
    </span>   
  )
}

const GridToggle = (props) => {
  const {dataArr, handleChange ,nowSelected , buttonGroupProps} = props
  return(
    <Grid key={'angle'} item xs={6}>
      <ButtonGroup fullWidth {...buttonGroupProps}>
      {dataArr.map(ele => 
        <Button 
          key={ele} 
          onClick={()=>handleChange(ele)}
          sx={{
            backgroundColor:nowSelected===ele?"#c5edcf":"transparent",
            ":hover":{backgroundColor:nowSelected===ele?"#c5edcf":""},
          }}
        > 
          {ele}
        </Button>
      )}
      </ButtonGroup>
    </Grid>
  )
}

const History = (props) => {
  const {history,onClear,data,onHistoryClick} = props
  return(
    history.length>0 ?
    <div className='p-1'>
      <Stack 
        divider={<Divider sx={{backgroundColor:"white"}}/>}
        sx={{maxHeight:'300px',marginBottom:1,overflowY:"auto"}}
      >
      {history.map((ele,i) => 
        <div key={i} onClick={()=>onHistoryClick(ele)} className=' cursor-pointer p-2 rounded-md hover:bg-slate-600'>
          {ele.exp.map((sym,i) => <InputChar key={i} sym={sym} data={data} opColor='text-green-300'/>) }
          <p className='text-sm'>{ele.err || ele.op}</p>
        </div>  
      )}
      </Stack>
      <Button 
        className=' self-center' 
        variant='contained' 
        color='error' 
        onClick={onClear}
      > Clear History</Button>
    </div>
    :
    <div className='text-center w-44 p-5 text-base'>Your Recent Calculations Appear Here</div>
  )
}

export default function Home() {
  const calculatorKeyRef = useRef(null)
  const [calc, setCalc] = useState({op:'',exp:[],ans:false,err:false,angle:'Rad',func:'Reg'})
  const [level,setLevel] = useState('Fx')
  const [history, setHistory] = useState([])
  const calculatorSymbols = {
    '(':{val:'(',enclosing:1},
    ')':{val:')',enclosing:-1},
    '%':{val:'/100'},
    'CE':{val:'',disabled:(calc.exp.length===0)},
    '7':{val:'7'},
    '8':{val:'8'},
    '9':{val:'9'},
    '÷':{val:'/',binaryOperator:true},
    '4':{val:'4'},
    '5':{val:'5'},
    '6':{val:'6'},
    'x':{val:'*',binaryOperator:true},
    '3':{val:'3'},
    '2':{val:'2'},
    '1':{val:'1'},
    '-':{val:'-',binaryOperator:true},
    '0':{val:'0'},
    '.':{val:'.'},
    '=':{val:'=',disabled:(calc.exp.length===0)},
    '+':{val:'+',binaryOperator:true},
    'sin(':{val:'Math.sin(',enclosing:1,inverse:'sin⁻¹(',trignometry:true},
    'cos(':{val:'Math.cos(',enclosing:1,inverse:'cos⁻¹(',trignometry:true},
    'tan(':{val:'Math.tan(',enclosing:1,inverse:'tan⁻¹(',trignometry:true},
    'cosec(':{val:'1/Math.sin(',enclosing:1,inverse:'cosec⁻¹(',trignometry:true},
    'sec(':{val:'1/Math.cos(',enclosing:1,inverse:'sec⁻¹(',trignometry:true},
    'cot(':{val:'1/Math.tan(',enclosing:1,inverse:'cot⁻¹(',trignometry:true},
    'sin⁻¹(':{val:'Math.asin(',enclosing:1,inverse:'sin(',trignometry:true},
    'cos⁻¹(':{val:'Math.acos(',enclosing:1,inverse:'cos(',trignometry:true},
    'tan⁻¹(':{val:'Math.atan(',enclosing:1,inverse:'tan(',trignometry:true},
    'cosec⁻¹(':{val:'Math.asin(1/(',enclosing:2,inverse:'cosec(',trignometry:true},
    'sec⁻¹(':{val:'Math.acos(1/(',enclosing:2,inverse:'sec(',trignometry:true},
    'cot⁻¹(':{val:'Math.atan(1/(',enclosing:2,inverse:'cot(',trignometry:true},
    'ln(':{val:'Math.log(',enclosing:1},
    'e':{val:'Math.E'},
    'π':{val:'Math.PI'},
    '√(':{val:'Math.sqrt(',enclosing:1},
    basicSymbols:['(',')','%','CE','7','8','9','÷','4','5','6','x','3','2','1','-','0','.','=','+'],
    functionSymbols:['sin(','cos(','tan(','ln(','cosec(','sec(','cot(','e','π','√(','='],
    inverseFunctionSymbols:['sin⁻¹','cos⁻¹','tan⁻¹','cosec⁻¹','sec⁻¹','cot⁻¹'],
  }

  function conditionalyPush(exp,sym) {
    return (calculatorSymbols[sym].binaryOperator && calculatorSymbols[ exp[exp.length-1] ]?.binaryOperator)
      ? exp.slice(0,-1).concat(sym) 
      : exp.concat(sym)
  }

  function getValidOpFromSymbols(symbolsExp,angle){
    let numOfEnclosers = 0
    let isLastSymbolAnOperator = false
    let expArray = symbolsExp.map((sym,i) =>{
      numOfEnclosers += calculatorSymbols[sym].enclosing || 0
      isLastSymbolAnOperator = i===symbolsExp.length-1 && (calculatorSymbols[sym].binaryOperator || calculatorSymbols[sym].enclosing===1)

      if (calculatorSymbols[sym].trignometry && angle==='Deg') {
        return calculatorSymbols[sym].val.concat('(Math.PI/180)*')
      }

      return calculatorSymbols[sym].val
    }).concat(')'.repeat(numOfEnclosers<0 ? 0 : numOfEnclosers))

    const expStringToBeEvaluated = (isLastSymbolAnOperator) //checking last 2nd element to be a operator or not because last element will always be '' , ), )) ,...
      ?  expArray.slice(0,-2).concat(expArray.slice(-1)).join('')
      :  expArray.join('')
    
    try {
      const validOp = eval(expStringToBeEvaluated)
      if (validOp === Infinity) {
        return {op:'',err:"Division by Zero!"}
      } else {
        return {op:validOp,err:false}
      }
    } catch (error) {
      return {op:'',err:"Error !"}
    }     
  } 

  function handleKeyClick(symbol) {
    let newCalc = {...calc}

    if (symbol==='=' && !calc.ans) {
      setHistory(prev => prev.concat({
        exp:newCalc.exp ,
        op:newCalc.op,
        err:newCalc.err
      }))
      return setCalc({
        ...newCalc,
        ans:true,
        op:'',
        exp:(newCalc.err ? newCalc.exp : new String(newCalc.op).split(''))
      })
    }
    if (symbol==='=') return

    if (symbol==='CE') newCalc.exp.pop()
    else newCalc.exp = conditionalyPush(newCalc.exp,symbol)
    // else newCalc.exp = conditionalyInsert(newCalc.exp,symbol,inputRef.current.selectionStart)
      
    const {op , err }  = getValidOpFromSymbols(newCalc.exp,newCalc.angle) 
    newCalc.op = op
    newCalc.err = err
    newCalc.ans = false
    setCalc(newCalc)
  }

  function handleAngleChange(angle) {
    setCalc(prev =>{ 
      const {op,err} = getValidOpFromSymbols(prev.exp,angle)
      return{...prev,angle:angle,op:op,err:err} 
    })
  }

  function handleFuncChange(func) {
    setCalc(prev=> ({...prev,func:func}))
  }
  
  function handleLevelChange(){
    setLevel(prev => prev==='123' ? 'Fx' : "123")
    const direction = level === '123' ? -1 : 1
    calculatorKeyRef.current.scrollTo({ 
      left:direction * calculatorKeyRef.current.clientWidth,
      behavior : "smooth" 
    })
  }

  function handleHistoryChange(history) {
    setCalc(prev => ({
      ...prev,
      ...history,
      ans:false,
    }))
  }

  return (
      <main className='flex flex-wrap mx-2 justify-center  items-center min-h-screen'>
      <div className='justify-items-center grid'>
        
        <div className='flex-none p-5 border-[3px] rounded-lg border-green-800 w-[90%] sm:w-[80%] lg:w-[850px]'>

          <div className={`grid grid-rows-3 text-right mb-5 h-36 p-5 w-full border-inherit border rounded-md border-green-700 ${calc.ans && calc.err && 'text-red-700 border-red-800 shadow-sm shadow-red-400'}`}>
            <div  className='flex text-3xl font-semibold  justify-end overflow-hidden'>
              {(calc.ans && calc.err) || 
              calc.exp.map((sym,i) => <InputChar key={i} sym={sym} data={calculatorSymbols}/>) }
            </div>
            <p className='justify-end text-xs mt-3'>{calc.op}</p>

            <Stack direction={"row"} spacing={1}>

              <Tooltip 
                title={
                  <History 
                    history={history} 
                    onClear={()=>setHistory([])} 
                    data={calculatorSymbols}
                    onHistoryClick={handleHistoryChange}
                  />
                } 
                leaveDelay={2000} 
                arrow
              >
                <IconButton aria-label="hisory" color='secondary' >
                  <HistoryIcon/>
                </IconButton>  
              </Tooltip>
              
              <Button 
                variant='outlined'
                size='small'
                color='secondary'
                onClick={()=>setCalc(prev =>( {...prev,exp:[],op:'',err:false,ans:false} ))}
              > Clear </Button>       
              <Button
                variant='outlined'
                size='small'
                color='secondary'
                onClick={()=> handleLevelChange() }
                sx={{display:{md:"none"}}} 
              > 
                {level} 
              </Button>
            </Stack>
              
          </div>

          <div 
            className='flex max-lg:space-x-1 overflow-x-hidden' 
            style={{scrollSnapType:"x mandatory"}}
            ref={calculatorKeyRef}
          >
            
            <Grid container spacing={2} sx={{display:"",marginLeft:{md:2},flex:{md:'1',xs:'0 0 100%'},order:{md:'2'},scrollSnapAlign:"start"}} >
            {calculatorSymbols.basicSymbols.map(symbol => 
              <Grid item key={symbol} xs={3}>
                <Button 
                  variant={symbol === '=' ?'contained':'outlined'}
                  sx={{fontWeight:"700"}}
                  fullWidth
                  onClick={() => handleKeyClick(symbol)}
                  disabled={calculatorSymbols[symbol].disabled}
                > {symbol} </Button>
              </Grid>
            )}    
            </Grid>

            <Grid container spacing={2} sx={{display:"",height:"80%",flex:{md:'1',xs:'0 0 100%'},order:{md:'1'},scrollSnapAlign:"start"}}>

              <GridToggle 
                dataArr={['Rad','Deg']} 
                handleChange={handleAngleChange}
                nowSelected = {calc.angle} 
              />
              <GridToggle 
                dataArr={['Reg','Inv']} 
                handleChange={handleFuncChange} 
                nowSelected = {calc.func} 
              />
             
              {calculatorSymbols.functionSymbols.map(symbol => {
                symbol = (calc.func==='Inv' && calculatorSymbols[symbol].inverse) || symbol
                return (
                  <Grid item key={symbol} xs={3}>
                    <Button 
                      variant={symbol === '=' ?'contained':'outlined'}
                      sx={{
                        fontWeight:"700",
                        display:{md:symbol === '=' ? "none" :""} 
                      }}
                      fullWidth
                      onClick={() => handleKeyClick(symbol)}
                      disabled={calculatorSymbols[symbol].disabled}
                    > {symbol} </Button>
                  </Grid>
                )
              })} 

            </Grid>

          </div>
        </div>

      </div>
      </main> 
  )
}
