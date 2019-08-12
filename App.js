import React from 'react'
import {View,Text,Button,StyleSheet,TouchableOpacity} from 'react-native'

class App extends React.Component{
  constructor(){
    super()
    this.state = {
      Total :0,
      Calc_Digits: ''
    }
    this.digitsss = [9,8,7,6,5,4,3,2,1,'.',0,'=']
    this.digitss = [[9,8,7],[6,5,4],[3,2,1],['.',0,'=']]
    this.operators = ['D','+','-','*','/']
  }
  checkTheLastDigit = (str,rd,rb)=>{
    if(typeof str !== 'string'){
      return 
    }else {
      return str.split('').pop()     
    }
  }
  checkCalcDigits = (what)=>{
    switch(what.toLowerCase()){
      case 'len':
      case 'length':
        return this.state.Calc_Digits.length
        break;
      default:
        break;
    }
  }
  _handlePress = (dig)=>{
    let Calc_Digits_Len = this.state.Calc_Digits.length;
    let Calc_Digits_First_Char = this.state.Calc_Digits.split('')[0]==undefined || !this.state.Calc_Digits ? null: this.state.Calc_Digits.split('')[0]
    let Calc_Digits_Last_Char =  !this.state.Calc_Digits? null: this.state.Calc_Digits.split('').pop()
    /**
     * THINGS TO CHECK FOR ERROR HANDLING
     * 1. Dont calculate if the last char is an operand
     * 2. The first char must not be an operand
     * 3. 
     */
    // 1. ->
    if(Calc_Digits_Len<1){
      if(this.operators.includes(dig)==true){

      }else {
        this.setState({
          ...this.state,
          Calc_Digits: this.state.Calc_Digits+=dig,
          Total: 0
        })
      }
    }else {
      if(this.operators.includes(dig)==true || dig==='='){
        switch(dig){
          case "D":
            // clear
            this.setState({
              ...this.state,
              Calc_Digits: '',
              Total: 'Cleared'
            })
            setTimeout(()=>{
              this.setState({
                ...this.state,
                Calc_Digits: '',
                Total: 0
              })
            },100)
            break;
          case '=':
            // find the total
            if(this.digitsss.includes(Calc_Digits_Last_Char)){
              try {
                let total = eval(this.state.Calc_Digits)
                this.setState({
                  ...this.state,
                  Calc_Digits: this.state.Calc_Digits,
                  Total: eval(this.state.Calc_Digits)
                  // Total: 'is an operand ='+dig
                })
              }catch(error){
                this.setState({
                  ...this.state,
                  Calc_Digits: this.state.Calc_Digits,
                  Total: 'Error'
                  // Total: 'is an operand ='+dig
                })
              }
            }else if(this.operators.includes(Calc_Digits_Last_Char)){
                // last digit is an operand do nothing
                this.setState({
                  ...this.state,
                  Calc_Digits: this.state.Calc_Digits,
                  Total: eval(this.state.Calc_Digits.split('').slice(0,-1).join(''))
                  // Total: 'is an operand ='+dig
                })
            }else {
              try {
                let total = eval(this.state.Calc_Digits)
                this.setState({
                  ...this.state,
                  Calc_Digits: this.state.Calc_Digits,
                  Total: eval(this.state.Calc_Digits)
                  // Total: 'is an operand ='+dig
                })
              }catch(error){
                this.setState({
                  ...this.state,
                  Calc_Digits: this.state.Calc_Digits,
                  Total: 'Error'
                  // Total: 'is an operand ='+dig
                })
              }
              
            }
            break;
          default:
            if(this.operators.includes(dig)){
              this.setState({
                ...this.state,
                Calc_Digits: this.state.Calc_Digits+=dig,
                // Total: 'is an operand'+ dig
                Total: 0
              })
            }
            break;
        }
      }else {
        this.setState({
          ...this.state,
          Calc_Digits: this.state.Calc_Digits+=dig,
          // Total: 'not operand or ='+dig
          Total: 0
        })
      }

    }
      
  }

  render(){
    console.log(this.state)
    let Jsx = [];
    let digits = this.digitss
    for(let i in digits){
     Jsx.push(
      <View style={styles.digitsRow} key={digits[i]}>
        <TouchableOpacity style={styles.digit} onPress={()=>this._handlePress(digits[i][0])} >
          <Text  key={digits[i][0]}>{digits[i][0]}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.digit} onPress={()=>this._handlePress(digits[i][1])}>
          <Text  key={digits[i][1]}>{digits[i][1]}</Text>
        </TouchableOpacity>
        <TouchableOpacity  style={styles.digit} onPress={()=>this._handlePress(digits[i][2])}>
            <Text key={digits[i][2]}>{digits[i][2]}</Text>
        </TouchableOpacity>
      </View>
     )
    }

    let OparatorsJsx = []
    let ops = this.operators
    for(let i in ops){
      OparatorsJsx.push(
        <TouchableOpacity  key={ops[i]} style={styles.operators} onPress={()=>this._handlePress(ops[i])}>
          <Text  key={ops[i]} style={styles.operators}>{ops[i]}</Text>
        </TouchableOpacity>
      )
    }
    return (
      <View style={styles.container}>
        <View style={styles.resultArea}>
          <Text style={styles.resultText}>{this.state.Total}</Text>
        </View>
        <View style={styles.calculationArea}>
          <Text style={styles.calculationText}>{this.state.Calc_Digits}</Text>
        </View>
        <View style={styles.controlSection}>
          <View style={styles.digitsArea}>  
            {Jsx}
          </View>
          <View style={styles.operatorsArea}>
            {OparatorsJsx}
          </View>
        </View>
      </View>
    )
  }
}

let styles = StyleSheet.create({
  container: {
    flexDirection:"column",
    backgroundColor: "yellow",
    height: "100%"
  },
  resultArea :{
    backgroundColor: "green",
    // flex: 1,
    height: '20%',
    justifyContent:"center",
    alignItems:"center"
  },
  calculationArea: {
    backgroundColor:"black",
    // flex: 1
    height: '10%',
    justifyContent:"center",
    alignItems:"center"
  },
  controlSection:{
    backgroundColor:"black",
    flex: 2,
    flexGrow:1,
    flexDirection:"row"
  },
  digitsArea:{
    backgroundColor:"orange",
    width:"80%",
    flexDirection:"column",
    height:"100%"
    // justifyContent:"space-around"
  },
  operatorsArea:{
    backgroundColor:"pink",
    width:"20%",
    flexDirection:"column",
    flex: 1,
    justifyContent:"space-between",
    alignItems:"center"
  },
  resultText:{
    color: "white",
    fontSize: 30,
    
  },
  calculationText:{
    color:"white",
    fontSize: 20
  },
  digit:{
    width: "33.3%",
    // height:50,
    backgroundColor:"blue",
    textAlign:"center",
    alignItems: "center",
    padding: 30,
    fontSize: 30
  
  },
  digitsRow:{
    flexDirection:"row",
    flex: 1
  },
  operators:{
    fontSize: 50,
    backgroundColor: "grey",
    // flex: 1
    width: "100%",
    paddingLeft:10
    // height:"100%"
  }

})

export default App;