import React, { Component } from 'react';
import { StyleSheet, FlatList, View, Text, Image, ActivityIndicator } from 'react-native';
export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [],
      page: 1,
      isLoading: false
    }
  }
  componentDidMount() {
    this.setState({isLoading: true}, this.getData)
  }

  getData = async () => {
    const apiURL = "https://jsonplaceholder.typicode.com/photos?_limit=10&_page=" 
    + this.state.page;
    // ?_limit=10&_page=

    fetch(apiURL).then((res) => res.json())
      .then((resJson) => {
        this.setState({ 
          data: this.state.data.concat(resJson), 
          // function "concat" used to join two or more arrays
          isLoading: false
        })
    })
  }

  renderRow = ({item}) => {
    return (
      <View style={styles.itemRow}>
        <Image source={{uri: item.url}} style={styles.itemImage} />
        <Text style={styles.itemText}>{item.title}</Text>
        <Text style={styles.itemText}>{item.id}</Text>
      </View>
    )
  }

  renderFooter = () => {
    // ActivityIndicator Displays a circular loading indicator.
    return (
      this.state.isLoading ? 
      <View style={styles.loader}>
        <ActivityIndicator size="large"/>
      </View> : null
    )
  }
  
  handleLoadMore = () => {
    this.setState({ page: this.state.page + 1, isLoading: true }, this.getData)
  }

  render() {
    return (
      <FlatList
        style={styles.container}
        data={this.state.data}
        renderItem={this.renderRow}
        keyExtractor={(item, index) => index.toString()}
        onEndReached={this.handleLoadMore}
        onEndReachedThreshold={0}
        ListFooterComponent={this.renderFooter}
      />
    )
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    backgroundColor: '#f5fcff'
  },
  itemRow: {
    borderBottomColor: '#ccc',
    marginBottom: 10,
    borderBottomWidth: 1
  },
  itemImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover'
  },
  itemText: {
    fontSize: 16,
    padding: 5
  },
  loader: {
    marginTop: 10,
    alignItems: 'center'
  }
})
