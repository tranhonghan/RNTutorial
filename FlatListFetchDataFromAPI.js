import React, {Component} from 'react'
import {StyleSheet, Text, View, FlatList, 
  ActivityIndicator, TouchableOpacity} from 'react-native'

export default class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      isLoading: true,
      dataSource: []
    }
  }

  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/posts')
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({
        isLoading: false,
        dataSource: responseJson
      })
    })
  }

  _renderItem = ({item, index}) => {
    return (
      <TouchableOpacity onPress={() => alert(item.body)}>
        <View style={styles.item}>
          <Text>{item.id + ") " + item.title}</Text>
        </View>
      </TouchableOpacity>
    )
  }

  render() {
    let {container} = styles
    let {dataSource, isLoading} = this.state
    if (isLoading) {
      return (
        <View style={styles.container}>
          <ActivityIndicator size="large" animating/>
        </View>
      )
    } else {
      return (
        <View style={container}>
          <FlatList
            data={dataSource}
            renderItem={this._renderItem}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      )
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    paddingTop: 50
  }, 
  item: {
    padding: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#eee'
  }
})