import React, {Component} from 'react'
import { Text, TextInput, View, TouchableOpacity, Dimensions} from 'react-native'

const WIDTH = Dimensions.get('window').width
export default class App extends Component {
  constructor(props){
    super(props)
    this.state = {textValue: 'Welcome RN'}
  }

  onPressButton = () => {
    alert('Clicked')
  }

  onChangeTextInput = (text) => {
    this.setState({ textValue: text})
  }

  render() {
    let {textValue} = this.state
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <TouchableOpacity 
          onPress={this.onPressButton} 
          style={{ width: WIDTH - 10, height: 50, backgroundColor: '#4c4cff', justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{fontSize: 20, color: '#fff'}}>{textValue}</Text>
        </TouchableOpacity>

        <TextInput
          style={{ borderWidth: 1, width: WIDTH - 10, height: 50, textAlign: 'center', marginTop: 10, fontSize: 20}}
          onChangeText={this.onChangeTextInput}
          value={textValue}
        />
      </View>
    )
  }
}